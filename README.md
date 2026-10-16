# PROVA 2 — Laboratório completo de Programação Mobile

Projeto didático em **React Native + Expo Router + Expo Go + SQLite**, criado para revisar os exemplos do professor Mateus Roveda e praticar outros conceitos que podem aparecer em avaliações de Programação Mobile.

O repositório era vazio e foi iniciado do zero. **Não é uma prova oficial, nem uma previsão garantida das questões.**

## Como executar (Windows, macOS ou Linux)

Precisa do Node.js, npm, celular Android/iPhone com Expo Go ou emulador compatível.

    git clone https://github.com/brunofiegenbaum/prova2.git
    cd prova2
    npm install
    npx expo start --go

Abra o **Expo Go**, leia o QR Code e abra o aplicativo. Celular e computador normalmente precisam estar na mesma rede. Caso a rede bloqueie a conexão, teste com:

    npx expo start --tunnel --go

Se aparecer algum problema de cache:

    npx expo start -c --go

**IMPORTANTE:** este projeto foi alinhado ao **Expo SDK 57**, usado no repositório da aula de 02/10/2026. Uma versão diferente do Expo Go pode exigir atualizar dependências. O SQLite do Expo não funciona na web sem configuração adicional: **priorize testar no celular**. Não foi necessário configurar servidor, Docker ou Postgres.

## Organização das pastas

    prova2/
      app.json
      package.json
      src/
        app/
          _layout.js           - Stack e área segura
          index.js             - Menu principal
          estilos.js           - Flexbox interativo
          hooks.js             - useState, useEffect, TextInput, Switch
          navegacao.js         - Link, router.push e Stack
          lista-memoria.js     - FlatList sem persistência
          temporizador.js      - intervalos e cleanup
          tarefas-db.js        - CRUD + filtros
          alunos.js            - CRUD + validação + busca
          biblioteca.js        - CRUD + lido + busca
          compras.js           - CRUD + marcadores
          filmes.js            - CRUD + notas + favoritos
          notas.js             - tabelas relacionadas, JOIN
          despesas.js          - valores REAL e filtros
          relatorios.js        - COUNT, AVG, SUM, GROUP BY, JOIN
          api.js               - fetch remoto, loading, erro
          acessibilidade.js    - accessibilityLabel, role, hint
          quiz.js              - simulado com resultado SQLite
          desafios.js          - 15 tarefas práticas
          dados.js             - popular e limpar o banco
          comparacao.js        - Flutter versus React Native
          atualidades.js       - notícias para leitura
          sobre.js             - roteiro no próprio app
        dados/
          banco.js             - SQLite com nove tabelas
          perguntas.js         - 24 questões explicadas
        componentes/
          Bloco.js             - componente reutilizável
        estilos/
          padrao.js            - StyleSheet reaproveitável
      docs/
        GUIA-DE-ESTUDO.md
        EXERCICIOS-PRATICOS.md
        ERROS-E-TESTES.md

## Conteúdo principal

**Fundamentos:** View, Text, ScrollView, Button, Pressable, Switch, SafeAreaView, StatusBar, Flexbox, StyleSheet, componentes, props, arrays, map, filter, reduce, eventos, useState, useEffect, navegação por arquivos e armazenamento somente na memória.

**SQLite:** CREATE TABLE, IF NOT EXISTS, PRIMARY KEY, AUTOINCREMENT, TEXT, INTEGER, REAL, NOT NULL, SELECT, WHERE, ORDER BY, INSERT, UPDATE, DELETE, COUNT, AVG, SUM, MAX, GROUP BY, INNER JOIN, LEFT JOIN, foreign keys, ON DELETE CASCADE e transações.

**Mais conteúdos:** consumo de API com fetch/async/await, validação, mensagens de erro, pesquisa, favoritos, cálculo de totais, formatação de campos, relatórios, acessibilidade, Flutter x React Native, leituras de tecnologia, simulado e desafios.

## Por que os códigos seguem este padrão?

A maior parte das telas foi escrita como nos exercícios mais recentes da turma:
- Arquivos JavaScript em src/app.
- Funções comuns declaradas com function e nomes em português.
- useState no topo do componente.
- useEffect(() => { carregar(); }, []) para ler registros ao abrir.
- SQL com parâmetros ?, sem concatenar entrada do usuário.
- carregar() depois de INSERT, UPDATE ou DELETE.
- FlatList com keyExtractor baseado no id do SQLite.
- SafeAreaView edges com a borda bottom, com Stack.Screen em cada tela.
- StyleSheet.create em um único arquivo compartilhado para os estilos repetidos. A tela de Flexbox mantém StyleSheet próprio.

O repositório das aulas 2026B usa SQLite diretamente nos arquivos; aqui, como são várias telas, centralizamos a criação das tabelas em src/dados/banco.js. As funções de CRUD continuam declaradas nas telas, para manter a leitura didática.

## Banco de dados

Arquivo local: laboratorio-prova2.db. Tabelas: tarefas, alunos, livros, compras, filmes, disciplinas, avaliacoes, despesas e resultados. O conteúdo normalmente persiste ao fechar o aplicativo. Desinstalar ou limpar os dados do app pode apagar esse banco. O app não sincroniza dados entre aparelhos.

As tabelas disciplinas e avaliacoes demonstram relacionamento 1:N; a exclusão em cascata depende da opção PRAGMA foreign_keys = ON.

**Banco de demonstração** permite inserir registros de exemplo ou excluir todos os registros mediante confirmação. A operação de exclusão NÃO pode ser desfeita.

## Roteiro rápido para antes da prova

1. Estilos -> Hooks -> Navegação -> Lista na memória.
2. Tarefas com SQLite -> Alunos -> Biblioteca.
3. Compras -> Filmes -> Notas -> Despesas.
4. Relatórios SQL -> API -> Acessibilidade.
5. Simulado -> Desafios práticos -> arquivos da pasta docs.

## Observações importantes

- Expo Go é o aplicativo de testes no celular. Expo é o conjunto de ferramentas de desenvolvimento; React Native é o framework de interface.
- O projeto foi elaborado e revisado estruturalmente, mas não foi possível executar um dispositivo Expo Go a partir deste ambiente. Teste no telefone antes de depender dele para estudo.
- Algumas ações usam Alert.alert, que deve ser testado em Android/iOS.
- A API pública de demonstração exige internet.
- Os links para artigos de tecnologia são referências externas, não são acessados automaticamente pelo aplicativo.

## Fontes da disciplina

- https://github.com/mateusrovedaa/aulas-mobile-tecnico-2026B
- https://github.com/mateusrovedaa/aulas-mobile-2026A
- https://roveda.dev/materiais/sqlite
- https://roveda.dev/materiais/telas
- https://roveda.dev/materiais/hooks
- https://roveda.dev/materiais/revisao
- https://docs.expo.dev/versions/latest/sdk/sqlite/
