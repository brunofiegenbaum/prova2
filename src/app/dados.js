import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { styles, cores } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

const tabelas = ["tarefas", "alunos", "livros", "compras", "filmes",
  "disciplinas", "avaliacoes", "despesas", "resultados"];

export default function Dados() {
  const [contagens, setContagens] = useState([]);
  function carregar() {
    setContagens(tabelas.map((nome) => {
      const registro = db.getFirstSync("SELECT COUNT(*) AS total FROM " + nome);
      return { nome, total: registro.total };
    }));
  }
  useEffect(() => { carregar(); }, []);

  function popular() {
    Alert.alert("Dados de demonstração", "Adicionar exemplos ao banco? Os dados existentes serão preservados.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Adicionar", onPress: () => {
        db.withTransactionSync(() => {
          db.runSync("INSERT INTO tarefas (texto) VALUES (?)", ["Revisar useState"]);
          db.runSync("INSERT INTO tarefas (texto, feita) VALUES (?, ?)", ["Estudar SQLite", 1]);
          db.runSync("INSERT INTO alunos (nome, curso, idade) VALUES (?, ?, ?)", ["Ana", "Informática", 19]);
          db.runSync("INSERT INTO alunos (nome, curso, idade) VALUES (?, ?, ?)", ["Pedro", "Programação Mobile", 20]);
          db.runSync("INSERT INTO livros (titulo, autor, paginas) VALUES (?, ?, ?)", ["O Pequeno Príncipe", "Antoine de Saint-Exupéry", 96]);
          db.runSync("INSERT INTO livros (titulo, autor, paginas, lido) VALUES (?, ?, ?, ?)", ["Dom Casmurro", "Machado de Assis", 256, 1]);
          db.runSync("INSERT INTO compras (produto, quantidade) VALUES (?, ?)", ["Caderno", 2]);
          db.runSync("INSERT INTO compras (produto, quantidade, comprado) VALUES (?, ?, ?)", ["Caneta", 3, 1]);
          db.runSync("INSERT INTO filmes (titulo, nota, favorito) VALUES (?, ?, ?)", ["Interestelar", 9.4, 1]);
          db.runSync("INSERT INTO filmes (titulo, nota) VALUES (?, ?)", ["Avatar", 8]);
          db.runSync("INSERT INTO despesas (descricao, categoria, valor) VALUES (?, ?, ?)", ["Almoço", "Alimentação", 28.5]);
          db.runSync("INSERT INTO despesas (descricao, categoria, valor) VALUES (?, ?, ?)", ["Ônibus", "Transporte", 6.75]);
          const nome = "Programação Mobile " + new Date().getTime();
          db.runSync("INSERT INTO disciplinas (nome) VALUES (?)", [nome]);
          const nova = db.getFirstSync("SELECT id FROM disciplinas WHERE nome = ?", [nome]);
          db.runSync("INSERT INTO avaliacoes (disciplina_id, descricao, nota) VALUES (?, ?, ?)", [nova.id, "Prova", 8.5]);
          db.runSync("INSERT INTO avaliacoes (disciplina_id, descricao, nota) VALUES (?, ?, ?)", [nova.id, "Trabalho", 9.0]);
        });
        carregar();
        Alert.alert("Sucesso", "Dados de demonstração cadastrados.");
      }},
    ]);
  }
  function limpar() {
    Alert.alert("ATENÇÃO", "Excluir TODOS os registros do laboratório? Não há desfazer.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar tudo", style: "destructive", onPress: () => {
        db.withTransactionSync(() => {
          // Exclui filhos primeiro: respeita as chaves estrangeiras.
          db.runSync("DELETE FROM avaliacoes");
          db.runSync("DELETE FROM disciplinas");
          db.runSync("DELETE FROM tarefas");
          db.runSync("DELETE FROM alunos");
          db.runSync("DELETE FROM livros");
          db.runSync("DELETE FROM compras");
          db.runSync("DELETE FROM filmes");
          db.runSync("DELETE FROM despesas");
          db.runSync("DELETE FROM resultados");
        });
        carregar();
        Alert.alert("Pronto", "O banco ficou sem registros.");
      }},
    ]);
  }
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Dados de demonstração" }} />
      <ScrollView>
        <Text style={styles.titulo}>Gerenciar o banco local</Text>
        <Text style={styles.descricao}>Para testar os CRUDs e relatórios sem cadastrar tudo à mão. Os registros ficam só no aparelho.</Text>
        <Bloco titulo="Popular as tabelas" texto="Inclui tarefas, alunos, livros, compras, filmes, despesas e disciplinas com avaliações. Pode ser repetido e adicionar registros duplicados.">
          <Button title="Inserir dados de exemplo" onPress={popular} />
        </Bloco>
        <Bloco titulo="Contagem por tabela">
          <Button title="Atualizar contagens" onPress={carregar} />
          {contagens.map((item) => (
            <Text key={item.nome} style={[styles.texto, { marginTop: 4 }]}>{item.nome}: {item.total}</Text>
          ))}
        </Bloco>
        <Bloco titulo="Apagar dados para começar de novo" texto="Útil para estudar INSERT e CREATE TABLE com um banco vazio. A operação remove os registros, mas mantém as tabelas.">
          <Button title="EXCLUIR TODOS OS REGISTROS" color={cores.perigo} onPress={limpar} />
        </Bloco>
        <Bloco titulo="Conceitos extras" texto="A transação agrupa várias operações: ou todas são aplicadas, ou a operação é revertida quando dá erro. SQLite é local, não precisa de servidor ou conta." />
      </ScrollView>
    </SafeAreaView>
  );
}
