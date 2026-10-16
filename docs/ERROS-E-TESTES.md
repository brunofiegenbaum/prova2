# CHECKLIST DE TESTE MANUAL E SOLUÇÃO DE ERROS

O projeto foi estruturado com Expo SDK 57, mas não foi possível executar um dispositivo Expo Go neste ambiente. Use este documento para conferir o funcionamento no celular.

## Ambiente

- Instalar Node.js e npm.
- Instalar Expo Go compatível com o SDK do projeto.
- Executar npm install.
- Executar npx expo start --go.
- Testar celular e computador na mesma rede.
- Se houver problemas de rede: npx expo start --tunnel --go.
- Se houver cache antigo: npx expo start -c --go.
- SQLite no navegador precisa de configuração web extra; o alvo desta atividade é Expo Go no Android ou iOS.

## Navegação

[ ] Tela inicial abre sem erro vermelho.
[ ] Todos os 21 destinos do menu abrem (há 22 telas incluindo a inicial).
[ ] Botão nativo voltar funciona.
[ ] O cabeçalho tem título apropriado em cada tela.
[ ] Conteúdo não fica atrás da barra inferior.
[ ] Home permite rolar até o último cartão.

## Fundamentos

[ ] Flexbox alterna row e column.
[ ] Flexbox altera alinhamento e distribuição.
[ ] Contador do useState aumenta, diminui e zera.
[ ] TextInput exibe nome digitado.
[ ] Switch mostra/esconde explicação.
[ ] Temporizador para ao pausar; não cria múltiplos intervalos.
[ ] Lista em memória adiciona e remove.

## SQLite

[ ] Tarefas adiciona, marca concluída, filtra, edita, exclui.
[ ] Alunos cadastra, edita, pesquisa e valida idade inválida.
[ ] Biblioteca salva livro, marca lido, pesquisa e valida páginas.
[ ] Compras marca comprado, edita quantidade e exclui somente comprados.
[ ] Filmes aceita nota com vírgula e ponto, filtra favoritos, exibe média.
[ ] Notas cria disciplina e avaliação, edita, exclui e calcula média.
[ ] Excluir disciplina apaga avaliações relacionadas.
[ ] Despesas calcula o total apenas das categorias selecionadas.
[ ] Relatórios mostram contagens e agregações.
[ ] Dados de exemplo são adicionados mediante confirmação.
[ ] Limpeza apaga registros e mantém tabelas.
[ ] Dados continuam após fechar e reabrir o app.

## Complementos

[ ] API lista usuários quando há internet.
[ ] API mostra erro amigável quando falha a internet.
[ ] Fonte e contraste mudam na tela Acessibilidade.
[ ] Simulado percorre 24 questões e salva tentativas.
[ ] Reiniciar simulado não duplica o resultado.
[ ] Desafios abrem/fecham suas dicas.

## Erros comuns

**Cannot find module expo-sqlite:** instalar dependências e conferir package.json. Executar npx expo install expo-sqlite se necessário.

**SDK incompatível no Expo Go:** conferir SDK do projeto e a versão do aplicativo Expo Go. Evitar alterar apenas uma dependência isolada.

**Unmatched Route:** verificar o caminho e a existência do arquivo em src/app.

**Text strings must be rendered within a Text component:** renderizar textos dentro de Text; com Link envolvendo cartão de View/Pressable, usar asChild no Link.

**Too many re-renders:** não chamar a função durante o render em onPress. Usar onPress={salvar}, e não onPress={salvar()}.

**no such table:** checar nome do banco, CREATE TABLE e a tabela no SQL.

**Mudou CREATE TABLE e o banco não mudou:** IF NOT EXISTS não migra tabelas existentes. Fazer migração de esquema ou apagar o banco de teste de maneira consciente.

**Cadastro salva e lista não atualiza:** chamar carregar() depois de qualquer alteração.

**O input de idade/páginas/nota dá problema:** TextInput entrega string; converter com Number e validar antes de usar como INTEGER ou REAL.

**SQLite da web:** configuração de WASM/Metro/cabeçalhos é necessária; dê preferência ao Android/iOS para esta atividade.

**Dados de outros dispositivos não aparecem:** SQLite é armazenamento local, não um banco sincronizado.

**A API falha:** precisa de internet e do servidor remoto disponível. O erro não afeta as telas SQLite.

## Referências

- https://roveda.dev/materiais/sqlite
- https://roveda.dev/materiais/telas
- https://docs.expo.dev/versions/latest/sdk/sqlite/
- https://docs.expo.dev/router/basics/navigation/
