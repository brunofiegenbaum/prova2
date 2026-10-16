import { Stack, Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

// Leituras opcionais enviadas pelo aluno. Links podem mudar com o tempo.
const leituras = [
  { titulo: "Linux na Holanda", resumo: "Soberania digital, sistemas operacionais e dependência tecnológica.", url: "https://tecnoblog.net/noticias/linux-entra-nos-planos-da-holanda-para-substituir-o-windows/" },
  { titulo: "Claude Opus 5.5", resumo: "Modelos de IA, programação e documentação de fornecedores.", url: "https://platform.claude.com/docs/pt-BR/models/opus-5-5/overview" },
  { titulo: "GPT-6.1 Sol", resumo: "Custos e desempenho de modelos de IA em tarefas técnicas.", url: "https://thenextweb.com/news/openai-gpt-6-1-sol-price-astra-devday" },
  { titulo: "IA e demonstração matemática", resumo: "Uso de IA em pesquisa científica e a importância da verificação de resultados.", url: "https://g1.globo.com/tecnologia/noticia/2026/09/09/openai-diz-que-resolveu-em-88-horas-problema-matematico-em-aberto-ha-cerca-de-90-anos.ghtml" },
  { titulo: "Uso indevido de IA", resumo: "Segurança, ética e os riscos do uso de modelos em atividades prejudiciais.", url: "https://g1.globo.com/mundo/noticia/2026/09/10/anthropic-diz-ter-identificado-paises-que-usaram-sua-ia-para-fazer-propaganda-e-desenvolver-possiveis-armas-biologicas-diz-nyt.ghtml" },
  { titulo: "Pesquisador critica risco das IAs", resumo: "Debate sobre desenvolvimento responsável e segurança de modelos de linguagem.", url: "https://forbes.com.br/forbes-tech/2026/09/ex-pesquisador-da-openai-e-da-anthropic-diz-que-empresas-brincam-com-vidas/" },
  { titulo: "iPhone dobrável", resumo: "Novos formatos de tela, adaptação das interfaces e responsividade.", url: "https://tecnoblog.net/noticias/iphone-duo-o-primeiro-celular-dobravel-da-apple-e-anunciado-nos-eua/" },
];
export default function Atualidades() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Leituras de tecnologia" }} />
      <ScrollView>
        <Text style={styles.titulo}>Atualidades em tecnologia</Text>
        <Text style={styles.descricao}>Leituras indicadas na conversa para contextualização. Abra a matéria para conferir as informações originais e eventuais atualizações.</Text>
        {leituras.map((item, indice) => (
          <Bloco key={indice} titulo={item.titulo}>
            <Text style={styles.texto}>{item.resumo}</Text>
            <Link href={item.url} style={{ color: "#2758c8", marginTop: 8 }}>Ler a matéria original →</Link>
          </Bloco>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
