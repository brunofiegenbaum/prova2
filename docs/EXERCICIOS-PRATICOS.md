# EXERCÍCIOS PRÁTICOS — SEIS SIMULADOS

Os desafios aqui não são avaliações oficiais. A intenção é praticar sem depender de copiar o código.

## Simulado 1 — React Native básico

Tempo sugerido: 35 minutos.

1. Crie uma tela com título e subtítulo, usando Text e View.
2. Deixe o fundo claro e o conteúdo com padding interno.
3. Monte três cartões em linha e distribua com justifyContent: space-between.
4. Crie contador iniciado em zero com dois botões (+1 e -1).
5. Acrescente botão Reset.
6. Crie TextInput e mostre o texto digitado em outra Text.
7. Mostre mensagem apenas quando um Switch estiver ligado.
8. Abra outra tela com Link.
9. Altere o título da segunda tela usando Stack.Screen.
10. Respeite SafeAreaView com edges bottom.
11. Explique para que serve StyleSheet.create.
12. Explique a diferença de View e ScrollView.

## Simulado 2 — CRUD SQLite

Tempo sugerido: 60 minutos.

Enunciado: crie um cadastro de produtos com nome, categoria e preço.

1. Abra o banco em arquivo fora do componente.
2. Crie produtos: id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, categoria TEXT, preco REAL.
3. Crie funções listar, salvar, excluir e edita com comandos SQL.
4. Mostre os dados usando FlatList.
5. Cadastre com TextInput controlado.
6. Valide nome/categoria não vazios e preço maior que zero.
7. Ao salvar, limpe os inputs e recarregue a lista.
8. Ao editar, preencha os inputs com dados do item.
9. O botão deve cadastrar ou editar conforme idEditando.
10. Adicione confirmação antes de excluir.
11. Mostre quantos produtos existem.
12. Mostre soma dos preços.
13. Adicione busca pelo nome.
14. Ordene por preço.
15. Faça uma tela inicial com botão ou link que abra o cadastro.

Critérios de autocorreção: os dados devem persistir após reiniciar o app; não deve apagar produto errado; editar não pode criar item duplicado; filtros devem refletir o estado atual.

## Simulado 3 — Duas tabelas relacionadas

Tempo sugerido: 50 minutos.

Enunciado: gerencie cursos e alunos matriculados.

1. Crie tabela cursos (id, nome).
2. Crie tabela matriculas (id, curso_id, aluno, situacao).
3. Relacione a coluna curso_id com cursos.id por FOREIGN KEY.
4. Cadastre curso e depois aluno matriculado.
5. Liste matrículas do curso selecionado.
6. Faça JOIN para mostrar o nome do curso.
7. Conte quantas matrículas por curso com GROUP BY.
8. Inclua confirmação de exclusão.
9. Explique diferença de INNER JOIN e LEFT JOIN.
10. Explique ON DELETE CASCADE.

## Simulado 4 — API e tratamento de erro

Tempo sugerido: 35 minutos.

1. Use fetch para consultar uma API pública.
2. Exiba ActivityIndicator durante o carregamento.
3. Exiba lista de dados com FlatList.
4. Crie botão Atualizar.
5. Mostre mensagem de erro quando não houver internet.
6. Faça pesquisa na lista recebida.
7. Explique diferença de fetch remoto e SQLite local.

## Simulado 5 — Corrija o código (nível professor)

Encontre a causa de cada comportamento.

1. setLista não é chamado depois do INSERT.
2. useEffect chama setLista e não tem lista de dependências.
3. TextInput tem value, mas não onChangeText.
4. onPress chama salvar() durante o render.
5. CREATE TABLE usa tarefas, SELECT usa tarefa.
6. UPDATE não tem WHERE.
7. FlatList recebe array de objetos, mas renderItem mostra apenas item.
8. idEditando nunca volta a zero depois de salvar.
9. UPDATE passa parâmetros em ordem diferente de SET e WHERE.
10. O novo campo foi incluído no CREATE TABLE, mas o app usa banco antigo.
11. O input de páginas chega como string e a função exige inteiro.
12. A rota foi criada em src/components ao invés de src/app.
13. Sem o SafeAreaProvider, um hook de insets não tem o provider necessário.
14. O código tenta armazenar estado mudando uma variável comum.
15. A consulta SQL é construída concatenando texto digitado pelo usuário.

## Simulado 6 — Conceitos e documentação

Escreva parágrafos curtos explicando:

1. Diferença entre Flutter e React Native.
2. Por que o React Native usa componentes e JSX.
3. Para que serve o Expo Go.
4. O que é SQL injection.
5. Por que dados do useState somem e dados do SQLite persistem.
6. O que faz cada parâmetro de useEffect.
7. Diferença de flexDirection, justifyContent e alignItems.
8. Como tornar um Button mais acessível.
9. Diferença de API HTTP e banco local.
10. Como testar uma aplicação em Android/iOS.

## Gabarito orientativo

Compare com os arquivos:
- src/app/estilos.js e hooks.js para Simulado 1.
- src/app/alunos.js e biblioteca.js para Simulado 2.
- src/app/notas.js e relatorios.js para Simulado 3.
- src/app/api.js para Simulado 4.
- docs/GUIA-DE-ESTUDO.md para Simulados 5 e 6.

Desafio final: recrie o cadastro de alunos sem consultar os arquivos do projeto.
