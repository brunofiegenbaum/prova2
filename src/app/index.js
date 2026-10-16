import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const grupos = [
  {
    titulo: "1 · FUNDAMENTOS",
    descricao: "Aprenda como a tela é desenhada e como ela muda.",
    paginas: [
      ["estilos", "Flexbox e estilos", "View, Text, StyleSheet, alinhamentos e caixas"],
      ["hooks", "Hooks e estados", "useState, useEffect e campos controlados"],
      ["navegacao", "Várias telas", "Expo Router, Link, Stack e área segura"],
      ["lista-memoria", "Lista na memória", "FlatList e estado sem SQLite"],
      ["temporizador", "Temporizador", "Efeitos, intervalos e limpeza"],
    ],
  },
  {
    titulo: "2 · SQLITE E CRUD",
    descricao: "Exemplos práticos usando banco local.",
    paginas: [
      ["tarefas-db", "Tarefas com SQLite", "INSERT, SELECT, UPDATE, DELETE e filtro"],
      ["alunos", "Cadastro de alunos", "CRUD com nome, curso e idade"],
      ["biblioteca", "Biblioteca", "CRUD, pesquisa, contagem e leitura"],
      ["compras", "Lista de compras", "Quantidade, checkbox e totalizações"],
      ["filmes", "Filmes", "Nota decimal, favoritos, ordenação"],
      ["notas", "Disciplinas e notas", "Relação 1:N, JOIN e média"],
      ["despesas", "Controle financeiro", "Valores, categorias e SUM"],
    ],
  },
  {
    titulo: "3 · COMPLEMENTOS DE PROVA",
    descricao: "Assuntos extras para reconhecer e praticar.",
    paginas: [
      ["relatorios", "Relatórios SQL", "COUNT, AVG, SUM, GROUP BY e JOIN"],
      ["api", "Consumo de API", "fetch, loading, erros e FlatList"],
      ["acessibilidade", "Acessibilidade", "Labels, papéis e tamanho de fonte"],
      ["quiz", "Simulado interativo", "Perguntas e histórico em SQLite"],
      ["desafios", "Desafios de programação", "Questões práticas com gabarito"],
      ["dados", "Banco de demonstração", "Popular, limpar e reiniciar dados"],
      ["comparacao", "Flutter x React Native", "Diferenças, vantagens e limitações"],
      ["atualidades", "Atualidades de tecnologia", "Notícias e leituras enviadas"],
      ["sobre", "Como usar este projeto", "Roteiro e referências da disciplina"],
    ],
  },
];

export default function Inicio() {
  return (
    <SafeAreaView style={s.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Prova 2 · Laboratório" }} />
      <ScrollView contentContainerStyle={s.conteudo}>
        <View style={s.destaque}>
          <Text style={s.chamada}>LABORATÓRIO MOBILE</Text>
          <Text style={s.titulo}>Praticar é melhor do que decorar.</Text>
          <Text style={s.paragrafo}>
            App de revisão de React Native, Expo Router e SQLite, inspirado nos exemplos do professor Mateus Roveda.
          </Text>
          <Text style={s.aviso}>Comece por Fundamentos. Depois tente alterar os CRUDs sozinho.</Text>
        </View>
        {grupos.map((grupo) => (
          <View key={grupo.titulo} style={s.grupo}>
            <Text style={s.grupoTitulo}>{grupo.titulo}</Text>
            <Text style={s.grupoDescricao}>{grupo.descricao}</Text>
            {grupo.paginas.map((pagina) => (
              <Link key={pagina[0]} href={"/" + pagina[0]} asChild>
                <Pressable style={s.item} accessibilityRole="link" accessibilityLabel={"Abrir " + pagina[1]}>
                  <View>
                    <Text style={s.itemTitulo}>{pagina[1]}  →</Text>
                    <Text style={s.itemDescricao}>{pagina[2]}</Text>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        ))}
        <Text style={s.rodape}>Todo o conteúdo foi organizado para estudar. Os exercícios não garantem o que cairá na prova.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#f5f7fb" },
  conteudo: { padding: 16, paddingBottom: 36 },
  destaque: { padding: 20, backgroundColor: "#153776", borderRadius: 16, marginBottom: 24 },
  chamada: { fontSize: 12, color: "#b6d4ff", fontWeight: "bold", letterSpacing: 1, marginBottom: 10 },
  titulo: { color: "white", fontSize: 28, lineHeight: 34, fontWeight: "bold" },
  paragrafo: { color: "#e2eaff", fontSize: 15, lineHeight: 23, marginTop: 10 },
  aviso: { color: "white", fontSize: 13, marginTop: 14, fontWeight: "600" },
  grupo: { marginBottom: 23 },
  grupoTitulo: { color: "#142b54", fontSize: 17, fontWeight: "bold" },
  grupoDescricao: { color: "#52627b", marginTop: 4, marginBottom: 11 },
  item: {
    backgroundColor: "white", borderWidth: 1, borderColor: "#dce4ef",
    padding: 15, borderRadius: 12, marginBottom: 8,
  },
  itemTitulo: { fontSize: 16, fontWeight: "bold", color: "#16376d" },
  itemDescricao: { fontSize: 13, color: "#52627b", marginTop: 5 },
  rodape: { color: "#52627b", textAlign: "center", fontSize: 12, marginTop: 5 },
});
