import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SongsPage } from '../pages/songs/songs';
import { SongPage } from '../pages/song/song';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddSongPage } from '../pages/song/addSong/addSong';
import { EditSongPage } from '../pages/song/editSong/editSong';
import { DatabaseService } from '../services/database';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SongsPage,
    SongPage,
    AddSongPage,
    EditSongPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SongsPage,
    SongPage,
    AddSongPage,
    EditSongPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},   
    SQLite,
    Toast,
    DatabaseService
  ]
})
export class AppModule {}
