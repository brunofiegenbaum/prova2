import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Alert, Button, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { cores, styles } from "../estilos/padrao";

function listar() {
  return db.getAllSync("SELECT * FROM alunos ORDER BY id DESC");
}
function salvar(nome, curso, idade) {
  db.runSync("INSERT INTO alunos (nome, curso, idade) VALUES (?, ?, ?)", [nome, curso, idade]);
}
function edita(nome, curso, idade, id) {
  db.runSync("UPDATE alunos SET nome = ?, curso = ?, idade = ? WHERE id = ?", [nome, curso, idade, id]);
}
function excluir(id) {
  db.runSync("DELETE FROM alunos WHERE id = ?", [id]);
}
export default function Alunos() {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [idade, setIdade] = useState("");
  const [lista, setLista] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [idEditando, setIdEditando] = useState(0);
  function carregar() {
    setLista(listar());
  }
  useEffect(() => { carregar(); }, []);

  function limpar() {
    setNome(""); setCurso(""); setIdade(""); setIdEditando(0);
  }
  function guardarOuEditar() {
    const idadeNumero = Number(idade);
    if (nome.trim() === "" || curso.trim() === "" || idade.trim() === "" ||
        !Number.isInteger(idadeNumero) || idadeNumero < 1 || idadeNumero > 120) {
      Alert.alert("Atenção", "Informe nome, curso e uma idade inteira de 1 a 120.");
      return;
    }
    if (idEditando === 0) salvar(nome.trim(), curso.trim(), idadeNumero);
    else edita(nome.trim(), curso.trim(), idadeNumero, idEditando);
    limpar(); carregar();
  }
  function editar(item) {
    setIdEditando(item.id);
    setNome(item.nome);
    setCurso(item.curso);
    setIdade(String(item.idade));
  }
  function remover(id) {
    Alert.alert("Excluir aluno", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => {
        excluir(id);
        if (idEditando === id) limpar();
        carregar();
      }},
    ]);
  }
  const filtrados = lista.filter((item) =>
    (item.nome + " " + item.curso).toLowerCase().includes(pesquisa.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Cadastro de alunos" }} />
      <Text style={styles.titulo}>CRUD de alunos</Text>
      <Text style={styles.descricao}>CREATE, READ, UPDATE e DELETE. Validação, pesquisa e edição usando o id do registro.</Text>
      <TextInput style={styles.campo} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.campo} placeholder="Curso" value={curso} onChangeText={setCurso} />
      <TextInput style={styles.campo} placeholder="Idade" keyboardType="number-pad" value={idade} onChangeText={setIdade} />
      <Button title={idEditando ? "Salvar alterações" : "Cadastrar aluno"} onPress={guardarOuEditar} />
      {idEditando !== 0 && <Button title="Cancelar edição" onPress={limpar} />}
      <TextInput style={[styles.campo, { marginTop: 12 }]} placeholder="Filtrar por nome ou curso" value={pesquisa} onChangeText={setPesquisa} />
      <Text style={styles.contador}>Alunos cadastrados: {lista.length}</Text>
      <FlatList
        data={filtrados}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum aluno encontrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.nome}</Text>
            <Text style={styles.itemDetalhe}>{item.curso} • {item.idade} anos • ID {item.id}</Text>
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
