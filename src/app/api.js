import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";

export default function Api() {
  const [usuarios, setUsuarios] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!resposta.ok) throw new Error("HTTP " + resposta.status);
      const registros = await resposta.json();
      setUsuarios(registros);
    } catch (e) {
      setErro("Não foi possível consultar a API. Verifique a conexão com a internet. " + e.message);
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => { carregar(); }, []);
  const filtrados = usuarios.filter((item) =>
    (item.name + " " + item.email).toLowerCase().includes(pesquisa.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Consumo de API" }} />
      <Text style={styles.titulo}>API com fetch()</Text>
      <Text style={styles.descricao}>Exemplo de GET com await, conversão JSON, indicador de carregamento e tratamento de erro. Requer internet.</Text>
      <Button title="Consultar novamente" onPress={carregar} />
      <TextInput style={[styles.campo, { marginTop: 10 }]} placeholder="Pesquisar nome ou e-mail" value={pesquisa} onChangeText={setPesquisa} />
      {carregando && <ActivityIndicator size="large" accessibilityLabel="Carregando usuários" />}
      {erro !== "" && <Text style={{ color: "#b4232c" }}>{erro}</Text>}
      <FlatList data={filtrados} keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={!carregando && !erro ? <Text style={styles.vazio}>Nenhum usuário encontrado.</Text> : null}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitulo}>{item.name}</Text>
            <Text style={styles.itemDetalhe}>{item.email}</Text>
            <Text style={styles.itemDetalhe}>Cidade: {item.address.city}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
