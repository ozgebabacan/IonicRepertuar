import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Song } from '../../../models/song';

@Component({
  selector: 'page-editsong',
  templateUrl: 'editsong.html'
})
export class EditSongPage {

  data: Song;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
    this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM songs WHERE rowid=?', [rowid])
        .then(res => {
          this.data = res;
          // if(res.rows.length > 0) {
          //   this.data.rowid = res.rows.item(0).rowid;
          //   this.data.songName = res.rows.item(0).songName;
          //   this.data.type = res.rows.item(0).type;
          //   this.data.description = res.rows.item(0).description;
          // }
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

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET turku=?,makam=?,si=?,do=?,fa=?,giris=?,soz=?,nakarat=?,nota=? WHERE rowid=?',
        [this.data.turku, this.data.makam, this.data.si, this.data.do, this.data.fa, this.data.giris, this.data.soz, this.data.nakarat, this.data.nota, this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
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