# GUIA DE ESTUDO — PROVA 2

Este guia foi organizado a partir dos temas ensinados na turma de Programação Mobile e de assuntos complementares. Não é gabarito de prova oficial.

## 1 — Conceitos básicos

**React Native** permite criar interfaces para Android e iOS usando React e JavaScript. **Expo** fornece ferramentas para criar, iniciar e testar projetos. **Expo Go** é o aplicativo de desenvolvimento que carrega o app no celular. **Expo Router** mapeia arquivos de src/app para rotas.

Comandos:

    npm install
    npx expo start --go
    npx expo start -c --go
    npx expo install expo-sqlite
    npx expo install react-native-safe-area-context

O SDK do projeto é 57, como no exemplo do professor de 02/10. Não atualize versões de dependências aleatoriamente.

## 2 — Componentes do React Native

- View: contêiner para agrupar elementos.
- Text: renderiza textos. Não deixe texto solto dentro de View.
- Button: botão simples com title e onPress.
- Pressable: área clicável com maior controle visual.
- TextInput: entrada de texto com value e onChangeText.
- Switch: alternância true/false.
- ScrollView: permite rolagem do conteúdo.
- FlatList: renderiza itens de um array com renderItem, data e keyExtractor.
- SafeAreaView: respeita o espaço do sistema.
- StyleSheet.create: cria um objeto com estilos.

Exemplo:

    const [nome, setNome] = useState("");
    <TextInput value={nome} onChangeText={setNome} />
    <Text>Olá, {nome}</Text>

Se value está presente sem onChangeText, o campo controlado não consegue refletir a digitação.

## 3 — React: componente, JSX, estado, efeito

Componente é função que retorna a interface. Use export default function Nome() para que o Expo Router encontre a tela.

useState guarda valor entre renders e retorna [estado, setter]. Chamar o setter pede uma nova renderização.

    const [contador, setContador] = useState(0);
    function aumentar() { setContador(contador + 1); }

Não escreva apenas contador = contador + 1: variável comum não provoca re-render.

useEffect executa após o render:

    useEffect(() => { carregar(); }, []);

Uma lista vazia indica execução após a montagem (pode haver execução extra em desenvolvimento, por causa do Strict Mode). Com [contador], executa quando contador muda. Sem array, executa após cada render.

Efeito com limpeza:

    useEffect(() => {
      const id = setInterval(() => {
        setSegundos((anterior) => anterior + 1);
      }, 1000);
      return () => clearInterval(id);
    }, []);

Não chame hooks dentro de if, loops ou após return condicional. Mantenha a ordem.

Diferença:

    onPress={salvar}    // correto; passa a função
    onPress={salvar()}  // executa durante o render, incorreto em geral

## 4 — Flexbox e estilização

O padrão de flexDirection no React Native é column. Se for row, os filhos ficam lado a lado.

- justifyContent distribui filhos no eixo principal (da flexDirection).
- alignItems alinha filhos no eixo cruzado.
- flex: 1 ocupa espaço restante.
- gap separa elementos filhos.
- padding é espaço interno.
- margin é espaço externo.
- backgroundColor, color, borderRadius, borderWidth estilizam.
- StyleSheet usa camelCase e dimensões numéricas: fontSize: 16.

Exemplo:

    <View style={{ flex: 1, flexDirection: "row",
      justifyContent: "space-between", alignItems: "center" }}>
      <Text>A</Text>
      <Text>B</Text>
    </View>

## 5 — Navegação

- src/app/index.js é a rota /.
- src/app/livros.js é a rota /livros.
- src/app/_layout.js não é tela: define o layout das rotas.
- Stack empilha telas e fornece cabeçalho/voltar.
- Link href="/livros" abre rota.
- router.push("/livros") navega por código.
- router.back() volta.
- Stack.Screen options permite alterar título da tela.

O SafeAreaProvider vai na raiz e a SafeAreaView na tela; com Stack.Header aparecendo, o material do professor usa edges com bottom.

## 6 — Banco SQLite

SQLite guarda informações num arquivo local sem precisar de internet. A lista em useState perde os dados quando o aplicativo encerra e é reiniciado, enquanto a base SQLite normalmente persiste.

Na base da aula:

    import * as SQLite from "expo-sqlite";
    const db = SQLite.openDatabaseSync("meubanco.db");

O banco é aberto fora do componente, pois isso não precisa repetir a cada render.

Criar tabela:

    db.execSync("CREATE TABLE IF NOT EXISTS alunos (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "nome TEXT NOT NULL, idade INTEGER NOT NULL)");

- INTEGER = inteiro.
- TEXT = texto.
- REAL = número decimal.
- PRIMARY KEY = chave que identifica o registro.
- AUTOINCREMENT = identificador gerado pelo banco.
- NOT NULL = valor não pode ser NULL, mas ainda aceita string vazia.

CRUD:

    function listar() {
      return db.getAllSync("SELECT * FROM alunos ORDER BY id DESC");
    }
    function salvar(nome, idade) {
      db.runSync("INSERT INTO alunos (nome, idade) VALUES (?, ?)", [nome, idade]);
    }
    function edita(nome, idade, id) {
      db.runSync("UPDATE alunos SET nome = ?, idade = ? WHERE id = ?", [nome, idade, id]);
    }
    function excluir(id) {
      db.runSync("DELETE FROM alunos WHERE id = ?", [id]);
    }

Os pontos de interrogação são parâmetros que protegem valores do usuário e evitam concatenação perigosa no SQL.

## 7 — Banco e tela sincronizados

O banco não atualiza o estado do React automaticamente. Por isso:

    const [lista, setLista] = useState([]);

    function carregar() {
      setLista(listar());
    }

    useEffect(() => { carregar(); }, []);

Após INSERT, UPDATE ou DELETE chame carregar(). Ela faz SELECT e setLista, redesenhando a FlatList.

    <FlatList
      data={lista}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <Text>{item.nome}</Text>}
    />

O id da chave precisa ser único e convertido para texto.

## 8 — Edição de cadastro

Crie idEditando = 0 (ou null; escolha uma convenção e seja consistente). Ao clicar editar, preencha o formulário e defina o id. Ao salvar: se idEditando = 0, INSERT; se não, UPDATE. Depois limpe os campos, zere o id e carregue a lista.

É um padrão usado explicitamente no arquivo bordel.js da aula de 02/10.

## 9 — Validação

Antes de salvar:

    if (nome.trim() === "") {
      Alert.alert("Atenção", "Preencha o nome.");
      return;
    }

Para inteiro positivo:

    const paginasNumero = Number(paginas);
    if (!paginas.trim() || !Number.isSafeInteger(paginasNumero) || paginasNumero <= 0) {
      Alert.alert("Atenção", "Informe páginas válidas.");
      return;
    }

Para decimais no formato brasileiro:

    const notaNumero = Number(nota.trim().replace(",", "."));
    if (!nota.trim() || !Number.isFinite(notaNumero) || notaNumero < 0 || notaNumero > 10) {
      Alert.alert("Atenção", "Nota inválida.");
      return;
    }

## 10 — Agregação, relações e consultas

    SELECT COUNT(*) FROM alunos;
    SELECT AVG(nota) FROM filmes;
    SELECT SUM(valor) FROM despesas;
    SELECT MAX(nota) FROM filmes;
    SELECT * FROM alunos WHERE idade >= 18 ORDER BY nome;
    SELECT categoria, SUM(valor) FROM despesas GROUP BY categoria;
    SELECT * FROM tarefas ORDER BY id DESC LIMIT 5;

Relacionamento 1:N: uma disciplina pode possuir várias avaliações.

    SELECT d.nome, a.descricao, a.nota
    FROM avaliacoes a
    INNER JOIN disciplinas d ON d.id = a.disciplina_id;

FOREIGN KEY referencia a tabela pai. ON DELETE CASCADE apaga os registros filhos ao apagar o pai, desde que PRAGMA foreign_keys = ON.

INNER JOIN apresenta correspondências. LEFT JOIN mantém as linhas da tabela esquerda mesmo sem correspondência.

## 11 — API, JavaScript assíncrono

    async function carregar() {
      try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!resposta.ok) throw new Error("HTTP " + resposta.status);
        const dados = await resposta.json();
        setLista(dados);
      } catch (erro) {
        Alert.alert("Erro", erro.message);
      }
    }

fetch consulta recursos pela rede. O banco SQLite local é independente de API e da internet. HTTP GET busca, POST cria, PUT/PATCH atualiza e DELETE remove no servidor (o comportamento depende da API).

## 12 — Acessibilidade

- accessibilityLabel: descrição falada por leitor de tela.
- accessibilityHint: o que acontecerá ao ativar.
- accessibilityRole: papel, como button/checkbox.
- accessibilityState: se está selecionado, marcado ou desabilitado.
- Garantir contraste, tamanho de fonte legível e área de toque.
- Não depender apenas de cor para passar informação.

## 13 — Erros clássicos que podem cair

1. no such table: nome da tabela errado ou CREATE TABLE não executou.
2. Cadastro salvo mas não aparece: falta carregar() depois do INSERT.
3. Nada aparece quando reabre: falta useEffect com carregar().
4. Coluna nova não aparece: IF NOT EXISTS não modifica a tabela existente.
5. Input não aceita texto: value sem onChangeText.
6. Too many re-renders: função executada no onPress durante o render.
7. Unmatched Route: arquivo da rota não existe ou nome não bate.
8. Missing default export: tela sem export default.
9. Erro TEXT/INTEGER: estado do TextInput é string; converter antes de salvar.
10. Android Expo Go versus web: SQLite web exige configuração extra.

## Fontes principais

- Repositório 2026B: https://github.com/mateusrovedaa/aulas-mobile-tecnico-2026B
- Hooks: https://roveda.dev/materiais/hooks
- Telas: https://roveda.dev/materiais/telas
- SQLite: https://roveda.dev/materiais/sqlite
- Revisão Flexbox: https://roveda.dev/materiais/revisao
- Expo SQLite: https://docs.expo.dev/versions/latest/sdk/sqlite/
