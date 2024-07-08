export class UrlHelper {

    public static BASE_URL = 'http://sdaysp06d005/LimparCacheApi';
    private static readonly LIMPAR_CACHE_API = "http://sdaysp06d005/LimparCacheApi/api/";


    public static Ambiente = {
        ObterAmbientes: `${UrlHelper.BASE_URL}/api/Ambiente/ObterAmbientes`,
        AtualizarAmbientes: `${UrlHelper.BASE_URL}/api/Ambiente/AtualizarAmbientes`,
        AtualizarAmbientesQa: `${UrlHelper.BASE_URL}/api/Ambiente/AtualizarAmbientesQa`,
        AtualizarChamadoAmbientesQa: `${UrlHelper.BASE_URL}/api/Ambiente/AtualizarChamadoAmbientesQa`,
        ObterPacoteQa: `${UrlHelper.BASE_URL}/api/Ambiente/ObterPacoteQa`,
    };

    public static Negocio = {
        ObterTodosNegocio: `${UrlHelper.BASE_URL}/api/Negocios/ObterTodosNegocio`,
    };

    public static Desenvolvedor = {
        ObterTodosDev: `${UrlHelper.BASE_URL}/api/Desenvolvedor/ObterTodosDev`,
    };

    public static LimparCache = {
        LimparCache: `${UrlHelper.BASE_URL}/LimparCacheStage`,
        ObterPerfilSuitability: `${UrlHelper.BASE_URL}/ObterPerfilSuitability`
    };

    public static Fundos = {
        ObterFundosGestores: `${UrlHelper.BASE_URL}/api/Fundos/ObterFundosGestores`
    };

    public static Situacao = {
        ObterStatusSituacao: `${UrlHelper.BASE_URL}/ObterStatusSituacao`
    };

    public static Usuarios = {
        ObterUsuariosPI: `${UrlHelper.BASE_URL}/ObterUsuariosPI`,
        ObterUsuariosPIPorCodigoDeCliente: `${UrlHelper.BASE_URL}/ObterUsuariosPIPorCodigoDeCliente`,
        EditarUsuario: `${UrlHelper.BASE_URL}/EditarUsuario`,
    };   

    public static Autenticacao = {
        ObterTipoAutenticacao: `${UrlHelper.BASE_URL}/ObterTipoAutenticacao`,
        ObterTipoUsuario: `${UrlHelper.BASE_URL}/ObterTipoUsuario`,
    };

    public static AccessoControl = {
        ObterListaRole: `${UrlHelper.BASE_URL}/api/AccessoControl/ObterListaRole`,
    };  
    
    public static Monitoramento = {
        DriveAMnet: `${UrlHelper.LIMPAR_CACHE_API}Monitor/StatusDriveAMnet`,
        Sinacor: `${UrlHelper.LIMPAR_CACHE_API}Monitor/StatusSinacor`,
        SmartBrain: `${UrlHelper.LIMPAR_CACHE_API}Monitor/StatusSmartBrain`,
        Sisfinance: `${UrlHelper.LIMPAR_CACHE_API}Monitor/StatusSisfinance`,
        Infotreasury: "http://sdaysp06d005/LimparCacheApi/ObterStatusInfotreasury",
    };

    public static GestoresDeFundos = {
        ObterGestores: `${UrlHelper.BASE_URL}/api/Fundos/ObterGestores`,
    };
}