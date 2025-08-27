import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlHelper } from '../helper/UlrHelper';

interface Permissao {
  servidor: string;
  conta: string;
  bancoDados: string;
  permissao: string;
  objeto: string;
}

@Component({
  selector: 'app-formulario-gmud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './formulario-gmud.component.html',
  styleUrls: ['./formulario-gmud.component.scss']
})
export class FormularioGmudComponent implements OnInit {

  dadosForm: FormGroup;
  mudancaForm: FormGroup;
  impactosForm: FormGroup;
  usuarioForm: FormGroup;
  testesForm: FormGroup;
  permissoesForm: FormGroup;
  procedimentosForm: FormGroup;
  planoVoltaForm: FormGroup;

  // Propriedades para controle de UI
  mostrarToast = false;
  toastTitulo = '';
  toastMensagem = '';
  abaAtual = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.inicializarFormularios();
  }

  /**
   * Inicializa todos os formulários com validações
   */
  inicializarFormularios(): void {
    this.dadosForm = new FormGroup({
      tituloMudanca: new FormControl('', [Validators.required, Validators.minLength(5)]),
      dataAbertura: new FormControl('', [Validators.required]),
      solicitante: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dataHoraInicio: new FormControl('', [Validators.required]),
      tempoExecucao: new FormControl('', [Validators.required]),
      areaBeneficiada: new FormControl('', [Validators.required]),
      emergencial: new FormControl('Produção parada sem solução de contorno', [Validators.required]),
      acao: new FormControl('Definitiva', [Validators.required]),
      justificativaEmergencial: new FormControl(''),
      calculosFinanceiros: new FormControl('Não', [Validators.required]),
      lgpd: new FormControl('Não', [Validators.required]),
      responsavelCiencia: new FormControl('', [Validators.required]),
      rpa: new FormControl('Não', [Validators.required]),
      servidor: new FormControl('Não', [Validators.required]),
      planoVolta: new FormControl('Não', [Validators.required]),
      justificativaPlanoVolta: new FormControl(''),
      tempoPlanoVolta: new FormControl(''),
      monitoramento: new FormControl('Não', [Validators.required]),
      equipeResponsavel: new FormControl('', [Validators.required]),
      nomeSistema: new FormControl('', [Validators.required]),
      tipoImpacto: new FormControl(''),
      servidorVip: new FormControl(''),
      nomeServico: new FormControl(''),
      tipoMonitoramento: new FormControl('Não'),
      healthCheck: new FormControl(''),
      tempoChecagem: new FormControl(''),
      quantidadeChecagem: new FormControl(''),
      firewall: new FormControl('Não', [Validators.required]),
      auditoria: new FormControl('Não', [Validators.required]),
      chamados: new FormControl('', [Validators.required])
    });

    this.mudancaForm = new FormGroup({
      chamados: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(20)]),
      rotinaNoturna: new FormControl('Sim', [Validators.required]),
      operadorNoturno: new FormControl('')
    });

    this.impactosForm = new FormGroup({
      rotinaNoturna: new FormControl('Não', [Validators.required]),
      operadorNoturno: new FormControl('')
    });

    this.usuarioForm = new FormGroup({
      treinamento: new FormControl('Não', [Validators.required]),
      responsavelTreinamento: new FormControl(''),
      divulgacao: new FormControl('Não', [Validators.required]),
      orientacaoHelpDesk: new FormControl('Não', [Validators.required]),
      helpDesk: new FormControl('Não'),
      detalhesHelpDesk: new FormControl('')
    });

    this.testesForm = new FormGroup({
      homologacao: new FormControl('Não', [Validators.required]),
      justificativaHomologacao: new FormControl(''),
      testesPrevios: new FormControl('Não', [Validators.required]),
      justificativaTestesPrevios: new FormControl(''),
      descricaoTestes: new FormControl(''),
      resultadoTestes: new FormControl(''),
      responsavelTestes: new FormControl(''),
      testesPos: new FormControl('Não', [Validators.required]),
      justificativaTestesPos: new FormControl(''),
      descricaoTestesPos: new FormControl(''),
      responsavelTestesPos: new FormControl('')
    });

    this.permissoesForm = new FormGroup({
      loginBanco: new FormControl('Não se aplica', [Validators.required]),
      finalidadeCriacao: new FormControl(''),
      finalidadeManutencao: new FormControl('')
    });

    this.procedimentosForm = new FormGroup({
      couchbase: new FormControl('Sim', [Validators.required]),
      tipoAplicacao: new FormControl('LAN', [Validators.required]),
      procedimentosDBA: new FormControl(''),
      procedimentosRedes: new FormControl(''),
      procedimentosGestao: new FormControl('')
    });

    this.planoVoltaForm = new FormGroup({
      couchbasePlanoVolta: new FormControl('Sim', [Validators.required]),
      tipoAplicacaoPlanoVolta: new FormControl('LAN', [Validators.required]),
      procedimentosDBAPlanoVolta: new FormControl(''),
      procedimentosRedesPlanoVolta: new FormControl(''),
      procedimentosGestaoPlanoVolta: new FormControl('')
    });
  }

  // Lista de permissões
  permissoes: Permissao[] = [];
  novaPermissao: Permissao = {
    servidor: '',
    conta: '',
    bancoDados: '',
    permissao: '',
    objeto: ''
  };

  /**
   * Calcula o progresso do formulário baseado nos campos preenchidos
   */
  getProgressoFormulario(): number {
    const formularios = [
      this.dadosForm,
      this.mudancaForm,
      this.impactosForm,
      this.usuarioForm,
      this.testesForm,
      this.permissoesForm,
      this.procedimentosForm,
      this.planoVoltaForm
    ];

    let totalCampos = 0;
    let camposPreenchidos = 0;

    formularios.forEach(form => {
      Object.keys(form.controls).forEach(key => {
        totalCampos++;
        const control = form.get(key);
        if (control && control.value && control.value !== '') {
          camposPreenchidos++;
        }
      });
    });

    return Math.round((camposPreenchidos / totalCampos) * 100);
  }

  /**
   * Navega para a aba anterior
   */
  anteriorAba(): void {
    if (this.abaAtual > 0) {
      this.abaAtual--;
      this.ativarAba(this.abaAtual);
    }
  }

  /**
   * Navega para a próxima aba
   */
  proximaAba(): void {
    if (this.abaAtual < 7) {
      this.abaAtual++;
      this.ativarAba(this.abaAtual);
    }
  }

  /**
   * Ativa uma aba específica
   */
  ativarAba(indice: number): void {
    const abas = ['dados', 'mudanca', 'impactos', 'usuario', 'testes', 'permissoes', 'procedimentos', 'planoVolta'];
    const abaAtiva = abas[indice];
    
    // Remove classe active de todas as abas
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Adiciona classe active na aba atual
    const abaAtual = document.querySelector(`#${abaAtiva}-tab`);
    if (abaAtual) {
      abaAtual.classList.add('active');
    }

    // Ativa o conteúdo da aba
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('show', 'active');
    });
    
    const conteudoAba = document.querySelector(`#${abaAtiva}`);
    if (conteudoAba) {
      conteudoAba.classList.add('show', 'active');
    }
  }

  /**
   * Salva o formulário atual
   */
  salvarFormulario(): void {
    try {
      // Valida o formulário atual
      const formularioAtual = this.getFormularioAtual();
      if (formularioAtual.invalid) {
        this.mostrarNotificacao('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      // Marca todos os campos como touched para mostrar validações
      Object.keys(formularioAtual.controls).forEach(key => {
        const control = formularioAtual.get(key);
        if (control) {
          control.markAsTouched();
        }
      });

      // Simula salvamento
      this.mostrarNotificacao('Sucesso', 'Formulário salvo com sucesso!', 'success');
      
      // Log de auditoria
      this.registrarLogAuditoria('SALVAR', 'Formulário salvo', formularioAtual.value);
      
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      this.mostrarNotificacao('Erro', 'Erro ao salvar o formulário. Tente novamente.', 'error');
    }
  }

  /**
   * Gera PDF do formulário
   */
  async gerarPDF(): Promise<void> {
    try {
      this.mostrarNotificacao('Processando', 'Gerando PDF...', 'info');
      
      // Cria documento Word usando a biblioteca docx
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: "Formulário GMUD - Gestão de Mudanças",
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: "Dados da Solicitação",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph({
              text: `Título: ${this.dadosForm.get('tituloMudanca')?.value || 'N/A'}`,
            }),
            new Paragraph({
              text: `Solicitante: ${this.dadosForm.get('solicitante')?.value || 'N/A'}`,
            }),
            new Paragraph({
              text: `Data de Abertura: ${this.dadosForm.get('dataAbertura')?.value || 'N/A'}`,
            })
          ]
        }]
      });

      // Gera o arquivo
      const blob = await Packer.toBlob(doc);
      
      // Download do arquivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `GMUD_${new Date().getTime()}.docx`;
      link.click();
      window.URL.revokeObjectURL(url);

      this.mostrarNotificacao('Sucesso', 'PDF gerado com sucesso!', 'success');
      
      // Log de auditoria
      this.registrarLogAuditoria('GERAR_PDF', 'PDF gerado', {});
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      this.mostrarNotificacao('Erro', 'Erro ao gerar PDF. Tente novamente.', 'error');
    }
  }

  /**
   * Retorna o formulário da aba atual
   */
  getFormularioAtual(): FormGroup {
    const formularios = [
      this.dadosForm,
      this.mudancaForm,
      this.impactosForm,
      this.usuarioForm,
      this.testesForm,
      this.permissoesForm,
      this.procedimentosForm,
      this.planoVoltaForm
    ];
    return formularios[this.abaAtual] || this.dadosForm;
  }

  /**
   * Mostra notificação toast
   */
  mostrarNotificacao(titulo: string, mensagem: string, tipo: 'success' | 'error' | 'info' | 'warning'): void {
    this.toastTitulo = titulo;
    this.toastMensagem = mensagem;
    this.mostrarToast = true;
    
    // Auto-hide após 5 segundos
    setTimeout(() => {
      this.fecharToast();
    }, 5000);
  }

  /**
   * Fecha o toast de notificação
   */
  fecharToast(): void {
    this.mostrarToast = false;
  }

  /**
   * Registra log de auditoria
   */
  registrarLogAuditoria(acao: string, descricao: string, dados: any): void {
    const log = {
      usuario: 'Usuário Atual', // Deve ser obtido do serviço de autenticação
      dataHora: new Date().toISOString(),
      acao: acao,
      descricao: descricao,
      dados: dados,
      ip: 'IP do usuário', // Deve ser obtido do serviço
      userAgent: navigator.userAgent
    };

    console.log('Log de Auditoria:', log);
    
    // Aqui deve ser enviado para o serviço de auditoria
    // this.auditoriaService.registrarLog(log);
  }

  adicionarPermissao() {
    if (this.novaPermissao.servidor && this.novaPermissao.conta && this.novaPermissao.bancoDados && this.novaPermissao.permissao) {
      this.permissoes.push({...this.novaPermissao});
      this.novaPermissao = {
        servidor: '',
        conta: '',
        bancoDados: '',
        permissao: '',
        objeto: ''
      };
      
      // Log de auditoria
      this.registrarLogAuditoria('ADICIONAR_PERMISSAO', 'Nova permissão adicionada', this.novaPermissao);
    }
  }

  removerPermissao(index: number) {
    const permissaoRemovida = this.permissoes[index];
    this.permissoes.splice(index, 1);
    
    // Log de auditoria
    this.registrarLogAuditoria('REMOVER_PERMISSAO', 'Permissão removida', permissaoRemovida);
  }

  exibirDadosFormularios() {
    try {
      const dadosFormulario = {
        dados: this.dadosForm.value,
        impactos: this.impactosForm.value,
        mudanca: this.mudancaForm.value,
        planoVolta: this.planoVoltaForm.value,
        procedimentos: this.procedimentosForm.value,
        testes: this.testesForm.value,
        usuario: this.usuarioForm.value,
        permissoes: this.permissoesForm.value,
      };
      
      console.log('Dados do Formulário:', dadosFormulario);

      // Log de auditoria
      this.registrarLogAuditoria('VISUALIZAR_DADOS', 'Dados do formulário visualizados', dadosFormulario);

      const resposta = this.http.post( `${UrlHelper.BASE_URL}/api/Change/ProcessarMudanca`, dadosFormulario).subscribe(
        x =>{
          console.log('Resposta da API:', x);
          this.mostrarNotificacao('Sucesso', 'Dados enviados para a API com sucesso!', 'success');
        },
        error => {
          console.error('Erro na API:', error);
          this.mostrarNotificacao('Erro', 'Erro ao enviar dados para a API.', 'error');
        }
      );

    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      this.mostrarNotificacao('Erro', 'Erro ao processar o formulário. Por favor, tente novamente.', 'error');
    }
  }
}
