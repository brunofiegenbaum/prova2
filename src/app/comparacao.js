import { Stack } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

export default function Comparacao() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Flutter e React Native" }} />
      <ScrollView>
        <Text style={styles.titulo}>Flutter x React Native</Text>
        <Text style={styles.descricao}>Comparação de tecnologias, importante para reconhecer diferenças técnicas.</Text>
        <Bloco titulo="React Native" texto="Framework para criar apps usando JavaScript ou TypeScript e React. Trabalha com componentes como View, Text e FlatList e integra funcionalidades nativas do Android e iOS. Usa estilos em objetos JavaScript. Expo simplifica ferramentas e configuração." />
        <Bloco titulo="Pontos positivos do React Native" texto="Familiar para quem conhece JavaScript e React; grande ecossistema; pode aproveitar conceitos e lógica da web; Expo acelera o começo; usa componentes nativos." />
        <Bloco titulo="Pontos negativos do React Native" texto="Algumas APIs exigem bibliotecas externas ou código nativo. Versões de pacotes podem ter incompatibilidades. Em animações pesadas pode exigir maior atenção à otimização." />
        <Bloco titulo="Flutter" texto="Framework mantido pelo Google que usa a linguagem Dart. Constrói interfaces com widgets e desenha grande parte delas por seu próprio sistema gráfico, oferecendo controle visual consistente." />
        <Bloco titulo="Pontos positivos do Flutter" texto="Interface altamente personalizável, desempenho sólido para animações e consistência visual entre plataformas. Possui hot reload e boa integração com as ferramentas de desenvolvimento." />
        <Bloco titulo="Pontos negativos do Flutter" texto="Exige aprender Dart; aplicações podem ter tamanho inicial maior; algumas integrações específicas dependem de plugins ou código da plataforma." />
        <Bloco titulo="Qual estamos usando na disciplina?" texto="React Native com Expo e JavaScript, seguindo o repositório da turma. TextInput recebe dados, useState controla campos, FlatList mostra arrays e expo-sqlite persiste registros." />
      </ScrollView>
    </SafeAreaView>
  );
}
