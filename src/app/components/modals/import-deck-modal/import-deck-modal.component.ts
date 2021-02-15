import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClickService } from 'src/app/services/game/click/click.service';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-import-deck-modal',
  templateUrl: './import-deck-modal.component.html',
  styleUrls: ['./import-deck-modal.component.css']
})
export class ImportDeckModalComponent implements OnInit, OnDestroy {


  cardList: string;
  validationErrors: string[] = [];

  loading:boolean = false;
  validated:boolean = false;
  validatedDeck:any;

  constructor(private clickService: ClickService, private authService: AuthService) { }

  ngOnInit(): void {
    this.clickService.modalOpened();
  }

  ngOnDestroy(): void {
    this.clickService.modalClosed();
  }

  validate = async () => {
    this.loading = true;
    let response = await this.authService.request('post', '/validate', {
      deck: this.cardList
    }).subscribe(data => {
      this.loading = false;
      console.log("got data: ",data)
      if(data && data.errors && data.errors.length > 0){
        this.validated = false;
        this.validationErrors = data.errors;
      }else{
        this.validated = true;
        this.validatedDeck = data.deck;
        this.validationErrors = [];
      }
    }, error => {
      this.loading = false;
      console.log("Error validting deck: ", error)
    })
    
  }
}
