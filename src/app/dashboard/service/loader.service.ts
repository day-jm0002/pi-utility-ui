import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public appLoader: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  abrirLoader() {
    this.appLoader.emit(true);
  }

  fecharLoader() {
    this.appLoader.emit(false);
  }

}
