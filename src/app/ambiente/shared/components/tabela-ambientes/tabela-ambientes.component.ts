import { Component, Input } from '@angular/core';
import { AmbienteDto } from '../../../../model/ambientesDto';
import { AmbienteService } from '../../../service/ambiente.service';
import { InformacoesAmbienteService } from '../../../service/informacoes-ambiente.service';
import { LiberarAmbiente, TipoAmbiente } from '../../../../model/LiberarAmbiente';
import { LimparCacheSignature } from '../../../../model/signature/limparCacheSignature';
import { Modal } from '../../../../model/signature/ModalLimparCache';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FiltrarAmbientesSignature } from '../../../../model/signature/filtrarAmbientesSignature';

@Component({
  selector: 'app-tabela-ambientes',
  templateUrl: './tabela-ambientes.component.html',
  styleUrl: './tabela-ambientes.component.scss'
})
export class TabelaAmbientesComponent {

  @Input() listAmbiente: AmbienteDto[] = [];
  @Input() sistema: string;


  loader: boolean = true;
  nomeTela: string = "";

  carteiraDeGerentes: string = "secondary";
  mensagemCarteiraDeGerentes: string;

  fundosRelacao: string = "secondary";
  mensagemFundosRelacao: string;
  listaDeProdutos: string = "secondary";

  mensagemListaDeProdutos: string;
  exibirStatus = false;
  stageCache: string = "";
  tempoStatus: number;
  habilitarBotao = false;

  formulario: any;


  constructor(private ambienteService: AmbienteService,
    private comunicacaoExterna: InformacoesAmbienteService) {

    this.comunicacaoExterna.limparCache.subscribe(x => {
      this.exibirStatus = true;
      this.Confirmar(x.Stage, x.Ambiente);
    })

    this.formulario = new FormGroup({
      pesquisa: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  Atualizar(){
    let form = this.formulario.get('pesquisa') as FormControl;
    form.setValue("");
    this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
  }

  Pesquisar() {
    let filtro = new FiltrarAmbientesSignature();   
    let pesquisa : string = this.formulario.controls.pesquisa.value;
    filtro.filtro = pesquisa;
    this.ambienteService.FiltrarAmbiente(filtro).subscribe(
      x => {
        this.listAmbiente = x
      }
    )
  }

  Confirmar(stage: string, ambiente: string) {
    this.habilitarBotao = true;
    this.tempoStatus = 10000;

    var signature = new LimparCacheSignature();
    signature.Ambiente = ambiente;
    signature.Stage = this.removerEspacosNoMeio(stage);
    this.stageCache = signature.Stage;

    let modal = new Modal();
    modal.Modal = false;
    this.comunicacaoExterna.modalLimparCache.emit(modal);

    this.exibirStatus = true;

    this.carteiraDeGerentes = "warning";
    this.fundosRelacao = "warning";
    this.listaDeProdutos = "warning";

    this.mensagemCarteiraDeGerentes = "Em andamento";
    this.mensagemFundosRelacao = "Em andamento";
    this.mensagemListaDeProdutos = "Em andamento";

    this.ambienteService.LimparCache(signature).subscribe(x => {
      if (x.carteiraDeGerente == 200) {
        this.carteiraDeGerentes = "success";
        this.mensagemCarteiraDeGerentes = "Realizado com sucesso";
      } else {
        this.carteiraDeGerentes = "danger";
        this.mensagemCarteiraDeGerentes = "Não foi possível realizar a limpeza de cache";
      }

      if (x.fundosRelacao == 200) {
        this.fundosRelacao = "success";
        this.mensagemFundosRelacao = "Realizado com sucesso";
      }
      else {
        this.fundosRelacao = "danger";
        this.mensagemFundosRelacao = "Não foi possível realizar a limpeza de cache";
      }

      if (x.listaDeProdutos == 200) {
        this.listaDeProdutos = "success";
        this.mensagemListaDeProdutos = "Realizado com sucesso";
      }
      else {
        this.listaDeProdutos = "danger";
        this.mensagemListaDeProdutos = "Não foi possível realizar a limpeza de cache";
      }

      setTimeout(() => {
        this.exibirStatus = false;
        this.habilitarBotao = false;
      }, this.tempoStatus);
    }, error => {

      this.carteiraDeGerentes = "danger";
      this.mensagemCarteiraDeGerentes = "Não foi possível realizar a limpeza de cache";

      this.fundosRelacao = "danger";
      this.mensagemFundosRelacao = "Não foi possível realizar a limpeza de cache";

      this.listaDeProdutos = "danger";
      this.mensagemListaDeProdutos = "Não foi possível realizar a limpeza de cache";

      setTimeout(() => {
        this.exibirStatus = false;
        this.habilitarBotao = false;
      }, this.tempoStatus);
    })

  }

  removerEspacosNoMeio(str: string): string {
    return str.replace(/\s/g, '');
  }



  openEditarModal(ambiente: AmbienteDto) {
    this.comunicacaoExterna.informacoesAmbiente.emit(ambiente);
  }

  openLiberarModal(ambienteId: number, nome: string) {
    let liberarAmbiente = new LiberarAmbiente();
    liberarAmbiente.titulo = `Deseja liberar o ambiente ${nome}`;
    liberarAmbiente.ambiente = TipoAmbiente.dev;
    liberarAmbiente.stage = ambienteId;
    this.comunicacaoExterna.liberarAmbiente.emit(liberarAmbiente);
  }

  LimparStage(ambiente: AmbienteDto) {
    let modal = new Modal();
    modal.Ambiente = "dev";
    modal.Stage = ambiente.nome;
    modal.Modal = true;
    this.comunicacaoExterna.modalLimparCache.emit(modal);
  }

  habilitarbotao(id: any) {

    if (id == 3 || id == 5) {
      return false;
    }
    return true;
  }

  AdicionarAmbiente() {
    this.ambienteService.AdicionarAmbiente().subscribe(data => {
      this.comunicacaoExterna.informacoesTodosAmbiente.emit(true);
    })
  }
}
