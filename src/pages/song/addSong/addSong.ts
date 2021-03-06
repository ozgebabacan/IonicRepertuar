import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Song } from '../../../models/song';
import { DatabaseService } from '../../../services/database';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-addsong',
  templateUrl: 'addsong.html'
})
export class AddSongPage {
  makamList: Array<string> = ['Rast', 'Uşşak', 'Hicaz', 'Uzzal', 'Hümayün', 'Zirgüle', 'Neva', 'Hüseyni', 'Kürdi', 'Nihavent', 'Muhayyer kürdi', 'Buselik'];

  data: Song = new Song();// = { songName:"", type:"", description:""};
   
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private database: DatabaseService,
    private toast: Toast) {
    this.data = new Song();
  }

  saveData() {
    this.database.set(this.data).then((res) => {
      console.log(res);
      this.toast.show('Data saved', '5000', 'center').subscribe(
        toast => {
          this.navCtrl.popToRoot();
        }
      );
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

}