function doPost(e) {
  try {
    // 1. Conecta com a planilha do Google onde este script está salvo
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 2. Transforma o texto que chegou do GitHub de volta em dados que o sistema entende
    var dados = JSON.parse(e.postData.contents);
    
    // 3. Define o nome da aba (Se o HTML não mandar nome, ele joga na aba "Geral")
    var nomeAba = dados.consultor || "Geral"; 
    
    // 4. Procura se já existe uma aba com o nome desse consultor
    var plan = ss.getSheetByName(nomeAba);
    
    // 5. Se a aba não existir, o sistema cria ela e já coloca a linha de cabeçalho!
    if (!plan) {
      plan = ss.insertSheet(nomeAba);
      
      // Criação dos cabeçalhos na linha 1 da nova aba
      plan.appendRow([
        "Data e Hora", 
        "Cliente", 
        "Empreendimento", 
        "Valor do Imóvel", 
        "Prestação Mensal", 
        "Valor Financiado", 
        "Desconto", 
        "Entrada", 
        "Desconto Morar Bem", 
        "Desconto Codhab", 
        "Entrada Facilitada", 
        "Observações", 
        "Taxas Cartoriais", 
        "Seguro Obra"
      ]);
    }
    
    // 6. Registra a data e hora exata em que o botão foi clicado
    var dataAtual = new Date();

    // 7. Insere uma nova linha debaixo do cabeçalho com os dados do cliente
    // (A ordem aqui está perfeitamente alinhada com os campos do seu HTML)
    plan.appendRow([
      dataAtual,
      dados.cliente,
      dados.empreendimento,
      dados.vImovelLocal,
      dados.vParcela,
      dados.vFinanciado,
      dados.vDesconto,
      dados.vEntrada,
      dados.vMorarBem,
      dados.vCodhab,
      dados.vEntradaFacil,
      dados.vObservacoes,
      dados.vCartorio,
      dados.vSeguroObra
    ]);

    // 8. Avisa o site no GitHub que deu tudo certo
    return ContentService.createTextOutput("Sucesso");
    
  } catch(erro) {
    // Se ocorrer alguma falha, manda a mensagem de erro para o painel
    return ContentService.createTextOutput("Erro: " + erro.toString());
  }
}
