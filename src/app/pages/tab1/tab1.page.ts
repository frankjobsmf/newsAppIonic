import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/new.interface';
import { NewsService } from 'src/app/services/news-services.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  @ViewChild( 'infinite' ) infinite: IonInfiniteScroll;

  constructor(
    private newsService: NewsService
  ) {}


  ngOnInit() {
    this.newsService.getTopHeadlines()
      .subscribe( articles => this.articles = [ ...articles ] )
  }

  loadData(){

    this.newsService.getTopHeadlinesByCategory( 'business' , true)
      .subscribe( articles => {   
        
        if( articles.length === this.articles.length ){
          this.infinite.disabled = true;
          return ;
        }



        this.articles = articles;

        setTimeout( () => {

          this.infinite.complete()


        }, 2000)


      });


  }

}
