import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-gmud',
  templateUrl: './gmud.component.html',
  styleUrl: './gmud.component.scss'
})
export class GmudComponent implements OnInit {
  gmudForm!: FormGroup;
  listaGmuds: any[] = [];
  errosValidacao: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.configurarMascaraNumeroGmud();
    this.configurarLimpezaErros();
    this.configurarValidacaoCondicionalHead();
    this.configurarValidacaoCondicionalTimes();
  }

  /**
   * Configura validação condicional do campo Head Informado
   * Se possuiImpactoOutrosTimesTI for "Sim", headInformado se torna obrigatório
   */
  configurarValidacaoCondicionalHead(): void {
    this.gmudForm.get('possuiImpactoOutrosTimesTI')?.valueChanges.subscribe(valor => {
      const headInformadoControl = this.gmudForm.get('headInformado');
      if (valor === 'Sim') {
        headInformadoControl?.setValidators(Validators.required);
      } else {
        headInformadoControl?.clearValidators();
        headInformadoControl?.setValue('', { emitEvent: false });
      }
      headInformadoControl?.updateValueAndValidity({ emitEvent: false });
    });
  }

  /**
   * Configura validação condicional dos campos de horário por time
   * Se o time for "Sim", o horário se torna obrigatório
   */
  configurarValidacaoCondicionalTimes(): void {
    const times = [
      { necessario: 'necessarioTimeServidores', horario: 'horaExecucaoTimeServidores', nome: 'Time Servidores' },
      { necessario: 'necessarioTimeDBA', horario: 'horaExecucaoTimeDBA', nome: 'Time DBA' },
      { necessario: 'necessarioTimeRedesSeguranca', horario: 'horaExecucaoTimeRedesSeguranca', nome: 'Time Redes Segurança' },
      { necessario: 'necessarioDemaisTimes', horario: 'horaExecucaoDemaisTimes', nome: 'Demais Times' }
    ];

    times.forEach(time => {
      this.gmudForm.get(time.necessario)?.valueChanges.subscribe(valor => {
        const horarioControl = this.gmudForm.get(time.horario);
        if (valor === 'Sim') {
          horarioControl?.setValidators(Validators.required);
        } else {
          horarioControl?.clearValidators();
          horarioControl?.setValue('', { emitEvent: false });
        }
        horarioControl?.updateValueAndValidity({ emitEvent: false });
      });
    });
  }

  /**
   * Configura a limpeza automática de erros quando o formulário se tornar válido
   */
  configurarLimpezaErros(): void {
    this.gmudForm.statusChanges.subscribe(status => {
      if (status === 'VALID' && this.errosValidacao.length > 0) {
        this.errosValidacao = [];
      }
    });
  }

  /**
   * Configura a formatação automática do campo número da GMUD
   */
  configurarMascaraNumeroGmud(): void {
    this.gmudForm.get('numeroGmud')?.valueChanges.subscribe(value => {
      if (value) {
        // Remove tudo que não é letra ou número
        let valorFormatado = value.replace(/[^A-Za-z0-9]/g, '');
        
        // Aplica a máscara R## ## #####
        if (valorFormatado.length > 0) {
          // Garante que começa com letra
          if (!/^[A-Za-z]/.test(valorFormatado)) {
            valorFormatado = 'R' + valorFormatado;
          }
          
          // Aplica a formatação
          if (valorFormatado.length > 1) {
            const parte1 = valorFormatado.substring(0, 3); // R + 2 dígitos
            const parte2 = valorFormatado.substring(3, 5); // 2 dígitos
            const parte3 = valorFormatado.substring(5, 10); // 5 dígitos
            
            let formatado = parte1;
            if (parte2) formatado += ' ' + parte2;
            if (parte3) formatado += ' ' + parte3;
            
            // Atualiza o valor sem disparar o valueChanges novamente
            this.gmudForm.get('numeroGmud')?.setValue(formatado, { emitEvent: false });
          }
        }
      }
    });
  }

  initializeForm(): void {
    this.gmudForm = this.fb.group({
      numeroGmud: ['', Validators.required],
      headResponsavelTI: ['', Validators.required],
      quemIraExecutar: ['', Validators.required],
      possuiRollback: ['Não'],
      sistemasImpactados: ['', Validators.required],
      servidoresImpactados: ['', Validators.required],
      possuiAprovacaoAreaUsuario: ['Não'],
      usuarioInformado: ['', Validators.required],
      possuiImpactoOutrosTimesTI: ['Não'],
      headInformado: [''],
      descricaoExecucao: ['', Validators.required],
      dataExecucao: ['', Validators.required],
      tempoExecucao: ['', Validators.required],
      horaInicioExecucao: ['', Validators.required],
      temPlanoB: ['Não'],
      descricaoPlanoB: ['', Validators.required],
      necessarioTimeServidores: ['Não'],
      horaExecucaoTimeServidores: [''],
      necessarioTimeDBA: ['Não'],
      horaExecucaoTimeDBA: [''],
      necessarioTimeRedesSeguranca: ['Não'],
      horaExecucaoTimeRedesSeguranca: [''],
      necessarioDemaisTimes: ['Não'],
      horaExecucaoDemaisTimes: [''],
      critica: ['Não'],
      tipo: ['', Validators.required],
      necessarioComitePresencial: ['Não']
    });
  }

  /**
   * Valida os campos obrigatórios e retorna lista de erros
   */
  validarCampos(formValue: any): string[] {
    const erros: string[] = [];
    const camposObrigatorios = [
      { campo: 'numeroGmud', nome: 'Nº da GMUD' },
      { campo: 'headResponsavelTI', nome: 'Head Responsável TI' },
      { campo: 'quemIraExecutar', nome: 'Quem irá executar a GMUD' },
      { campo: 'sistemasImpactados', nome: 'Sistema(s) Impactado(s)' },
      { campo: 'servidoresImpactados', nome: 'Servidor(es) Impactado(s)' },
      { campo: 'usuarioInformado', nome: 'Quem foi usuário informado?' },
      { campo: 'descricaoExecucao', nome: 'Breve descrição do que será executado na GMUD' },
      { campo: 'dataExecucao', nome: 'Data execução da GMUD' },
      { campo: 'tempoExecucao', nome: 'Tempo de Execução' },
      { campo: 'horaInicioExecucao', nome: 'Hora de início execução da GMUD' },
      { campo: 'tipo', nome: 'Tipo' },
      { campo: 'descricaoPlanoB', nome: 'Descrição do Plano B' }
    ];

    camposObrigatorios.forEach(campo => {
      const valor = formValue[campo.campo];
      if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
        erros.push(campo.nome);
      }
    });

    // Validação condicional: se possuiImpactoOutrosTimesTI for "Sim", headInformado é obrigatório
    if (formValue.possuiImpactoOutrosTimesTI === 'Sim') {
      const headInformado = formValue.headInformado;
      if (!headInformado || (typeof headInformado === 'string' && headInformado.trim() === '')) {
        erros.push('Qual Head foi informado?');
      }
    }

    // Validação condicional dos horários por time
    const times = [
      { necessario: 'necessarioTimeServidores', horario: 'horaExecucaoTimeServidores', nome: 'Hora Execução time Servidores' },
      { necessario: 'necessarioTimeDBA', horario: 'horaExecucaoTimeDBA', nome: 'Hora execução time DBA' },
      { necessario: 'necessarioTimeRedesSeguranca', horario: 'horaExecucaoTimeRedesSeguranca', nome: 'Hora execução time Redes Segurança' },
      { necessario: 'necessarioDemaisTimes', horario: 'horaExecucaoDemaisTimes', nome: 'Hora execução demais times' }
    ];

    times.forEach(time => {
      if (formValue[time.necessario] === 'Sim') {
        const horario = formValue[time.horario];
        if (!horario || (typeof horario === 'string' && horario.trim() === '')) {
          erros.push(time.nome);
        }
      }
    });

    return erros;
  }

  /**
   * Adiciona a GMUD atual à lista
   */
  adicionarALista(): void {
    const formValue = { ...this.gmudForm.value };
    const erros = this.validarCampos(formValue);
    
    // Se houver erros, marca os campos e não adiciona à lista
    if (erros.length > 0) {
      this.errosValidacao = erros;
      this.marcarCamposComErro(erros);
      this.scrollParaPrimeiroErro();
      return;
    }
    
    // Limpa erros se não houver
    this.errosValidacao = [];
    
    // Adiciona à lista apenas se não houver erros
    const itemGmud = {
      ...formValue,
      erros: [],
      valido: true
    };
    
    this.listaGmuds.push(itemGmud);
    this.limparFormulario();
  }

  /**
   * Marca os campos com erro no formulário
   */
  marcarCamposComErro(erros: string[]): void {
    const camposObrigatorios: { [key: string]: string } = {
      'Nº da GMUD': 'numeroGmud',
      'Head Responsável TI': 'headResponsavelTI',
      'Quem irá executar a GMUD': 'quemIraExecutar',
      'Sistema(s) Impactado(s)': 'sistemasImpactados',
      'Servidor(es) Impactado(s)': 'servidoresImpactados',
      'Quem foi usuário informado?': 'usuarioInformado',
      'Qual Head foi informado?': 'headInformado',
      'Breve descrição do que será executado na GMUD': 'descricaoExecucao',
      'Data execução da GMUD': 'dataExecucao',
      'Tempo de Execução': 'tempoExecucao',
      'Hora de início execução da GMUD': 'horaInicioExecucao',
      'Tipo': 'tipo',
      'Descrição do Plano B': 'descricaoPlanoB',
      'Hora Execução time Servidores': 'horaExecucaoTimeServidores',
      'Hora execução time DBA': 'horaExecucaoTimeDBA',
      'Hora execução time Redes Segurança': 'horaExecucaoTimeRedesSeguranca',
      'Hora execução demais times': 'horaExecucaoDemaisTimes'
    };

    // Marca todos os campos como touched e adiciona erro
    erros.forEach(nomeCampo => {
      const campoForm = camposObrigatorios[nomeCampo];
      if (campoForm) {
        const control = this.gmudForm.get(campoForm);
        if (control) {
          control.markAsTouched();
          control.setErrors({ required: true });
        }
      }
    });
  }

  /**
   * Faz scroll para o primeiro campo com erro
   */
  scrollParaPrimeiroErro(): void {
    setTimeout(() => {
      const primeiroErro = document.querySelector('.is-invalid, .ng-invalid.ng-touched');
      if (primeiroErro) {
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (primeiroErro as HTMLElement).focus();
      }
    }, 100);
  }

  /**
   * Remove uma GMUD da lista pelo índice
   */
  removerDaLista(index: number): void {
    const gmud = this.listaGmuds[index];
    if (confirm(`Deseja remover a GMUD ${gmud.numeroGmud || ''} da lista?`)) {
      this.listaGmuds.splice(index, 1);
    }
  }

  /**
   * Limpa toda a lista de GMUDs
   */
  limparLista(): void {
    if (this.listaGmuds.length === 0) {
      return;
    }
    if (confirm(`Deseja remover todas as ${this.listaGmuds.length} GMUD(s) da lista?`)) {
      this.listaGmuds = [];
    }
  }

  /**
   * Exporta os dados do formulário para Excel
   * Gera um arquivo Excel com todas as GMUDs da lista
   * Aplica estilos: cabeçalho azul com texto branco e bordas nas células
   */
  exportarParaExcel(): void {
    if (this.listaGmuds.length === 0) {
      alert('A lista está vazia. Adicione pelo menos uma GMUD antes de exportar.');
      return;
    }


    // Prepara os dados para exportação de todas as GMUDs da lista
    const dadosExportacao = this.listaGmuds.map(formValue => ({
      'Nº da GMUD': formValue.numeroGmud || '',
      'Head Responsável TI': formValue.headResponsavelTI || '',
      'Quem irá executar a GMUD': formValue.quemIraExecutar || '',
      'GMUD é devido um rollback?': formValue.possuiRollback || '',
      'Sistema(s) Impactado(s)': formValue.sistemasImpactados || '',
      'Servidor(es) Impactado(s)': formValue.servidoresImpactados || '',
      'Possui aprovação da área usuária?': formValue.possuiAprovacaoAreaUsuario || '',
      'Quem foi usuário informado?': formValue.usuarioInformado || '',
      'Possui impacto em outros times da TI?': formValue.possuiImpactoOutrosTimesTI || '',
      'Qual Head foi informado?': formValue.headInformado || '',
      'Breve descrição do que será executado na GMUD': formValue.descricaoExecucao || '',
      'Data execução da GMUD': this.formatarData(formValue.dataExecucao),
      'Tempo de Execução': formValue.tempoExecucao || '',
      'Hora de início execução da GMUD': this.formatarHora(formValue.horaInicioExecucao),
      'Tem Plano B?': formValue.temPlanoB || '',
      'Descrição do Plano B': formValue.descricaoPlanoB || '',
      'Hora Execução time Servidores': this.formatarHoraTime(formValue.necessarioTimeServidores, formValue.horaExecucaoTimeServidores),
      'Hora execução time DBA': this.formatarHoraTime(formValue.necessarioTimeDBA, formValue.horaExecucaoTimeDBA),
      'Hora execução time Redes Segurança': this.formatarHoraTime(formValue.necessarioTimeRedesSeguranca, formValue.horaExecucaoTimeRedesSeguranca),
      'Hora execução demais times': this.formatarHoraTime(formValue.necessarioDemaisTimes, formValue.horaExecucaoDemaisTimes),
      'Crítica?': formValue.critica || '',
      'Tipo': formValue.tipo || '',
      'Necessário Comitê Presencial?': formValue.necessarioComitePresencial || ''
    }));

    // Cria a planilha
    const worksheet = XLSX.utils.json_to_sheet(dadosExportacao);
    
    // Obtém o range da planilha
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    
    // Define o estilo de borda padrão
    const borderStyle = {
      top: { style: 'thin', color: { rgb: '000000' } },
      bottom: { style: 'thin', color: { rgb: '000000' } },
      left: { style: 'thin', color: { rgb: '000000' } },
      right: { style: 'thin', color: { rgb: '000000' } }
    };

    // Aplica estilos ao cabeçalho (primeira linha)
    const headerStyle = {
      fill: {
        fgColor: { rgb: '4472C4' } // Azul
      },
      font: {
        color: { rgb: 'FFFFFF' }, // Branco
        bold: true,
        sz: 11
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true
      },
      border: borderStyle
    };

    // Aplica estilos às células de dados
    const dataStyle = {
      border: borderStyle,
      alignment: {
        vertical: 'center',
        wrapText: true
      }
    };

    // Estilo para células de data/hora de execução (texto vermelho)
    const dataExecucaoStyle = {
      border: borderStyle,
      alignment: {
        vertical: 'center',
        wrapText: true
      },
      font: {
        color: { rgb: 'FF0000' } // Vermelho
      }
    };

    // Colunas relacionadas à data/hora de execução que devem ficar em vermelho
    const colunasDataExecucao = [
      'Data execução da GMUD',
      'Tempo de Execução',
      'Hora de início execução da GMUD',
      'Hora Execução time Servidores',
      'Hora execução time DBA',
      'Hora execução time Redes Segurança',
      'Hora execução demais times'
    ];

    // Obtém os índices das colunas de data/hora de execução
    const indicesColunasDataExecucao: number[] = [];
    const headers = Object.keys(dadosExportacao[0]);
    headers.forEach((header, index) => {
      if (colunasDataExecucao.includes(header)) {
        indicesColunasDataExecucao.push(index);
      }
    });

    // Aplica estilos a todas as células
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        
        if (!worksheet[cellAddress]) {
          worksheet[cellAddress] = { v: '', t: 's' };
        }

        // Aplica estilo de cabeçalho na primeira linha
        if (row === range.s.r) {
          worksheet[cellAddress].s = headerStyle;
        } else {
          // Verifica se é uma coluna de data/hora de execução
          if (indicesColunasDataExecucao.includes(col)) {
            worksheet[cellAddress].s = dataExecucaoStyle;
          } else {
            // Aplica estilo de dados padrão nas demais linhas
            worksheet[cellAddress].s = dataStyle;
          }
        }
      }
    }

    // Ajusta a largura das colunas automaticamente
    const colWidths: Array<{ wch: number }> = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      let maxLength = 0;
      for (let row = range.s.r; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];
        if (cell && cell.v) {
          const cellValue = String(cell.v);
          maxLength = Math.max(maxLength, cellValue.length);
        }
      }
      // Define largura mínima de 15 e máxima de 50
      colWidths.push({ wch: Math.min(Math.max(maxLength + 2, 15), 50) });
    }
    worksheet['!cols'] = colWidths;

    // Define altura da linha do cabeçalho
    worksheet['!rows'] = [{ hpt: 30 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'GMUD');

    // Gera o nome do arquivo com a data no formato ano_mes_dia
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const nomeArquivo = `GMUDs_${this.listaGmuds.length}_${ano}_${mes}_${dia}.xlsx`;

    // Exporta o arquivo
    XLSX.writeFile(workbook, nomeArquivo);
    
    alert(`Arquivo Excel gerado com ${this.listaGmuds.length} GMUD(s)!`);
  }

  /**
   * Formata a data para exibição (DD/MM/YYYY)
   */
  formatarData(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  /**
   * Formata a hora para exibição (HH:mm)
   * Se for datetime-local, formata como DD/MM/YYYY HH:mm
   */
  private formatarHora(hora: string): string {
    if (!hora) return '';
    
    // Verifica se é datetime-local (formato: YYYY-MM-DDTHH:mm)
    if (hora.includes('T')) {
      // Parse manual para evitar problemas de timezone
      const partes = hora.split('T');
      if (partes.length === 2) {
        const [dataPart, horaPart] = partes;
        const [ano, mes, dia] = dataPart.split('-');
        const [horas, minutos] = horaPart.split(':');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      }
    }
    
    // Se for apenas hora (HH:mm), retorna como está
    return hora;
  }

  /**
   * Formata o horário do time para exportação
   * Se necessário for "Não", retorna "Não"
   * Se necessário for "Sim", retorna o horário formatado
   */
  private formatarHoraTime(necessario: string, horario: string): string {
    if (necessario === 'Não') {
      return 'Não';
    }
    if (necessario === 'Sim' && horario) {
      return this.formatarHora(horario);
    }
    return '';
  }

  /**
   * Limpa o formulário
   */
  limparFormulario(): void {
    this.errosValidacao = [];
    this.gmudForm.reset({
      numeroGmud: '',
      headResponsavelTI: '',
      quemIraExecutar: '',
      possuiRollback: 'Não',
      sistemasImpactados: '',
      servidoresImpactados: '',
      possuiAprovacaoAreaUsuario: 'Não',
      usuarioInformado: '',
      possuiImpactoOutrosTimesTI: 'Não',
      headInformado: '',
      descricaoExecucao: '',
      dataExecucao: '',
      tempoExecucao: '',
      horaInicioExecucao: '',
      temPlanoB: 'Não',
      descricaoPlanoB: '',
      horaExecucaoTimeServidores: '',
      horaExecucaoTimeDBA: '',
      horaExecucaoTimeRedesSeguranca: '',
      horaExecucaoDemaisTimes: '',
      critica: 'Não',
      tipo: '',
      necessarioComitePresencial: 'Não',
      necessarioTimeServidores: 'Não',
      necessarioTimeDBA: 'Não',
      necessarioTimeRedesSeguranca: 'Não',
      necessarioDemaisTimes: 'Não'
    });
  }
}
