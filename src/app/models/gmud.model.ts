export class GmudModel {
    // Formulário 1.0 - Dados
    dadosForm = {
        tituloMudanca: '',
        dataAbertura: '',
        solicitante: '',
        dataHoraInicio: '',
        tempoExecucao: '',
        areaBeneficiada: '',
        emergencial: '',
        acao: '',
        justificativaEmergencial: '',
        calculosFinanceiros: '',
        lgpd: '',
        responsavelCiencia: '',
        rpa: '',
        servidor: '',
        planoVolta: '',
        justificativaPlanoVolta: '',
        monitoramento: '',
        equipeResponsavel: '',
        nomeSistema: '',
        tipoImpacto: '',
        servidorVip: '',
        nomeServico: '',
        tipoMonitoramento: '',
        healthCheck: '',
        tempoChecagem: '',
        quantidadeChecagem: '',
        firewall: '',
        auditoria: '',
        chamados: ''
    };

    // Formulário 2.0 - Mudança
    mudancaForm = {
        chamados: '',
        descricao: '',
        rotinaNoturna: '',
        operadorNoturno: ''
    };

    // Formulário 3.0 - Impactos
    impactosForm = {
        rotinaNoturna: '',
        operadorNoturno: ''
    };

    // Formulário 4.0 - Usuário
    usuarioForm = {
        treinamento: '',
        responsavelTreinamento: '',
        divulgacao: '',
        orientacaoHelpDesk: ''
    };

    // Formulário 5.0 - Testes
    testesForm = {
        homologacao: '',
        justificativaHomologacao: '',
        testesPrevios: '',
        justificativaTestesPrevios: '',
        descricaoTestes: '',
        resultadoTestes: '',
        responsavelTestes: '',
        testesPos: '',
        justificativaTestesPos: '',
        descricaoTestesPos: '',
        responsavelTestesPos: ''
    };

    // Formulário 6.0 - Permissões
    permissoesForm = {
        loginBanco: '',
        finalidadeCriacao: '',
        finalidadeManutencao: ''
    };

    // Formulário 7.0 - Procedimentos
    procedimentosForm = {
        couchbase: '',
        tipoAplicacao: '',
        procedimentosDBA: '',
        procedimentosRedes: '',
        procedimentosGestao: ''
    };

    // Formulário 8.0 - Plano de Volta
    planoVoltaForm = {
        couchbasePlanoVolta: '',
        tipoAplicacaoPlanoVolta: '',
        procedimentosDBAPlanoVolta: '',
        procedimentosRedesPlanoVolta: '',
        procedimentosGestaoPlanoVolta: ''
    };
} 