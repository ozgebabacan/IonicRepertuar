import { Injectable } from "@angular/core";
import { SQLite } from "@ionic-native/sqlite";
import { Song } from "../models/song";
import { Toast } from '@ionic-native/toast';
import { Platform } from "ionic-angular";

const DB_NAME: string = 'ionicdb.db';
const win: any = window;

@Injectable()
export class DatabaseService {

    private _db: any;
    constructor(private toast: Toast) {

        if (win.sqlitePlugin) {
            this._db = win.sqlitePlugin.openDatabase({
                name: DB_NAME,
                location: 2,
                createFromLocation: 0
            });

        } else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');

            this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
        }
        this._tryInit();
    }

    _tryInit() {
        this.query('CREATE TABLE IF NOT EXISTS songs(rowid INTEGER PRIMARY KEY, turku TEXT, makam TEXT,' +
            'si TEXT,do TEXT,fa TEXT,giris TEXT, soz TEXT, nakarat TEXT,nota TEXT)').catch(err => {
                console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
            });
    }

    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._db.transaction((tx: any) => {
                    tx.executeSql(query, params,
                        (tx: any, res: any) => resolve({ tx: tx, res: res }),
                        (tx: any, err: any) => reject({ tx: tx, err: err }));
                },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }



    /**
   * Get the value in the database identified by the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
    get(key: string): Promise<any> {
        return this.query('SELECT * FROM songs WHERE rowid=? limit 1', [key]).then(data => {
           
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0);
            }
        }).catch((err) => {
           
            this.toast.show(err, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        }); // we deal with errors etc;
    }

    /**
   * Get the value in the database identified by the given key.
   * @param {string} key the key
   * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
   */
    getList(alphabet): Promise<any> {
      
        return this.query("SELECT * FROM songs where turku like ? ORDER BY rowid DESC", [alphabet+'%']).then(data => {
           
            let songs = [];
            if (data.res.rows.length > 0) {
                for (let i = 0; i < data.res.rows.length; i++) {
                    songs.push({
                        rowid:data.res.rows.item(i).rowid,
                        makam: data.res.rows.item(i).makam,
                        soz: data.res.rows.item(i).soz,
                        nakarat: data.res.rows.item(i).nakarat,
                        turku: data.res.rows.item(i).turku,
                        si: data.res.rows.item(i).si,
                        fa: data.res.rows.item(i).fa,
                        mi: data.res.rows.item(i).mi,
                        do: data.res.rows.item(i).do,
                        nota: data.res.rows.item(i).nota,
                        giris: data.res.rows.item(i).giris
                    });
                }
            }
            return songs;
        })
        .catch((err) => {
           
            this.toast.show(err, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        }); 
    }

    /**
     * Set the value in the database for the given key. Existing values will be overwritten.
     * @param {string} key the key
     * @param {string} value The value (as a string)
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    set(data: Song): Promise<any> {
        debugger;
        return this.query('INSERT INTO songs VALUES(NULL,?,?,?,?,?,?,?,?,?)',
            [data.turku, data.makam, data.si, data.do, data.fa, data.giris, data.soz, data.nakarat, data.nota]
        );
    }

    /**
     * Remove the value in the database for the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    remove(key: string): Promise<any> {
        return this.query('delete from kv where key = ?', [key]);
    }

    /**
     * Clear all keys/values of your database.
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    clear(): Promise<any> {
        return this.query('delete from kv');
    }
 
}