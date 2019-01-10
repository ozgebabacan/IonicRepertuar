import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SongsPage } from '../songs/songs';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  alphabets: Array<string> = ['a', 'b', 'c', 'ç', 'd', 'e', 'f', 'g', 'ğ', 'h', 'ı', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'y', 'z'];
  
constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];


    this.items = [];
    for (let i = 0; i < this.alphabets.length; i++) {
      this.items.push({
        title: this.alphabets[i],
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.setRoot(SongsPage,{alphabet: item.title});
  }
}
