import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listar() { return db.getAllSync("SELECT * FROM filmes ORDER BY id DESC"); }
function salvar(titulo, nota) {
  db.runSync("INSERT INTO filmes (titulo, nota) VALUES (?, ?)", [titulo, nota]);
}
function edita(titulo, nota, id) {
  db.runSync("UPDATE filmes SET titulo = ?, nota = ? WHERE id = ?", [titulo, nota, id]);
}
function excluir(id) { db.runSync("DELETE FROM filmes WHERE id = ?", [id]); }
function favoritar(item) {
  db.runSync("UPDATE filmes SET favorito = ? WHERE id = ?", [item.favorito === 1 ? 0 : 1, item.id]);
}
export default function Filmes() {
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [idEditando, setIdEditando] = useState(0);
  const [lista, setLista] = useState([]);
  const [ordem, setOrdem] = useState("novos");
  const [apenasFavoritos, setApenasFavoritos] = useState(false);
  function carregar() { setLista(listar()); }
  useEffect(() => { carregar(); }, []);
  function limpar() { setTitulo(""); setNota(""); setIdEditando(0); }
  function guardarOuEditar() {
    const numero = Number(nota.trim().replace(",", "."));
    if (!titulo.trim() || !nota.trim() || !Number.isFinite(numero) || numero < 0 || numero > 10) {
      Alert.alert("Atenção", "Informe um título e nota de 0 a 10. Ex.: 8,5.");
      return;
    }
    if (idEditando === 0) salvar(titulo.trim(), numero);
    else edita(titulo.trim(), numero, idEditando);
    limpar(); carregar();
  }
  function editar(item) {
    setTitulo(item.titulo); setNota(String(item.nota)); setIdEditando(item.id);
  }
  function remover(id) {
    Alert.alert("Excluir filme", "Excluir este filme?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id); if (idEditando === id) limpar(); carregar();
      }},
    ]);
  }
  let filtrados = lista.filter((item) => !apenasFavoritos || item.favorito === 1);
  if (ordem === "nota") filtrados = [...filtrados].sort((a, b) => b.nota - a.nota);
  const media = lista.length ? lista.reduce((soma, item) => soma + item.nota, 0) / lista.length : 0;
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Filmes e avaliações" }} />
      <Text style={styles.titulo}>Catálogo de filmes</Text>
      <Text style={styles.descricao}>Números decimais, média, favoritos e ordenação sem mudar os registros do banco.</Text>
      <TextInput style={styles.campo} placeholder="Título do filme" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.campo} placeholder="Nota de 0 a 10" keyboardType="decimal-pad" value={nota} onChangeText={setNota} />
      <Button title={idEditando ? "Salvar alterações" : "Adicionar filme"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <View style={[styles.botoes, { marginTop: 12 }]}>
        <Button title={ordem === "nota" ? "Ordenar: nota" : "Ordenar: recente"} onPress={() => setOrdem(ordem === "nota" ? "novos" : "nota")} />
        <Button title={apenasFavoritos ? "Ver todos" : "Só favoritos"} onPress={() => setApenasFavoritos(!apenasFavoritos)} />
      </View>
      <Text style={[styles.contador, { marginTop: 12 }]}>Total: {lista.length} | Média: {media.toFixed(1)} | Favoritos: {lista.filter((item) => item.favorito === 1).length}</Text>
      <FlatList
        data={filtrados} keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum filme encontrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemDetalhe}>Nota: {item.nota.toFixed(1)} / 10</Text>
            <Pressable onPress={() => { favoritar(item); carregar(); }} accessibilityRole="checkbox" accessibilityState={{ checked: item.favorito === 1 }}>
              <Text style={[styles.texto, { marginTop: 6, color: cores.azul }]}>{item.favorito === 1 ? "★ Favorito" : "☆ Favoritar"} (toque)</Text>
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
