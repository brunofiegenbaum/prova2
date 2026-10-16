import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bloco from "../componentes/Bloco";
import { styles } from "../estilos/padrao";

export default function Temporizador() {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);
  useEffect(() => {
    if (!rodando) return;
    const intervalo = setInterval(() => {
      setSegundos((anterior) => anterior + 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [rodando]);
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Temporizador e useEffect" }} />
      <Text style={styles.titulo}>Efeito com limpeza</Text>
      <Text style={styles.descricao}>O intervalo é criado quando rodando=true. A função de retorno do useEffect o remove ao pausar ou sair da tela.</Text>
      <Bloco titulo="Contador de segundos">
        <Text accessibilityLabel={segundos + " segundos"} style={{ fontSize: 54, fontWeight: "bold", color: "#2758c8", textAlign: "center", marginVertical: 10 }}>{segundos}s</Text>
        <View style={styles.botoes}>
          <Button title={rodando ? "Pausar" : "Iniciar"} onPress={() => setRodando(!rodando)} />
          <Button title="Zerar" onPress={() => { setRodando(false); setSegundos(0); }} />
        </View>
      </Bloco>
      <Bloco titulo="Por que a limpeza importa?" texto="Sem clearInterval, o cronômetro poderia continuar executando após a mudança de tela. Isso causa comportamentos incorretos e consumo desnecessário de recursos." />
    </SafeAreaView>
  );
}
