import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FeedDetailsPage } from '../feed-details/feed-details';

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
  providers: [
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
  public username: string = "Esse aqui veio do .ts";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  openLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Movies...",
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.page = 1;
    this.refresher = refresher;
    this.isRefreshing = true;
    this.loadMovies();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FeedDetailsPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);
  }

  loadMovies(newPage: boolean = false) {
    this.openLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        let list = JSON.parse(response._body);

        if(newPage){
          this.list_movies = this.list_movies.concat(list.results);
          this.infiniteScroll.complete();
        }else{
          this.list_movies = list.results;
        }

        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
        console.log(error);
        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

  ionViewDidEnter() {
    this.loadMovies();
  }

}
