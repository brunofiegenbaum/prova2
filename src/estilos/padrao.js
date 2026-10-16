import { StyleSheet } from "react-native";

export const cores = {
  fundo: "#f5f7fb",
  branco: "#ffffff",
  azul: "#2758c8",
  azulClaro: "#e9f0ff",
  texto: "#18243b",
  subtitulo: "#52627b",
  borda: "#dce4ef",
  perigo: "#b4232c",
  verde: "#187a48",
};

export const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16, backgroundColor: cores.fundo },
  titulo: { fontSize: 23, fontWeight: "bold", color: cores.texto, marginBottom: 5 },
  descricao: { fontSize: 14, lineHeight: 21, color: cores.subtitulo, marginBottom: 16 },
  cartao: {
    backgroundColor: cores.branco, borderRadius: 12, borderWidth: 1,
    borderColor: cores.borda, padding: 14, marginBottom: 12,
  },
  cartaoTitulo: { fontSize: 17, fontWeight: "bold", color: cores.texto, marginBottom: 6 },
  campo: {
    borderWidth: 1, borderColor: cores.borda, backgroundColor: cores.branco,
    borderRadius: 10, padding: 12, fontSize: 16, color: cores.texto, marginBottom: 10,
  },
  rotulo: { color: cores.texto, fontWeight: "600", marginBottom: 5 },
  linha: { flexDirection: "row", alignItems: "center", gap: 10 },
  separado: { marginBottom: 12 },
  texto: { fontSize: 15, color: cores.texto, lineHeight: 23 },
  auxiliar: { fontSize: 13, color: cores.subtitulo, lineHeight: 19 },
  item: {
    backgroundColor: cores.branco, borderWidth: 1, borderColor: cores.borda,
    borderRadius: 10, padding: 13, marginBottom: 8,
  },
  itemTitulo: { fontWeight: "bold", color: cores.texto, fontSize: 16 },
  itemDetalhe: { color: cores.subtitulo, marginTop: 4 },
  botoes: { flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" },
  contador: { fontSize: 14, fontWeight: "bold", color: cores.azul, marginBottom: 10 },
  vazio: { textAlign: "center", color: cores.subtitulo, marginTop: 24 },
});
