import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

const categorias = ["Alimentação", "Transporte", "Estudo", "Outros"];
function listar() { return db.getAllSync("SELECT * FROM despesas ORDER BY id DESC"); }
function salvar(descricao, categoria, valor) {
  db.runSync("INSERT INTO despesas (descricao, categoria, valor) VALUES (?, ?, ?)", [descricao, categoria, valor]);
}
function edita(descricao, categoria, valor, id) {
  db.runSync("UPDATE despesas SET descricao = ?, categoria = ?, valor = ? WHERE id = ?", [descricao, categoria, valor, id]);
}
function excluir(id) { db.runSync("DELETE FROM despesas WHERE id = ?", [id]); }
export default function Despesas() {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Alimentação");
  const [valor, setValor] = useState("");
  const [idEditando, setIdEditando] = useState(0);
  const [lista, setLista] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  function carregar() { setLista(listar()); }
  useEffect(() => { carregar(); }, []);
  function limpar() {
    setDescricao(""); setCategoria("Alimentação"); setValor(""); setIdEditando(0);
  }
  function guardarOuEditar() {
    const numero = Number(valor.trim().replace(",", "."));
    if (!descricao.trim() || !valor.trim() || !Number.isFinite(numero) || numero <= 0) {
      Alert.alert("Atenção", "Informe uma descrição e um valor maior que zero.");
      return;
    }
    const arredondado = Math.round(numero * 100) / 100;
    if (idEditando === 0) salvar(descricao.trim(), categoria, arredondado);
    else edita(descricao.trim(), categoria, arredondado, idEditando);
    limpar(); carregar();
  }
  function editar(item) {
    setDescricao(item.descricao); setCategoria(item.categoria);
    setValor(String(item.valor)); setIdEditando(item.id);
  }
  function remover(id) {
    Alert.alert("Excluir despesa", "Confirma a exclusão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id); if (idEditando === id) limpar(); carregar();
      }},
    ]);
  }
  const filtrados = lista.filter((item) => filtro === "Todas" || item.categoria === filtro);
  const total = filtrados.reduce((soma, item) => soma + item.valor, 0);
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Controle de despesas" }} />
      <Text style={styles.titulo}>Despesas</Text>
      <Text style={styles.descricao}>CRUD com REAL, filtro por categoria e soma dos registros. Digite 12,50 ou 12.50.</Text>
      <TextInput style={styles.campo} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.campo} placeholder="Valor em reais" keyboardType="decimal-pad" value={valor} onChangeText={setValor} />
      <Text style={styles.rotulo}>Categoria: {categoria}</Text>
      <View style={[styles.botoes, { marginBottom: 12 }]}>
        {categorias.map((opcao) => (
          <Button key={opcao} title={opcao === categoria ? "✓ " + opcao : opcao} onPress={() => setCategoria(opcao)} />
        ))}
      </View>
      <Button title={idEditando ? "Salvar alterações" : "Adicionar despesa"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <Text style={[styles.rotulo, { marginTop: 12 }]}>Filtrar:</Text>
      <View style={[styles.botoes, { marginBottom: 10 }]}>
        {["Todas", ...categorias].map((opcao) => (
          <Button key={opcao} title={opcao === filtro ? "✓ " + opcao : opcao} onPress={() => setFiltro(opcao)} />
        ))}
      </View>
      <Text style={styles.contador}>{filtrados.length} despesa(s) | Total: R$ {total.toFixed(2).replace(".", ",")}</Text>
      <FlatList
        data={filtrados} keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma despesa.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.descricao}</Text>
            <Text style={styles.itemDetalhe}>{item.categoria} • R$ {item.valor.toFixed(2).replace(".", ",")}</Text>
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
