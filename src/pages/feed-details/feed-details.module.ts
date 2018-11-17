import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetailsPage } from './feed-details';

@NgModule({
  declarations: [
    FeedDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetailsPage),
  ],
})
export class FeedDetailsPageModule {}
