import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import Bloco from "../componentes/Bloco";
import { styles } from "../estilos/padrao";

export default function Relatorios() {
  const [dados, setDados] = useState(null);
  function carregar() {
    // SQL em vez de contar apenas no JavaScript.
    const totais = db.getFirstSync(
      "SELECT " +
      "(SELECT COUNT(*) FROM tarefas) AS tarefas, " +
      "(SELECT COUNT(*) FROM tarefas WHERE feita = 1) AS concluidas, " +
      "(SELECT COUNT(*) FROM alunos) AS alunos, " +
      "(SELECT COUNT(*) FROM livros) AS livros, " +
      "(SELECT COUNT(*) FROM filmes) AS filmes, " +
      "(SELECT COUNT(*) FROM compras) AS compras"
    );
    const notas = db.getAllSync(
      "SELECT d.nome, COUNT(a.id) AS quantidade, ROUND(AVG(a.nota), 2) AS media " +
      "FROM disciplinas d LEFT JOIN avaliacoes a ON d.id = a.disciplina_id " +
      "GROUP BY d.id, d.nome ORDER BY d.nome"
    );
    const despesas = db.getAllSync(
      "SELECT categoria, COUNT(*) AS quantidade, ROUND(SUM(valor), 2) AS total " +
      "FROM despesas GROUP BY categoria ORDER BY total DESC"
    );
    const filmes = db.getFirstSync(
      "SELECT COUNT(*) AS quantidade, ROUND(AVG(nota), 2) AS media, " +
      "MAX(nota) AS maior FROM filmes"
    );
    const recentes = db.getAllSync(
      "SELECT d.nome AS disciplina, a.descricao, a.nota " +
      "FROM avaliacoes a INNER JOIN disciplinas d ON d.id = a.disciplina_id " +
      "ORDER BY a.id DESC LIMIT 5"
    );
    setDados({ totais, notas, despesas, filmes, recentes });
  }
  useEffect(() => { carregar(); }, []);
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Relatórios SQLite" }} />
      <ScrollView>
        <Text style={styles.titulo}>Consultas e relatórios</Text>
        <Text style={styles.descricao}>Resumo montado com comandos SQL reais. Depois de cadastrar dados em outras telas, toque Atualizar.</Text>
        <Button title="Atualizar relatórios" onPress={carregar} />
        {dados && (
          <View style={{ marginTop: 14 }}>
            <Bloco titulo="COUNT: quantidade de registros">
              <Text style={styles.texto}>Tarefas: {dados.totais.tarefas} | Concluídas: {dados.totais.concluidas}</Text>
              <Text style={styles.texto}>Alunos: {dados.totais.alunos} | Livros: {dados.totais.livros}</Text>
              <Text style={styles.texto}>Filmes: {dados.totais.filmes} | Compras: {dados.totais.compras}</Text>
            </Bloco>
            <Bloco titulo="AVG e MAX: filmes">
              <Text style={styles.texto}>Média: {dados.filmes.media == null ? "Sem registros" : dados.filmes.media}</Text>
              <Text style={styles.texto}>Maior nota: {dados.filmes.maior == null ? "Sem registros" : dados.filmes.maior}</Text>
            </Bloco>
            <Bloco titulo="JOIN + GROUP BY: médias das disciplinas">
              {dados.notas.length === 0 && <Text style={styles.auxiliar}>Cadastre disciplinas e avaliações.</Text>}
              {dados.notas.map((item) => (
                <Text key={item.nome} style={styles.texto}>{item.nome}: {item.quantidade} prova(s), média {item.media == null ? "-" : item.media}</Text>
              ))}
            </Bloco>
            <Bloco titulo="SUM + GROUP BY: despesas">
              {dados.despesas.length === 0 && <Text style={styles.auxiliar}>Cadastre despesas.</Text>}
              {dados.despesas.map((item) => (
                <Text key={item.categoria} style={styles.texto}>{item.categoria}: {item.quantidade} registro(s), R$ {item.total.toFixed(2)}</Text>
              ))}
            </Bloco>
            <Bloco titulo="INNER JOIN: últimas avaliações">
              {dados.recentes.length === 0 && <Text style={styles.auxiliar}>Sem avaliações.</Text>}
              {dados.recentes.map((item, indice) => (
                <Text key={indice} style={styles.texto}>{item.disciplina} — {item.descricao}: {item.nota}</Text>
              ))}
            </Bloco>
            <Bloco titulo="Interpretação do SQL" texto="COUNT conta registros. AVG calcula média. SUM soma valores. GROUP BY agrupa. WHERE filtra linhas. HAVING filtra grupos. JOIN cruza tabelas. ORDER BY ordena. LIMIT limita quantas linhas retornar." />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
