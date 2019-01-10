import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SongPage } from "../song/song";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { EditSongPage } from "../song/editSong/editSong";
import { AddSongPage } from "../song/addSong/addSong";
import { Song } from "../../models/song";
import { DatabaseService } from "../../services/database";

@Component({
    selector: 'page-songs',
    templateUrl: 'songs.html'
})
export class SongsPage {
    songList: Song[]; //= ["Türkü 1","Türkü 2","Türkü 3"];
    alphabet: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private sqlite: SQLite,
        private database: DatabaseService) {
        this.alphabet = this.navParams.get('alphabet')
    }

    itemTapped(event, item) {
        this.navCtrl.setRoot(SongPage , {
            rowid: item.rowid
        });
    }

    // ionViewDidLoad() {
    //     this.getData();
    // }

    ionViewWillEnter() {
        this.getData();
    }

    getData() {
        this.database.getData().then((data:Song[])=>{ console.log(data); this.songList = data});
    }



    addData() {
        this.navCtrl.push(AddSongPage);
    }

    editData(rowid) {
        this.navCtrl.push(EditSongPage, {
            rowid: rowid
        });
    }

    deleteData(rowid) {
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM songs WHERE rowid=?', [rowid])
                .then(res => {
                    console.log(res);
                    this.getData();
                })
                .catch(e => console.log(e));
        }).catch(e => console.log(e));
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.getData();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            if (this.songList) {
                this.songList = this.songList.filter((item) => {
                    return (item.turku.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
        }
    }

}