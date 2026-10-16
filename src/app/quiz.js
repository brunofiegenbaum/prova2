import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Button, ScrollView, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../dados/banco";
import { perguntas } from "../dados/perguntas";
import { cores, styles } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

export default function Quiz() {
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState(-1);
  const [acertos, setAcertos] = useState(0);
  const [terminou, setTerminou] = useState(false);
  const [historico, setHistorico] = useState([]);

  function carregarHistorico() {
    setHistorico(db.getAllSync("SELECT * FROM resultados ORDER BY id DESC LIMIT 10"));
  }
  useEffect(() => { carregarHistorico(); }, []);

  function responder(numero) {
    if (selecionada !== -1 || terminou) return;
    setSelecionada(numero);
    if (numero === perguntas[indice].certa) setAcertos(acertos + 1);
  }
  function avancar() {
    if (selecionada === -1 || terminou) return;
    if (indice === perguntas.length - 1) {
      db.runSync(
        "INSERT INTO resultados (acertos, total, data) VALUES (?, ?, ?)",
        [acertos, perguntas.length, new Date().toLocaleString("pt-BR")]
      );
      setTerminou(true);
      carregarHistorico();
    } else {
      setIndice(indice + 1);
      setSelecionada(-1);
    }
  }
  function recomecar() {
    setIndice(0); setSelecionada(-1); setAcertos(0); setTerminou(false);
  }
  const pergunta = perguntas[indice];
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Simulado" }} />
      <ScrollView>
        <Text style={styles.titulo}>Simulado de Programação Mobile</Text>
        <Text style={styles.descricao}>Questões de revisão (não oficiais). O resultado fica salvo no SQLite.</Text>
        {terminou ? (
          <Bloco titulo="Simulado concluído">
            <Text style={[styles.titulo, { textAlign: "center", color: cores.azul }]}>{acertos} / {perguntas.length}</Text>
            <Text style={styles.texto}>Aproveitamento: {Math.round(acertos * 100 / perguntas.length)}%</Text>
            <Button title="Tentar novamente" onPress={recomecar} />
          </Bloco>
        ) : (
          <Bloco titulo={"Questão " + (indice + 1) + " de " + perguntas.length}>
            <Text style={[styles.texto, { fontWeight: "bold", marginVertical: 12 }]}>{pergunta.texto}</Text>
            {pergunta.opcoes.map((opcao, numero) => (
              <Pressable
                key={numero}
                onPress={() => responder(numero)}
                accessibilityRole="button"
                accessibilityState={{ disabled: selecionada !== -1 }}
                style={[styles.item, { marginVertical: 4 },
                  selecionada !== -1 && numero === pergunta.certa && { borderColor: cores.verde, borderWidth: 2 },
                  selecionada === numero && numero !== pergunta.certa && { borderColor: cores.perigo, borderWidth: 2 },
                ]}
              >
                <Text style={styles.texto}>{String.fromCharCode(65 + numero)}. {opcao}</Text>
              </Pressable>
            ))}
            {selecionada !== -1 && (
              <View>
                <Text style={[styles.texto, { fontWeight: "bold", color: selecionada === pergunta.certa ? cores.verde : cores.perigo }]}>
                  {selecionada === pergunta.certa ? "Correto!" : "Incorreto."}
                </Text>
                <Text style={styles.descricao}>{pergunta.explicacao}</Text>
                <Button title={indice === perguntas.length - 1 ? "Finalizar" : "Próxima questão"} onPress={avancar} />
              </View>
            )}
          </Bloco>
        )}
        <Bloco titulo="Últimas tentativas salvas">
          {historico.length === 0 && <Text style={styles.auxiliar}>Nenhum simulado finalizado.</Text>}
          {historico.map((item) => (
            <Text key={item.id} style={styles.texto}>{item.data} — {item.acertos}/{item.total}</Text>
          ))}
        </Bloco>
      </ScrollView>
    </SafeAreaView>
  );
}
