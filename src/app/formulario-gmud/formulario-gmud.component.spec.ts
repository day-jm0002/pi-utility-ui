import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormularioGmudComponent } from './formulario-gmud.component';

describe('FormularioGmudComponent', () => {
  let component: FormularioGmudComponent;
  let fixture: ComponentFixture<FormularioGmudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormularioGmudComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioGmudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialização dos Formulários', () => {
    it('deve inicializar todos os formulários com validações', () => {
      expect(component.dadosForm).toBeDefined();
      expect(component.mudancaForm).toBeDefined();
      expect(component.impactosForm).toBeDefined();
      expect(component.usuarioForm).toBeDefined();
      expect(component.testesForm).toBeDefined();
      expect(component.permissoesForm).toBeDefined();
      expect(component.procedimentosForm).toBeDefined();
      expect(component.planoVoltaForm).toBeDefined();
    });

    it('deve ter campos obrigatórios no formulário de dados', () => {
      const tituloControl = component.dadosForm.get('tituloMudanca');
      const dataAberturaControl = component.dadosForm.get('dataAbertura');
      const solicitanteControl = component.dadosForm.get('solicitante');

      expect(tituloControl?.hasValidator(Validators.required)).toBeTruthy();
      expect(dataAberturaControl?.hasValidator(Validators.required)).toBeTruthy();
      expect(solicitanteControl?.hasValidator(Validators.required)).toBeTruthy();
    });

    it('deve ter validação de comprimento mínimo para título', () => {
      const tituloControl = component.dadosForm.get('tituloMudanca');
      expect(tituloControl?.hasValidator(Validators.minLength(5))).toBeTruthy();
    });

    it('deve ter validação de comprimento mínimo para solicitante', () => {
      const solicitanteControl = component.dadosForm.get('solicitante');
      expect(solicitanteControl?.hasValidator(Validators.minLength(3))).toBeTruthy();
    });

    it('deve ter validação de comprimento mínimo para descrição da mudança', () => {
      const descricaoControl = component.mudancaForm.get('descricao');
      expect(descricaoControl?.hasValidator(Validators.minLength(20))).toBeTruthy();
    });
  });

  describe('Validações de Formulários', () => {
    it('deve ser inválido quando campos obrigatórios estão vazios', () => {
      expect(component.dadosForm.valid).toBeFalsy();
      expect(component.mudancaForm.valid).toBeFalsy();
    });

    it('deve ser válido quando campos obrigatórios são preenchidos', () => {
      component.dadosForm.patchValue({
        tituloMudanca: 'Teste de Mudança',
        dataAbertura: '2024-01-01',
        solicitante: 'João Silva',
        dataHoraInicio: '2024-01-01T10:00',
        tempoExecucao: '2 horas',
        areaBeneficiada: 'TI',
        emergencial: 'Produção parada sem solução de contorno',
        acao: 'Definitiva',
        calculosFinanceiros: 'Não',
        lgpd: 'Não',
        responsavelCiencia: 'Maria Santos',
        rpa: 'Não',
        servidor: 'Não',
        planoVolta: 'Não',
        monitoramento: 'Não',
        equipeResponsavel: 'Equipe TI',
        nomeSistema: 'Sistema Teste',
        firewall: 'Não',
        auditoria: 'Não',
        chamados: 'CHM001'
      });

      expect(component.dadosForm.valid).toBeTruthy();
    });

    it('deve validar comprimento mínimo do título', () => {
      const tituloControl = component.dadosForm.get('tituloMudanca');
      tituloControl?.setValue('Test');
      expect(tituloControl?.errors?.['minlength']).toBeTruthy();
      
      tituloControl?.setValue('Teste de Mudança');
      expect(tituloControl?.errors).toBeNull();
    });
  });

  describe('Navegação entre Abas', () => {
    it('deve começar na primeira aba', () => {
      expect(component.abaAtual).toBe(0);
    });

    it('deve navegar para a próxima aba', () => {
      const abaInicial = component.abaAtual;
      component.proximaAba();
      expect(component.abaAtual).toBe(abaInicial + 1);
    });

    it('deve navegar para a aba anterior', () => {
      component.abaAtual = 1;
      component.anteriorAba();
      expect(component.abaAtual).toBe(0);
    });

    it('não deve navegar além da primeira aba', () => {
      component.abaAtual = 0;
      component.anteriorAba();
      expect(component.abaAtual).toBe(0);
    });

    it('não deve navegar além da última aba', () => {
      component.abaAtual = 7;
      component.proximaAba();
      expect(component.abaAtual).toBe(7);
    });
  });

  describe('Cálculo de Progresso', () => {
    it('deve retornar 0% quando nenhum campo está preenchido', () => {
      expect(component.getProgressoFormulario()).toBe(0);
    });

    it('deve calcular progresso baseado nos campos preenchidos', () => {
      // Preenche alguns campos
      component.dadosForm.patchValue({
        tituloMudanca: 'Teste',
        dataAbertura: '2024-01-01',
        solicitante: 'João'
      });

      const progresso = component.getProgressoFormulario();
      expect(progresso).toBeGreaterThan(0);
      expect(progresso).toBeLessThanOrEqual(100);
    });
  });

  describe('Salvamento de Formulário', () => {
    it('deve mostrar erro quando formulário é inválido', () => {
      spyOn(component, 'mostrarNotificacao');
      component.salvarFormulario();
      
      expect(component.mostrarNotificacao).toHaveBeenCalledWith(
        'Erro de Validação',
        'Por favor, preencha todos os campos obrigatórios.',
        'error'
      );
    });

    it('deve marcar campos como touched ao tentar salvar', () => {
      const tituloControl = component.dadosForm.get('tituloMudanca');
      component.salvarFormulario();
      
      expect(tituloControl?.touched).toBeTruthy();
    });
  });

  describe('Geração de PDF', () => {
    it('deve mostrar notificação de processamento', async () => {
      spyOn(component, 'mostrarNotificacao');
      
      try {
        await component.gerarPDF();
      } catch (error) {
        // Ignora erro de teste
      }
      
      expect(component.mostrarNotificacao).toHaveBeenCalledWith(
        'Processando',
        'Gerando PDF...',
        'info'
      );
    });
  });

  describe('Notificações', () => {
    it('deve mostrar notificação toast', () => {
      component.mostrarNotificacao('Teste', 'Mensagem de teste', 'success');
      
      expect(component.mostrarToast).toBeTruthy();
      expect(component.toastTitulo).toBe('Teste');
      expect(component.toastMensagem).toBe('Mensagem de teste');
    });

    it('deve fechar notificação', () => {
      component.mostrarToast = true;
      component.fecharToast();
      
      expect(component.mostrarToast).toBeFalsy();
    });

    it('deve auto-hide notificação após 5 segundos', (done) => {
      jasmine.clock().install();
      
      component.mostrarNotificacao('Teste', 'Mensagem', 'info');
      expect(component.mostrarToast).toBeTruthy();
      
      jasmine.clock().tick(5000);
      
      setTimeout(() => {
        expect(component.mostrarToast).toBeFalsy();
        jasmine.clock().uninstall();
        done();
      }, 100);
    });
  });

  describe('Logs de Auditoria', () => {
    it('deve registrar log de auditoria', () => {
      spyOn(console, 'log');
      
      component.registrarLogAuditoria('TESTE', 'Descrição de teste', { dados: 'teste' });
      
      expect(console.log).toHaveBeenCalledWith('Log de Auditoria:', jasmine.any(Object));
    });

    it('deve incluir informações corretas no log', () => {
      spyOn(console, 'log');
      
      component.registrarLogAuditoria('ACAO_TESTE', 'Descrição', { campo: 'valor' });
      
      const logCall = (console.log as jasmine.Spy).calls.first();
      const logData = logCall.args[1];
      
      expect(logData.acao).toBe('ACAO_TESTE');
      expect(logData.descricao).toBe('Descrição');
      expect(logData.dados).toEqual({ campo: 'valor' });
      expect(logData.dataHora).toBeDefined();
      expect(logData.userAgent).toBeDefined();
    });
  });

  describe('Gerenciamento de Permissões', () => {
    it('deve adicionar nova permissão', () => {
      const permissaoInicial = component.permissoes.length;
      
      component.novaPermissao = {
        servidor: 'servidor1',
        conta: 'conta1',
        bancoDados: 'db1',
        permissao: 'SELECT',
        objeto: 'tabela1'
      };
      
      component.adicionarPermissao();
      
      expect(component.permissoes.length).toBe(permissaoInicial + 1);
      expect(component.permissoes[permissaoInicial]).toEqual(component.novaPermissao);
    });

    it('não deve adicionar permissão incompleta', () => {
      const permissaoInicial = component.permissoes.length;
      
      component.novaPermissao = {
        servidor: 'servidor1',
        conta: '',
        bancoDados: 'db1',
        permissao: 'SELECT',
        objeto: 'tabela1'
      };
      
      component.adicionarPermissao();
      
      expect(component.permissoes.length).toBe(permissaoInicial);
    });

    it('deve remover permissão', () => {
      // Adiciona uma permissão primeiro
      component.novaPermissao = {
        servidor: 'servidor1',
        conta: 'conta1',
        bancoDados: 'db1',
        permissao: 'SELECT',
        objeto: 'tabela1'
      };
      component.adicionarPermissao();
      
      const permissaoInicial = component.permissoes.length;
      component.removerPermissao(0);
      
      expect(component.permissoes.length).toBe(permissaoInicial - 1);
    });

    it('deve limpar nova permissão após adicionar', () => {
      component.novaPermissao = {
        servidor: 'servidor1',
        conta: 'conta1',
        bancoDados: 'db1',
        permissao: 'SELECT',
        objeto: 'tabela1'
      };
      
      component.adicionarPermissao();
      
      expect(component.novaPermissao.servidor).toBe('');
      expect(component.novaPermissao.conta).toBe('');
      expect(component.novaPermissao.bancoDados).toBe('');
      expect(component.novaPermissao.permissao).toBe('');
      expect(component.novaPermissao.objeto).toBe('');
    });
  });

  describe('Formulário Atual', () => {
    it('deve retornar o formulário correto para cada aba', () => {
      component.abaAtual = 0;
      expect(component.getFormularioAtual()).toBe(component.dadosForm);
      
      component.abaAtual = 1;
      expect(component.getFormularioAtual()).toBe(component.mudancaForm);
      
      component.abaAtual = 2;
      expect(component.getFormularioAtual()).toBe(component.impactosForm);
    });

    it('deve retornar dadosForm como padrão para índices inválidos', () => {
      component.abaAtual = 999;
      expect(component.getFormularioAtual()).toBe(component.dadosForm);
    });
  });

  describe('Validações de Campos Específicos', () => {
    it('deve validar campos de data', () => {
      const dataControl = component.dadosForm.get('dataAbertura');
      
      dataControl?.setValue('');
      expect(dataControl?.errors?.['required']).toBeTruthy();
      
      dataControl?.setValue('2024-01-01');
      expect(dataControl?.errors).toBeNull();
    });

    it('deve validar campos de radio button', () => {
      const emergencialControl = component.dadosForm.get('emergencial');
      
      emergencialControl?.setValue('');
      expect(emergencialControl?.errors?.['required']).toBeTruthy();
      
      emergencialControl?.setValue('Produção parada sem solução de contorno');
      expect(emergencialControl?.errors).toBeNull();
    });
  });

  describe('Integração com API', () => {
    it('deve processar dados do formulário', () => {
      spyOn(component, 'mostrarNotificacao');
      
      // Preenche dados mínimos
      component.dadosForm.patchValue({
        tituloMudanca: 'Teste',
        dataAbertura: '2024-01-01',
        solicitante: 'João',
        dataHoraInicio: '2024-01-01T10:00',
        tempoExecucao: '2 horas',
        areaBeneficiada: 'TI',
        emergencial: 'Produção parada sem solução de contorno',
        acao: 'Definitiva',
        calculosFinanceiros: 'Não',
        lgpd: 'Não',
        responsavelCiencia: 'Maria',
        rpa: 'Não',
        servidor: 'Não',
        planoVolta: 'Não',
        monitoramento: 'Não',
        equipeResponsavel: 'Equipe TI',
        nomeSistema: 'Sistema Teste',
        firewall: 'Não',
        auditoria: 'Não',
        chamados: 'CHM001'
      });
      
      component.exibirDadosFormularios();
      
      expect(component.mostrarNotificacao).toHaveBeenCalled();
    });
  });
});

