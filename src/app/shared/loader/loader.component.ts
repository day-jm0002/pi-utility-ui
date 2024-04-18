import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../dashboard/service/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private loader:LoaderService) { 
    
  }

  exibirLoader:boolean = true;

  ngOnInit() {
    this.loader.appLoader.subscribe(x => {
      console.log(x);
      this.exibirLoader = x;    
    })
  }

}

export { LoaderService };
