import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listar() {
  return db.getAllSync("SELECT * FROM tarefas ORDER BY id DESC");
}
function adicionar(texto) {
  db.runSync("INSERT INTO tarefas (texto) VALUES (?)", [texto]);
}
function excluir(id) {
  db.runSync("DELETE FROM tarefas WHERE id = ?", [id]);
}
function edita(texto, id) {
  db.runSync("UPDATE tarefas SET texto = ? WHERE id = ?", [texto, id]);
}
function alternar(id, feita) {
  db.runSync("UPDATE tarefas SET feita = ? WHERE id = ?", [feita ? 0 : 1, id]);
}

export default function TarefasDb() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);
  const [filtro, setFiltro] = useState("todas");
  const [pesquisa, setPesquisa] = useState("");

  function carregar() {
    setLista(listar());
  }
  useEffect(() => { carregar(); }, []);

  function limpar() {
    setTexto("");
    setIdEditando(0);
  }
  function guardarOuEditar() {
    if (texto.trim() === "") {
      Alert.alert("Atenção", "Digite a tarefa.");
      return;
    }
    if (idEditando === 0) {
      adicionar(texto.trim());
    } else {
      edita(texto.trim(), idEditando);
    }
    limpar();
    carregar();
  }
  function editar(item) {
    setTexto(item.texto);
    setIdEditando(item.id);
  }
  function remover(id) {
    Alert.alert("Excluir", "Deseja excluir esta tarefa?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id);
        if (idEditando === id) limpar();
        carregar();
      }},
    ]);
  }
  function marcar(item) {
    alternar(item.id, item.feita === 1);
    carregar();
  }
  const filtradas = lista.filter((item) => {
    const status = filtro === "todas" || (filtro === "feitas" ? item.feita === 1 : item.feita === 0);
    return status && item.texto.toLowerCase().includes(pesquisa.toLowerCase());
  });
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Tarefas no SQLite" }} />
      <Text style={styles.titulo}>Tarefas persistentes</Text>
      <Text style={styles.descricao}>Fechar o app não apaga as tarefas. É o banco que armazena; carregar() atualiza o estado após o SQL.</Text>
      <TextInput style={styles.campo} value={texto} onChangeText={setTexto} placeholder="Descrição da tarefa" accessibilityLabel="Descrição da tarefa" />
      <Button title={idEditando ? "Salvar alterações" : "Adicionar tarefa"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <TextInput style={[styles.campo, { marginTop: 12 }]} value={pesquisa} onChangeText={setPesquisa} placeholder="Pesquisar na lista" />
      <View style={styles.botoes}>
        {["todas", "pendentes", "feitas"].map((opcao) => (
          <Button key={opcao} title={opcao === filtro ? "[" + opcao + "]" : opcao} onPress={() => setFiltro(opcao)} />
        ))}
      </View>
      <Text style={[styles.contador, { marginTop: 12 }]}>Total: {lista.length} | Feitas: {lista.filter((item) => item.feita === 1).length}</Text>
      <FlatList
        data={filtradas}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa encontrada.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable onPress={() => marcar(item)} accessibilityRole="checkbox" accessibilityState={{ checked: item.feita === 1 }}>
              <Text style={[styles.itemTitulo, item.feita === 1 && { textDecorationLine: "line-through", color: cores.subtitulo }]}>
                {item.feita === 1 ? "☑" : "☐"}  {item.texto}
              </Text>
            </Pressable>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" color={cores.perigo} onPress={() => remover(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
