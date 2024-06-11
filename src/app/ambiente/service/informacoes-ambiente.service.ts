import { EventEmitter, Injectable } from '@angular/core';
import { AmbienteDto } from '../../model/ambientesDto';
import { Pacote, PacoteQa } from '../../model/PacoteQaDto';
import { LiberarAmbiente } from '../../model/LiberarAmbiente';
import { LimparCache } from '../../model/signature/LimparCache';
import { Modal } from '../../model/signature/ModalLimparCache';

@Injectable({
  providedIn: 'root'
})
export class InformacoesAmbienteService {

  /*EventEmitter para trocar informações dos ambientes */
  informacoesAmbiente = new EventEmitter<AmbienteDto>();
  informacoesTodosAmbiente = new EventEmitter<boolean>();
  informacoesAmbienteQa = new EventEmitter<PacoteQa>();
  informacoesPacote = new EventEmitter<Pacote>();

  /*EventEmitter para liberar os ambientes de Dev e Qa*/
  liberarAmbiente = new EventEmitter<LiberarAmbiente>();
  liberarAmbienteQa = new EventEmitter<LiberarAmbiente>();

  /*EventEmitter para abrir a modal de limpar o chache dos ambientes*/
  modalLimparCache = new EventEmitter<Modal>();
  limparCache = new EventEmitter<LimparCache>();

  
}
