import { useState } from "react";
import { Stack } from "expo-router";
import { FlatList, Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";

export default function ListaMemoria() {
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);
  const [proximoId, setProximoId] = useState(1);

  function adicionar() {
    if (texto.trim() === "") return;
    setLista([{ id: proximoId, texto: texto.trim() }, ...lista]);
    setProximoId(proximoId + 1);
    setTexto("");
  }
  function remover(id) {
    setLista(lista.filter((item) => item.id !== id));
  }
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Lista sem banco" }} />
      <Text style={styles.titulo}>Lista na memória</Text>
      <Text style={styles.descricao}>Experimento: cadastre uma tarefa e reinicie completamente o aplicativo. Os dados podem desaparecer porque só estão no useState.</Text>
      <TextInput style={styles.campo} value={texto} onChangeText={setTexto} placeholder="Nova tarefa" />
      <Button title="Adicionar" onPress={adicionar} />
      <Text style={[styles.contador, { marginTop: 15 }]}>{lista.length} tarefa(s) nesta abertura</Text>
      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.item, styles.linha]}>
            <Text style={[styles.texto, { flex: 1 }]}>{item.texto}</Text>
            <Button title="Excluir" onPress={() => remover(item.id)} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
