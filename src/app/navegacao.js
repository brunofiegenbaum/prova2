import { Stack, Link, router } from "expo-router";
import { ScrollView, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bloco from "../componentes/Bloco";
import { styles } from "../estilos/padrao";

export default function Navegacao() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Navegação" }} />
      <ScrollView>
        <Text style={styles.titulo}>Expo Router</Text>
        <Text style={styles.descricao}>O nome do arquivo em src/app vira o caminho da tela. index.js é a rota inicial (/). _layout.js envolve as telas com Stack.</Text>
        <Bloco titulo="Link declarativo" texto="Uma tela pode abrir outra com Link href.">
          <Link href="/alunos" style={{ color: "#2758c8", fontWeight: "bold", paddingVertical: 8 }}>Abrir cadastro de alunos →</Link>
        </Bloco>
        <Bloco titulo="Navegação por código" texto="router.push abre uma nova tela. router.back volta para a anterior.">
          <Button title="Abrir biblioteca" onPress={() => router.push("/biblioteca")} />
        </Bloco>
        <Bloco titulo="Área segura" texto="O SafeAreaProvider fica no layout principal. Com cabeçalho, SafeAreaView edges={[bottom]} protege a parte inferior e evita espaço duplicado no topo." />
        <Bloco titulo="Stack.Screen" texto="Muda o título desta tela sem alterar as demais: options com title." />
        <Bloco titulo="Erros comuns" texto="Unmatched Route acontece se o arquivo da rota não existe. Missing default export acontece quando não há export default no componente da tela." />
      </ScrollView>
    </SafeAreaView>
  );
}
