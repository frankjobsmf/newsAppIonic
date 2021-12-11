import { Component, Input, } from '@angular/core';
import { Article } from 'src/app/interfaces/new.interface';
import { Browser } from '@capacitor/browser';
import { ActionSheetController } from '@ionic/angular';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index: number;



  constructor( 
    private actsCtrl: ActionSheetController
  ) { 

  }

  async onOpenMenu(){

    const actionSheet = await this.actsCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share-outline',
          handler: this.onShareArticle
        },
        {
          text: 'Favorito',
          icon: 'heart-outline',
          handler: this.onToggleFavorites
        },
        {
          text: 'Cancelar',
          icon: 'close-outline',
          handler: () => { return ; }
        },
      ]
    })

    await actionSheet.present();
  }
  
    onShareArticle(){

      return async () => {

        console.log( 'action-sheet: SHARE' );
    
        await Share.share({
          title: 'See cool stuff',
          text: 'Really awesome thing you need to see right meow',
          url: 'http://ionicframework.com/',
          dialogTitle: 'Share with buddies',
        });
      }




  }

  onToggleFavorites() {
    console.log( 'action-sheet: FAVORITE' );
  }


  async openArticle(){

    await Browser.open({ url: this.article.url });

  }

}
