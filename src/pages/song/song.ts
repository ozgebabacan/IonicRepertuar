import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/song';
import { DatabaseService } from '../../services/database';

@Component({
    selector: 'page-song',
    templateUrl: 'song.html',
    styles:[`.sbt{
        width:18%;
        color:black;
        text-align:center;
        padding:inherit;
        margin:3px;
        }
        .sbtMulti{
        width:100%;
        color:black;
        padding:inherit;
        margin:3px;
        }
        .card {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
          }`]
})
export class SongPage {
    data: Song = new Song;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private database: DatabaseService) {
        this.getCurrentData(navParams.get("rowid"));
    }

    getCurrentData(rowid) {
        this.database.get(rowid).then((data:Song) => { console.log(data); this.data = data});
    }
}