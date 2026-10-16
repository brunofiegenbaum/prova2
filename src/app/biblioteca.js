import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listar() { return db.getAllSync("SELECT * FROM livros ORDER BY id DESC"); }
function salvar(titulo, autor, paginas) {
  db.runSync("INSERT INTO livros (titulo, autor, paginas) VALUES (?, ?, ?)", [titulo, autor, paginas]);
}
function edita(titulo, autor, paginas, id) {
  db.runSync("UPDATE livros SET titulo = ?, autor = ?, paginas = ? WHERE id = ?", [titulo, autor, paginas, id]);
}
function excluir(id) { db.runSync("DELETE FROM livros WHERE id = ?", [id]); }
function alternarLeitura(id, lido) {
  db.runSync("UPDATE livros SET lido = ? WHERE id = ?", [lido === 1 ? 0 : 1, id]);
}
export default function Biblioteca() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [paginas, setPaginas] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);
  const [pesquisa, setPesquisa] = useState("");
  const [soPendentes, setSoPendentes] = useState(false);
  function carregar() { setLista(listar()); }
  useEffect(() => { carregar(); }, []);
  function limpar() {
    setTitulo(""); setAutor(""); setPaginas(""); setIdEditando(0);
  }
  function guardarOuEditar() {
    const numero = Number(paginas);
    if (!titulo.trim() || !autor.trim() || !paginas.trim() ||
        !Number.isSafeInteger(numero) || numero <= 0) {
      Alert.alert("Atenção", "Preencha título, autor e páginas (inteiro maior que zero).");
      return;
    }
    if (idEditando === 0) salvar(titulo.trim(), autor.trim(), numero);
    else edita(titulo.trim(), autor.trim(), numero, idEditando);
    limpar(); carregar();
  }
  function editar(item) {
    setIdEditando(item.id); setTitulo(item.titulo);
    setAutor(item.autor); setPaginas(String(item.paginas));
  }
  function remover(id) {
    Alert.alert("Excluir livro", "Confirma a exclusão?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id); if (idEditando === id) limpar(); carregar();
      }},
    ]);
  }
  const filtrados = lista.filter((item) =>
    (!soPendentes || item.lido === 0) &&
    (item.titulo + " " + item.autor).toLowerCase().includes(pesquisa.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Biblioteca SQLite" }} />
      <Text style={styles.titulo}>Biblioteca</Text>
      <Text style={styles.descricao}>Campos controlados, validação de números, pesquisa e marcação de lido.</Text>
      <TextInput style={styles.campo} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.campo} placeholder="Autor" value={autor} onChangeText={setAutor} />
      <TextInput style={styles.campo} placeholder="Páginas" keyboardType="number-pad" value={paginas} onChangeText={setPaginas} />
      <Button title={idEditando ? "Salvar alterações" : "Cadastrar livro"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <TextInput style={[styles.campo, { marginTop: 12 }]} placeholder="Pesquisar título ou autor" value={pesquisa} onChangeText={setPesquisa} />
      <Pressable style={[styles.cartao, { padding: 9 }]} onPress={() => setSoPendentes(!soPendentes)} accessibilityRole="checkbox" accessibilityState={{ checked: soPendentes }}>
        <Text style={styles.texto}>{soPendentes ? "☑" : "☐"}  Mostrar apenas não lidos</Text>
      </Pressable>
      <Text style={styles.contador}>{lista.length} livro(s) • {lista.filter((item) => item.lido === 1).length} lido(s)</Text>
      <FlatList
        data={filtrados} keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum livro encontrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemDetalhe}>{item.autor} • {item.paginas} páginas</Text>
            <Pressable onPress={() => { alternarLeitura(item.id, item.lido); carregar(); }} accessibilityRole="checkbox" accessibilityState={{ checked: item.lido === 1 }}>
              <Text style={[styles.texto, { color: cores.azul, marginTop: 8 }]}>{item.lido === 1 ? "☑ Lido" : "☐ Não lido"} (toque para mudar)</Text>
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
