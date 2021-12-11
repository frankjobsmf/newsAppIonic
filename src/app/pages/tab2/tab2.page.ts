import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/new.interface';
import { NewsService } from 'src/app/services/news-services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public categories: string[]

  selectedCategory: string;

  public articles: Article[];

  @ViewChild( 'infinite' ) infinite: IonInfiniteScroll;



  constructor(
    private newsService: NewsService
  ) {
    
  }
  
  ngOnInit() {
    
        this.categories = [
          'business',
          'entertainment',
          'general',
          'health',
          'science',
          'sports',
          'technology',
        ];
    
        this.selectedCategory = this.categories[0];
    
        this.newsService.getTopHeadlinesByCategory( this.selectedCategory )
        .subscribe( articles => {
    
          console.log('REFACTORIZACION DEL SERVICIO: ' ,articles )
    
          this.articles = [ ...articles ]
        } );
    

  }


  segmentChanged( category: any ){

    this.selectedCategory = category.detail.value;

    this.newsService.getTopHeadlinesByCategory( this.selectedCategory )
      .subscribe( news => this.articles = news);
  }


  loadData() {

    this.newsService.getTopHeadlinesByCategory( this.selectedCategory, true)
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
