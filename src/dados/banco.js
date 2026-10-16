import * as SQLite from "expo-sqlite";

// Este arquivo é importado pelas telas. O banco abre UMA vez.
export const db = SQLite.openDatabaseSync("laboratorio-prova2.db");

db.execSync("PRAGMA foreign_keys = ON;");
db.execSync("PRAGMA journal_mode = WAL;");

// Um arquivo SQLite pode guardar muitas tabelas.
// IF NOT EXISTS preserva os registros ao abrir o app novamente.
db.execSync(
  "CREATE TABLE IF NOT EXISTS tarefas (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "texto TEXT NOT NULL, feita INTEGER NOT NULL DEFAULT 0); " +
  "CREATE TABLE IF NOT EXISTS alunos (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "nome TEXT NOT NULL, curso TEXT NOT NULL, idade INTEGER NOT NULL); " +
  "CREATE TABLE IF NOT EXISTS livros (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "titulo TEXT NOT NULL, autor TEXT NOT NULL, paginas INTEGER NOT NULL, lido INTEGER NOT NULL DEFAULT 0); " +
  "CREATE TABLE IF NOT EXISTS compras (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "produto TEXT NOT NULL, quantidade INTEGER NOT NULL, comprado INTEGER NOT NULL DEFAULT 0); " +
  "CREATE TABLE IF NOT EXISTS filmes (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
  "titulo TEXT NOT NULL, nota REAL NOT NULL, favorito INTEGER NOT NULL DEFAULT 0); " +
  "CREATE TABLE IF NOT EXISTS disciplinas (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL UNIQUE); " +
  "CREATE TABLE IF NOT EXISTS avaliacoes (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, disciplina_id INTEGER NOT NULL, " +
  "descricao TEXT NOT NULL, nota REAL NOT NULL, " +
  "FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE); " +
  "CREATE TABLE IF NOT EXISTS despesas (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT NOT NULL, " +
  "categoria TEXT NOT NULL, valor REAL NOT NULL); " +
  "CREATE TABLE IF NOT EXISTS resultados (" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT, acertos INTEGER NOT NULL, " +
  "total INTEGER NOT NULL, data TEXT NOT NULL);"
);

// Tabelas relacionais: disciplinas (1) -> avaliacoes (N).
// Exemplos de comandos na pasta docs/GUIA-DE-ESTUDO.md.
