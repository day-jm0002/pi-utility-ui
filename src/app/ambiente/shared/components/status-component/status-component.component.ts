import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-component',
  templateUrl: './status-component.component.html',
  styleUrl: './status-component.component.scss'
})
export class StatusComponentComponent {
    @Input() codigo:number;
    @Input() situacao:string;
}
