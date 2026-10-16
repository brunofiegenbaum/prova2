import { Stack, Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

export default function Sobre() {
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Sobre o laboratório" }} />
      <ScrollView>
        <Text style={styles.titulo}>Como estudar pelo app</Text>
        <Text style={styles.descricao}>Este é um projeto didático independente, inspirado nas aulas do Mateus Roveda. Não é material oficial de prova nem garante questões específicas.</Text>
        <Bloco titulo="1. Entenda os fundamentos" texto="Abra Flexbox e Hooks, altere valores e observe as telas. Depois leia o arquivo src/app correspondente e tente reproduzir o exemplo." />
        <Bloco titulo="2. Faça o CRUD básico" texto="Comece pela lista em memória e passe para tarefas-db.js. Compare useState com openDatabaseSync, getAllSync e runSync." />
        <Bloco titulo="3. Domine os exemplos maiores" texto="Estude alunos, biblioteca, compras, filmes, notas e despesas. Descubra como cada tela valida campos, altera e exclui pelo id." />
        <Bloco titulo="4. Use os relatórios" texto="Cadastre dados e abra Relatórios SQL. Identifique cada COUNT, AVG, SUM, GROUP BY e JOIN e explique o resultado." />
        <Bloco titulo="5. Teste sem consultar o código" texto="Faça o simulado de 24 questões. Depois realize os desafios práticos e compare com os arquivos prontos do laboratório." />
        <Bloco titulo="Código em português" texto="Funções como listar, salvar, excluir, edita, carregar e guardarOuEditar foram mantidas simples, para facilitar a comparação com as aulas." />
        <Bloco titulo="Material oficial do professor">
          <Link href="https://github.com/mateusrovedaa/aulas-mobile-tecnico-2026B" style={{ color: "#2758c8" }}>GitHub da disciplina →</Link>
          <Text style={styles.texto}> </Text>
          <Link href="https://roveda.dev/materiais/sqlite" style={{ color: "#2758c8" }}>Material SQLite →</Link>
          <Text style={styles.texto}> </Text>
          <Link href="https://roveda.dev/materiais/telas" style={{ color: "#2758c8" }}>Material de telas →</Link>
          <Text style={styles.texto}> </Text>
          <Link href="https://roveda.dev/materiais/hooks" style={{ color: "#2758c8" }}>Material de hooks →</Link>
        </Bloco>
      </ScrollView>
    </SafeAreaView>
  );
}
