import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listar() {
  return db.getAllSync("SELECT * FROM compras ORDER BY comprado ASC, id DESC");
}
function salvar(produto, quantidade) {
  db.runSync("INSERT INTO compras (produto, quantidade) VALUES (?, ?)", [produto, quantidade]);
}
function edita(produto, quantidade, id) {
  db.runSync("UPDATE compras SET produto = ?, quantidade = ? WHERE id = ?", [produto, quantidade, id]);
}
function excluir(id) { db.runSync("DELETE FROM compras WHERE id = ?", [id]); }
function alternar(id, comprado) {
  db.runSync("UPDATE compras SET comprado = ? WHERE id = ?", [comprado === 1 ? 0 : 1, id]);
}

export default function Compras() {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);
  function carregar() { setLista(listar()); }
  useEffect(() => { carregar(); }, []);
  function limpar() { setProduto(""); setQuantidade(""); setIdEditando(0); }
  function guardarOuEditar() {
    const numero = Number(quantidade);
    if (!produto.trim() || !quantidade.trim() || !Number.isSafeInteger(numero) || numero < 1) {
      Alert.alert("Atenção", "Digite um produto e uma quantidade inteira positiva.");
      return;
    }
    if (idEditando === 0) salvar(produto.trim(), numero);
    else edita(produto.trim(), numero, idEditando);
    limpar(); carregar();
  }
  function editar(item) {
    setProduto(item.produto);
    setQuantidade(String(item.quantidade));
    setIdEditando(item.id);
  }
  function remover(id) {
    Alert.alert("Excluir produto", "Excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id); if (idEditando === id) limpar(); carregar();
      }},
    ]);
  }
  function removerComprados() {
    Alert.alert("Limpar lista", "Excluir todos os produtos marcados como comprados?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        db.runSync("DELETE FROM compras WHERE comprado = 1");
        limpar(); carregar();
      }},
    ]);
  }
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Lista de compras" }} />
      <Text style={styles.titulo}>Compras com SQLite</Text>
      <Text style={styles.descricao}>Marque itens, edite quantidades e use uma condição SQL para excluir apenas os comprados.</Text>
      <TextInput style={styles.campo} value={produto} onChangeText={setProduto} placeholder="Produto" />
      <TextInput style={styles.campo} value={quantidade} onChangeText={setQuantidade} placeholder="Quantidade" keyboardType="number-pad" />
      <Button title={idEditando ? "Salvar alterações" : "Adicionar à lista"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <View style={[styles.botoes, { marginVertical: 10 }]}>
        <Button title="Excluir comprados" color={cores.perigo} onPress={removerComprados} />
      </View>
      <Text style={styles.contador}>
        {lista.length} produtos | {lista.filter((item) => item.comprado === 1).length} comprados | {lista.reduce((soma, item) => soma + item.quantidade, 0)} unidades
      </Text>
      <FlatList
        data={lista} keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Lista vazia.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Pressable onPress={() => { alternar(item.id, item.comprado); carregar(); }}
              accessibilityRole="checkbox" accessibilityState={{ checked: item.comprado === 1 }}>
              <Text style={[styles.itemTitulo, item.comprado === 1 && { textDecorationLine: "line-through" }]}>
                {item.comprado === 1 ? "☑" : "☐"}  {item.produto}
              </Text>
            </Pressable>
            <Text style={styles.itemDetalhe}>Quantidade: {item.quantidade}</Text>
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
