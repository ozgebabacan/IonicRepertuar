import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Song } from "../models/song";
import { Toast } from '@ionic-native/toast';

@Injectable()
export class DatabaseService {

    public db: SQLiteObject;
    public isOpen: boolean;

    constructor(private sqlite: SQLite,
        private toast: Toast) {
        console.log("DatabaseService", this.isOpen);
        if (!this.isOpen) {
            this.OpenConnection();
        }
    }

    OpenConnection() {
        console.log("OpenConnection", this.isOpen);
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            console.log("SQLiteObject", this.db);
            this.db = db;

            this.db.executeSql('CREATE TABLE IF NOT EXISTS songs(rowid INTEGER PRIMARY KEY, turku TEXT, makam TEXT,' +
                'si TEXT,do TEXT,fa TEXT,giris TEXT, soz TEXT, nakarat TEXT,nota TEXT)', [])
                .then(res => console.log('Executed SQL'))
                .catch(e => console.log(e));

            this.isOpen = true;
        }).catch(e => console.log(e));
    }

    getData() {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM songs ORDER BY rowid DESC";
            this.db.executeSql(query, []).then((data) => {
                let songs = [];
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        songs.push({
                            makam: data.rows.item(i).makam,
                            soz: data.rows.item(i).soz,
                            nakarat: data.rows.item(i).nakarat,
                            turku: data.rows.item(i).turku,
                            si: data.rows.item(i).si,
                            fa: data.rows.item(i).fa,
                            mi: data.rows.item(i).mi,
                            do: data.rows.item(i).do,
                            nota: data.rows.item(i).nota,
                            giris: data.rows.item(i).giris
                        });
                    }
                }
                resolve(songs);
            }).catch((err) => {
                console.log(err);
                this.toast.show(err, '5000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    }
                );
            }); // we deal with errors etc

        });


        // let songList = Song[];
        // this.sqlite.create({
        //     name: 'ionicdb.db',
        //     location: 'default'
        // }).then((db: SQLiteObject) => {
        //     debugger; //"SELECT * FROM songs Where turku like '?%' ORDER BY rowid DESC", [this.alphabet]
        //     db.executeSql("SELECT * FROM songs ORDER BY rowid DESC", [])
        //         .then(res => {

        //             //this.songList = res;
        //             // for(var i=0; i<res.rows.length; i++) {
        //             //   this.songList.push({rowid:res.rows.item(i).rowid,turku:res.rows.item(i).turku,makam:res.rows.item(i).makam,
        //             //     si:res.rows.item(i).si,do:res.rows.item(i).do,fa:res.rows.item(i).fa,giris:res.rows.item(i).giris,
        //             //     nakarat:res.rows.item(i).nakarat,
        //             //     nota:res.rows.item(i).nota,soz:res.rows.item(i).soz})
        //             // }

        //             for (let i = 0; i < res.rows.length; i++) {
        //                 let item = res.rows.item(i);
        //                 this.songList.push(item);
        //             }
        //         })
        //         .catch(e => console.log(e));

        // }).catch(e => console.log(e));
    }

    deleteData(rowid) {
        return new Promise((resolve, reject) => {
            this.db.executeSql('DELETE FROM songs WHERE rowid=?', [rowid]).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.log(err);
                this.toast.show(err, '5000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    }
                );
            });
        });
    }

    updateData() {

    }

    addData(data) {
        return new Promise((resolve, reject) => {
            this.db.executeSql('INSERT INTO songs VALUES(NULL,?,?,?,?,?,?,?,?,?)',
                [data.turku, data.makam, data.si, data.do, data.fa, data.giris, data.soz, data.nakarat, data.nota,])
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    console.log(e);
                    this.toast.show(e, '5000', 'center').subscribe(
                        toast => {
                            console.log(toast);
                        }
                    );
                });
        });
    }

    getDataById(rowid) {
        console.log("getDataById", this.db);
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM songs WHERE rowid=?";
            this.db.executeSql(query, [rowid]).then((data) => {
                let song = new Song;
                console.log("getDataByIdThen", data.rows.item(0).turku);
                // song.turku = data.rows.item(0).turku;
                // song.soz = data.rows.item(0).soz;
                // song.makam = data.rows.item(0).makam;
                // song.si = data.rows.item(0).si;
                // song.do = data.rows.item(0).do;
                // song.fa = data.rows.item(0).fa;
                // song.mi = data.rows.item(0).mi;
                // song.nakarat = data.rows.item(0).nakarat;

                resolve(song);
            }).catch((err) => {
                console.log(err);
                this.toast.show(err, '5000', 'center').subscribe(
                    toast => {
                        console.log("data.rows.item(0).turku error", toast);
                    }
                );
            }); // we deal with errors etc

        });
    }





    public getPeople() {
        return new Promise((resolve, reject) => {
            this.db.executeSql("SELECT * FROM people", []).then((data) => {
                let people = [];
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        people.push({
                            id: data.rows.item(i).id,
                            firstname: data.rows.item(i).firstname,
                            lastname: data.rows.item(i).lastname
                        });
                    }
                }
                resolve(people);
            }, (error) => {
                reject(error);
            });
        });

        // return new Promise((resolve, reject) => {
        //     let balanceQuery = "select sum(trxamount) sumofamount from transactiontable";
        //     this.db.executeSql(balanceQuery, []).then((data) => {
        //         let balance = data.rows.item(0).sumofamount;
        //         // if we successfully obtain data - we resolve it, means it can be available via callback
        //         resolve(balance)
        //     }).catch((err) => { console.log(err); reject(err) }) // we deal with errors etc
        // })
    }

    public createPerson(firstname: string, lastname: string) {
        return new Promise((resolve, reject) => {
            this.db.executeSql("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [firstname, lastname]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }
}