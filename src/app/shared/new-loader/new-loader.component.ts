import { Component, Input } from '@angular/core';
import { LoaderService } from '../loader/loader.component';

@Component({
  selector: 'app-new-loader',
  templateUrl: './new-loader.component.html',
  styleUrl: './new-loader.component.scss'
})
export class NewLoaderComponent {

@Input() exibirLoader:boolean;
@Input() mensagem:string;

  constructor(private loader:LoaderService) { 
  }


  ngOnInit() {
  }


}
