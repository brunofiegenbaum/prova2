import { useState } from "react";
import { Stack } from "expo-router";
import { ScrollView, Text, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../estilos/padrao";
import Bloco from "../componentes/Bloco";

const desafios = [
  ["Tela simples", "Faça uma tela com View, Text e Button centralizados.", "Use flex: 1, justifyContent: center e alignItems: center no pai."],
  ["Dois campos", "Crie TextInputs de nome e idade e mostre os valores digitados.", "Use useState para cada campo, value e onChangeText."],
  ["Contador", "Crie botões + e -; não deixe o valor abaixo de zero.", "Use setContador e um if antes de diminuir."],
  ["Lista sem banco", "Adicione nomes com FlatList e remova por id.", "Guarde array no estado; filter remove pelo id."],
  ["Navegação", "Crie uma rota chamada /perfil e um Link para ela.", "Arquivo src/app/perfil.js, export default e Link href='/perfil'."],
  ["SQLite simples", "Crie uma tabela chamada produtos com id, nome e preco.", "openDatabaseSync fora do componente, execSync com CREATE TABLE IF NOT EXISTS."],
  ["CRUD completo", "Faça inserir, listar, editar e excluir produtos.", "INSERT, SELECT, UPDATE ... WHERE id=?, DELETE ... WHERE id=?. Recarregue a lista."],
  ["Validação", "Impeça salvar um produto vazio ou com valor menor ou igual a zero.", "Teste com trim(), Number() e Alert.alert antes do SQL."],
  ["Pesquisar", "Filtre livros pelo título em tempo real.", "lista.filter(item => item.titulo.toLowerCase().includes(pesquisa.toLowerCase()))."],
  ["Relacionamento", "Crie categorias e produtos vinculados à categoria.", "A tabela produtos precisa de categoria_id como FOREIGN KEY."],
  ["Relatório", "Calcule quantidade, soma e média em SQL.", "Use SELECT COUNT(*), SUM(valor), AVG(valor), GROUP BY."],
  ["API", "Busque registros de uma API pública e mostre loading e erro.", "Use async/await, fetch, response.ok, response.json e try/catch/finally."],
  ["Acessibilidade", "Crie botão e campo com etiquetas acessíveis.", "Adicione accessibilityLabel, role e hint onde fizer sentido."],
  ["Bug intencional", "Descubra por que o registro foi salvo, mas não aparece após clicar.", "Depois do INSERT, falta carregar() para chamar setLista(listar())."],
  ["Bug intencional 2", "Você alterou o CREATE TABLE e a coluna não apareceu. Por quê?", "IF NOT EXISTS não altera tabela já criada. Faça migração ou recrie dados apenas no ambiente de testes."],
];
export default function Desafios() {
  const [abertos, setAbertos] = useState([]);
  const [concluidos, setConcluidos] = useState([]);
  function alternar(indice, lista, setLista) {
    setLista(lista.includes(indice) ? lista.filter((id) => id !== indice) : [...lista, indice]);
  }
  return (
    <SafeAreaView style={styles.tela} edges={["bottom"]}>
      <Stack.Screen options={{ title: "Desafios de programação" }} />
      <ScrollView>
        <Text style={styles.titulo}>Prática de prova</Text>
        <Text style={styles.descricao}>Tente fazer antes de ver a dica. Estas marcações ficam só no estado, não no banco.</Text>
        <Text style={styles.contador}>{concluidos.length} / {desafios.length} marcados como concluídos</Text>
        {desafios.map(([titulo, enunciado, dica], indice) => (
          <Bloco key={indice} titulo={(indice + 1) + ". " + titulo}>
            <Text style={styles.texto}>{enunciado}</Text>
            <View style={styles.botoes}>
              <Button title={abertos.includes(indice) ? "Ocultar dica" : "Mostrar dica"} onPress={() => alternar(indice, abertos, setAbertos)} />
              <Button title={concluidos.includes(indice) ? "✓ Feito" : "Marcar feito"} onPress={() => alternar(indice, concluidos, setConcluidos)} />
            </View>
            {abertos.includes(indice) && <Text style={[styles.auxiliar, { marginTop: 10 }]}>Dica: {dica}</Text>}
          </Bloco>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
