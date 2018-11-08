import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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
  providers:[
    MovieProvider
  ]
})
export class FeedPage {
  public feed = {
    titulo: "Gabriel Thiago",
    data: "November 5, 1955",
    description: "Tô programando pacaraima.",
    qnt_likes: 12,
    qnt_comments: 4,
    time_post: "11h ago"
  }

  public list_movies = Array<any>();

  public username:string = "Esse aqui veio do .ts";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MovieProvider){
  }

  ionViewDidLoad() {
    this.movieProvider.getLatestMovies().subscribe(
      data=>{
        const response = (data as any);
        let list = JSON.parse(response._body);
        this.list_movies = list.results;
        
        console.log(list);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
