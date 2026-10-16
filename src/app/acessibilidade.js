import { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Button, Text, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, cores } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

export default function Acessibilidade() {
  const [fonteGrande, setFonteGrande] = useState(false);
  const [altoContraste, setAltoContraste] = useState(false);
  const [mensagem, setMensagem] = useState("Toque no botão de exemplo.");
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Acessibilidade" }} />
      <ScrollView>
        <Text style={styles.titulo}>App para todo mundo</Text>
        <Text style={styles.descricao}>Acessibilidade melhora a navegação por leitores de tela, a legibilidade e a área de toque.</Text>
        <Bloco titulo="Configurações demonstrativas">
          <View style={[styles.linha, { justifyContent: "space-between", marginVertical: 8 }]}>
            <Text style={styles.texto}>Fonte maior</Text>
            <Switch value={fonteGrande} onValueChange={setFonteGrande} accessibilityLabel="Ativar fonte maior" />
          </View>
          <View style={[styles.linha, { justifyContent: "space-between", marginVertical: 8 }]}>
            <Text style={styles.texto}>Alto contraste</Text>
            <Switch value={altoContraste} onValueChange={setAltoContraste} accessibilityLabel="Ativar alto contraste" />
          </View>
        </Bloco>
        <View style={[styles.cartao, altoContraste && { backgroundColor: "#101010" }]}>
          <Text style={{ fontSize: fonteGrande ? 24 : 16, lineHeight: fonteGrande ? 35 : 25, color: altoContraste ? "#ffffff" : cores.texto }}>
            Exemplo de texto acessível. O tamanho e o contraste mudam conforme as opções.
          </Text>
        </View>
        <Bloco titulo="Botão com acessibilidade">
          <Button title="Ouvir uma mensagem de exemplo"
            onPress={() => setMensagem("Botão ativado com sucesso!")}
            accessibilityRole="button"
            accessibilityLabel="Exibir mensagem"
            accessibilityHint="Exibe uma mensagem na tela" />
          <Text accessibilityLiveRegion="polite" style={[styles.texto, { marginTop: 12 }]}>{mensagem}</Text>
        </Bloco>
        <Bloco titulo="Propriedades úteis" texto="accessibilityLabel descreve; accessibilityRole informa o papel do elemento; accessibilityHint explica a consequência da ação; accessibilityState informa marcado/desabilitado/selecionado." />
        <Bloco titulo="Outros cuidados" texto="Não depender somente de cor. Usar textos legíveis, botões com área adequada, etiquetas nos campos e contraste suficiente. Testar TalkBack no Android e VoiceOver no iPhone." />
      </ScrollView>
    </SafeAreaView>
  );
}
