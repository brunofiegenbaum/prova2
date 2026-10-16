import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Button, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Bloco from "../componentes/Bloco";
import { styles } from "../estilos/padrao";

export default function Hooks() {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [vezes, setVezes] = useState(0);
  const [evento, setEvento] = useState("Ainda não alterou o contador.");

  // [] executa na montagem. Com [contador], executa ao montar e quando o contador muda.
  useEffect(() => {
    setEvento("O contador mudou para " + contador + ".");
    setVezes((anterior) => anterior + 1);
  }, [contador]);

  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Hooks e estados" }} />
      <ScrollView>
        <Text style={styles.titulo}>Tela viva</Text>
        <Text style={styles.descricao}>Uma variável comum não redesenha o React. useState guarda o valor e seu setter atualiza a tela. useEffect executa efeitos depois do render.</Text>
        <Bloco titulo="useState()">
          <Text style={styles.texto}>Contador: {contador}</Text>
          <View style={styles.botoes}>
            <Button title="+1" onPress={() => setContador(contador + 1)} />
            <Button title="-1" onPress={() => setContador(contador - 1)} />
            <Button title="Zerar" onPress={() => setContador(0)} />
          </View>
        </Bloco>
        <Bloco titulo="TextInput controlado" texto="O value recebe o estado. O onChangeText altera esse estado.">
          <TextInput style={styles.campo} placeholder="Digite seu nome" value={nome} onChangeText={setNome} />
          <Text style={styles.texto}>Olá, {nome.trim() !== "" ? nome : "estudante"}!</Text>
        </Bloco>
        <Bloco titulo="useEffect com dependência">
          <Text style={styles.texto}>{evento}</Text>
          <Text style={styles.auxiliar}>Efeito executado {vezes} vez(es) nesta montagem.</Text>
          <Text style={styles.auxiliar}>Quando só o nome muda, este efeito não roda novamente.</Text>
        </Bloco>
        <Bloco titulo="Condição e Switch">
          <View style={styles.linha}>
            <Text style={styles.texto}>Mostrar explicação</Text>
            <Switch value={mostrar} onValueChange={setMostrar} />
          </View>
          {mostrar ? <Text style={styles.texto}>Com condição ? A : B, escolhemos o que mostrar no JSX.</Text> : null}
        </Bloco>
        <Bloco titulo="Regras dos hooks" texto="Chame hooks no início do componente, nunca dentro de if, for ou depois de um return condicional. Não use onPress={minhaFuncao()}, porque executaria no render." />
      </ScrollView>
    </SafeAreaView>
  );
}
