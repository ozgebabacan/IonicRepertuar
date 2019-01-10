import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Song } from '../../models/song';
import { DatabaseService } from '../../services/database';

@Component({
    selector: 'page-song',
    templateUrl: 'song.html',
    styles:[`.col{
        background: gray;
        border: think solid black;
        }`]
})
export class SongPage {
    data: Song;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private database: DatabaseService) {
        this.getCurrentData(navParams.get("rowid"));
    }

    getCurrentData(rowid) {
        this.database.getDataById(rowid).then((data:Song)=>{ this.data = data});
    }
}