import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  public username:string = "Esse aqui veio do .ts";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public somaNumeros(num1:number, num2:number){
    alert(num1 + num2);
  }

  ionViewDidLoad() {
    //this.somaNumeros(2, 3);
  }

}
