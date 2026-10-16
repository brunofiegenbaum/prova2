import { View, Text, StyleSheet } from "react-native";
import { cores } from "../estilos/padrao";

export default function Bloco({ titulo, texto, children }) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.titulo}>{titulo}</Text>
      {texto ? <Text style={styles.texto}>{texto}</Text> : null}
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  caixa: {
    padding: 15, borderWidth: 1, borderColor: cores.borda,
    backgroundColor: cores.branco, borderRadius: 12, marginBottom: 12,
  },
  titulo: { fontWeight: "bold", fontSize: 16, marginBottom: 5, color: cores.texto },
  texto: { color: cores.subtitulo, lineHeight: 21, marginBottom: 6 },
});
