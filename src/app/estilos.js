import { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bloco from "../componentes/Bloco";
import { styles } from "../estilos/padrao";

export default function Estilos() {
  const [direcao, setDirecao] = useState("row");
  const [alinhamento, setAlinhamento] = useState("center");
  const [distribuicao, setDistribuicao] = useState("space-between");
  const [borda, setBorda] = useState(true);
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Flexbox e estilos" }} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Desenhe as caixas</Text>
        <Text style={styles.descricao}>
          flexDirection define o eixo principal. justifyContent atua no eixo principal,
          alignItems no eixo cruzado. Essas propriedades organizam os FILHOS da View.
        </Text>
        <Bloco titulo="Playground de Flexbox" texto="Experimente mudar os valores e observe onde ficam as caixas.">
          <View style={[s.palco, { flexDirection: direcao, justifyContent: distribuicao, alignItems: alinhamento, borderWidth: borda ? 2 : 0 }]}>
            <View style={[s.quadrado, { backgroundColor: "#f59e0b" }]}><Text>A</Text></View>
            <View style={[s.quadrado, { backgroundColor: "#8bbaf6" }]}><Text>B</Text></View>
            <View style={[s.quadrado, { backgroundColor: "#86efac" }]}><Text>C</Text></View>
          </View>
          <Text style={styles.rotulo}>flexDirection: {direcao}</Text>
          <Button title="Alternar row / column" onPress={() => setDirecao(direcao === "row" ? "column" : "row")} />
          <Text style={styles.rotulo}>justifyContent: {distribuicao}</Text>
          <Button title="Alternar space-between / center" onPress={() => setDistribuicao(distribuicao === "center" ? "space-between" : "center")} />
          <Text style={styles.rotulo}>alignItems: {alinhamento}</Text>
          <Button title="Alternar center / flex-start" onPress={() => setAlinhamento(alinhamento === "center" ? "flex-start" : "center")} />
          <Button title={borda ? "Ocultar borda de depuração" : "Mostrar borda"} onPress={() => setBorda(!borda)} />
        </Bloco>
        <Bloco titulo="flex: 1" texto="A View ocupa o espaço que sobra. Na tela principal, normalmente faz o conteúdo preencher a altura disponível." />
        <Bloco titulo="padding x margin" texto="padding é espaço para DENTRO da caixa. margin é espaço para FORA. borderRadius arredonda as bordas. gap separa filhos." />
        <Bloco titulo="StyleSheet.create()" texto="Os estilos são objetos JavaScript: backgroundColor, fontSize, borderWidth e flexDirection. Diferente do CSS web, as propriedades usam camelCase e tamanhos numéricos." />
        <Bloco titulo="Exercício" texto="Deixe A, B e C na vertical e centralizados. Depois coloque lado a lado e espalhados entre as pontas." />
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  palco: { height: 220, borderColor: "#de4e62", marginVertical: 12, borderRadius: 10, padding: 12 },
  quadrado: { width: 48, height: 48, borderRadius: 9, alignItems: "center", justifyContent: "center", margin: 3 },
});
