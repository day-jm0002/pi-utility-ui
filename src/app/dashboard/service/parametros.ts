export class Parametros{

    constructor() {
            this.chaveLiberacao="c0bedab9-981f-436c-adc0-f5b326b2afde";
    }

    chaveLiberacao : string;
    funcionalidade : string;

    get FundosRelacao():string{
        return this.funcionalidade = "LISTARTERMOFUNDORELACAO";
      }
    get  ListaDeProdutos():string{
        return this.funcionalidade = "DRIVEMNETLISTARPORTIFOLIO";
      }
    get  CarteiraDeGerentes():string{
       return this.funcionalidade = "DRIVEMNETLISTARCARTEIRAGERENTE";
      }

      public obterFuncionalidade(tipo : TipoFuncionalidade):string{
        switch(tipo){
            case 1:{
                return this.FundosRelacao
            }
            case 2:{
                return this.ListaDeProdutos
            }
            case 3:{
                return this.CarteiraDeGerentes
            }
            default:{
                return 'Not found';
            }
        }
      }

}

export enum TipoFuncionalidade{
    FundosRelacao=1,
    ListaDeProdutos,
    CarteiraDeGerentes
}