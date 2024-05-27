import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-emmiter',
  templateUrl: './modal-emmiter.component.html',
  styleUrl: './modal-emmiter.component.scss'
})
export class ModalEmmiterComponent {

  eventoPersonalizado = new EventEmitter<string>()

  enviarEvento() {
    this.eventoPersonalizado.emit('Mensagem do Filho');
  }
}
