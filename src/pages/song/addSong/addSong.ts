import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Song } from '../../../models/song';

@Component({
  selector: 'page-addsong',
  templateUrl: 'addsong.html'
})
export class AddSongPage {

  data: Song = new Song();// = { songName:"", type:"", description:""};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
    this.data = new Song();
  }

  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO songs VALUES(NULL,?,?,?,?,?,?,?,?,?)',
        [this.data.turku, this.data.makam, this.data.si, this.data.do, this.data.fa, this.data.giris, this.data.soz, this.data.nakarat, this.data.nota,])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}