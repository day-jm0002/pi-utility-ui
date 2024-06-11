import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LimparCacheSignature } from '../../../../model/signature/limparCacheSignature';

@Component({
  selector: 'app-status-cache',
  templateUrl: './status-cache.component.html',
  styleUrl: './status-cache.component.scss'
})
export class StatusCacheComponent implements OnInit , OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
}
  

  ngOnInit(): void {

  }

  @Input() LimparCacheSignature : LimparCacheSignature;

  @Input() CarteiraDeGerentes = ""; 
  @Input() MensagemCarteiraDeGerentes = "";

  @Input() FundosRelacao = "";
  @Input() MensagemFundosRelacao = "";

  @Input() ListaDeProdutos = "";
  @Input() MensagemListaDeProdutos = "";

  @Input() StageCache = ""; 
  @Input() ExibirStatus = true;




}
