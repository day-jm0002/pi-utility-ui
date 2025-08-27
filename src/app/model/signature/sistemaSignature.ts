export class SistemaSignature {
  sistema: string;

  constructor(sistema: string) {
    this.sistema = sistema;
  }

  getNomeCompleto(): string {
    switch (this.sistema.toUpperCase()) {
      case 'PI':
        return 'Portal de Investimentos';
      case 'MO':
        return 'MiddleOffice';
      default:
        return '';
    }
  }
}