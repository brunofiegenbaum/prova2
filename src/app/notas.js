import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, ScrollView, Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listarDisciplinas() {
  return db.getAllSync("SELECT * FROM disciplinas ORDER BY nome");
}
function listarAvaliacoes(disciplinaId) {
  return db.getAllSync(
    "SELECT a.id, a.descricao, a.nota, d.nome AS disciplina " +
    "FROM avaliacoes a JOIN disciplinas d ON d.id = a.disciplina_id " +
    "WHERE a.disciplina_id = ? ORDER BY a.id DESC",
    [disciplinaId]
  );
}
function criarDisciplina(nome) {
  db.runSync("INSERT INTO disciplinas (nome) VALUES (?)", [nome]);
}
function excluirDisciplina(id) {
  db.runSync("DELETE FROM disciplinas WHERE id = ?", [id]);
}
function criarNota(disciplinaId, descricao, nota) {
  db.runSync("INSERT INTO avaliacoes (disciplina_id, descricao, nota) VALUES (?, ?, ?)", [disciplinaId, descricao, nota]);
}
function editarNota(id, descricao, nota) {
  db.runSync("UPDATE avaliacoes SET descricao = ?, nota = ? WHERE id = ?", [descricao, nota, id]);
}
function excluirNota(id) {
  db.runSync("DELETE FROM avaliacoes WHERE id = ?", [id]);
}

export default function Notas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(0);
  const [nomeDisciplina, setNomeDisciplina] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nota, setNota] = useState("");
  const [idEditando, setIdEditando] = useState(0);

  function carregar(id) {
    setDisciplinas(listarDisciplinas());
    setAvaliacoes(id ? listarAvaliacoes(id) : []);
  }
  useEffect(() => { carregar(0); }, []);

  function selecionar(id) {
    setDisciplinaSelecionada(id);
    limparNota();
    carregar(id);
  }
  function salvarDisciplina() {
    const nome = nomeDisciplina.trim();
    if (nome === "") { Alert.alert("Atenção", "Digite o nome da disciplina."); return; }
    const repetida = db.getFirstSync("SELECT id FROM disciplinas WHERE LOWER(nome) = LOWER(?)", [nome]);
    if (repetida) { Alert.alert("Atenção", "Essa disciplina já existe."); return; }
    criarDisciplina(nome);
    setNomeDisciplina("");
    carregar(disciplinaSelecionada);
  }
  function removerDisciplina(id) {
    Alert.alert("Excluir disciplina", "As notas desta disciplina também serão excluídas. Continuar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluirDisciplina(id);
        const selecionada = disciplinaSelecionada === id ? 0 : disciplinaSelecionada;
        setDisciplinaSelecionada(selecionada);
        limparNota();
        carregar(selecionada);
      }},
    ]);
  }
  function limparNota() {
    setDescricao(""); setNota(""); setIdEditando(0);
  }
  function guardarNota() {
    const valor = Number(nota.trim().replace(",", "."));
    if (!disciplinaSelecionada || !descricao.trim() || !nota.trim() ||
        !Number.isFinite(valor) || valor < 0 || valor > 10) {
      Alert.alert("Atenção", "Selecione a disciplina e informe descrição e nota de 0 a 10.");
      return;
    }
    if (idEditando === 0) criarNota(disciplinaSelecionada, descricao.trim(), valor);
    else editarNota(idEditando, descricao.trim(), valor);
    limparNota();
    carregar(disciplinaSelecionada);
  }
  function editar(item) {
    setIdEditando(item.id); setDescricao(item.descricao); setNota(String(item.nota));
  }
  function removerNota(id) {
    Alert.alert("Excluir nota", "Excluir esta avaliação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluirNota(id);
        if (idEditando === id) limparNota();
        carregar(disciplinaSelecionada);
      }},
    ]);
  }
  const media = avaliacoes.length ?
    avaliacoes.reduce((soma, item) => soma + item.nota, 0) / avaliacoes.length : 0;

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Disciplinas e notas" }} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Relacionamento 1 para N</Text>
        <Text style={styles.descricao}>Uma disciplina pode ter várias avaliações. A chave estrangeira disciplina_id liga as tabelas. JOIN combina informações.</Text>
        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>Nova disciplina</Text>
          <TextInput style={styles.campo} placeholder="Ex.: Programação Mobile" value={nomeDisciplina} onChangeText={setNomeDisciplina} />
          <Button title="Criar disciplina" onPress={salvarDisciplina} />
        </View>
        <Text style={styles.rotulo}>Selecione a disciplina:</Text>
        {disciplinas.length === 0 && <Text style={styles.auxiliar}>Cadastre uma disciplina primeiro.</Text>}
        {disciplinas.map((item) => (
          <View key={item.id} style={[styles.item, styles.linha]}>
            <Pressable style={{ flex: 1 }} onPress={() => selecionar(item.id)} accessibilityRole="radio" accessibilityState={{ selected: disciplinaSelecionada === item.id }}>
              <Text style={[styles.itemTitulo, disciplinaSelecionada === item.id && { color: cores.azul }]}>
                {disciplinaSelecionada === item.id ? "◉" : "○"} {item.nome}
              </Text>
            </Pressable>
            <Button title="Excluir" color={cores.perigo} onPress={() => removerDisciplina(item.id)} />
          </View>
        ))}
        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>{idEditando ? "Editar avaliação" : "Cadastrar avaliação"}</Text>
          <TextInput style={styles.campo} placeholder="Descrição (Prova, trabalho...)" value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.campo} placeholder="Nota de 0 a 10" keyboardType="decimal-pad" value={nota} onChangeText={setNota} />
          <Button title={idEditando ? "Salvar alterações" : "Adicionar avaliação"} onPress={guardarNota} />
          {idEditando !== 0 && <Button title="Cancelar edição" onPress={limparNota} />}
        </View>
        <Text style={styles.contador}>Avaliações: {avaliacoes.length} | Média da disciplina: {media.toFixed(2)}</Text>
        {avaliacoes.length === 0 && <Text style={styles.vazio}>Selecione a disciplina para ver notas.</Text>}
        {avaliacoes.map((item) => (
          <View style={styles.item} key={item.id}>
            <Text style={styles.itemTitulo}>{item.descricao}</Text>
            <Text style={styles.itemDetalhe}>{item.disciplina}: {item.nota.toFixed(1)}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" color={cores.perigo} onPress={() => removerNota(item.id)} />
            </View>
          </View>
        ))}
        <Text style={[styles.auxiliar, { marginBottom: 30 }]}>Dica: ao excluir uma disciplina, ON DELETE CASCADE exclui suas avaliações (com foreign_keys ativado).</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
