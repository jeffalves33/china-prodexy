import type { Polo, Local, Turma, Horario, Aluna, Professora, PagamentoAluna, PagamentoProfessora, User } from "./types"

// Usuário logado (pode ser alterado para simular diferentes perfis)
export const currentUser: User = {
  id: "1",
  name: "Ana Paula",
  email: "ana@ginastica.com",
  role: "admin",
}

// Polos
export const polos: Polo[] = [
  { id: "1", name: "Polo São Mateus", city: "São Mateus", createdAt: new Date("2023-01-15") },
  { id: "2", name: "Polo Vitória", city: "Vitória", createdAt: new Date("2023-02-20") },
  { id: "3", name: "Polo Linhares", city: "Linhares", createdAt: new Date("2023-03-10") },
]

// Locais
export const locais: Local[] = [
  { id: "1", poloId: "1", name: "Escola Elesmão", address: "Rua das Flores, 123", createdAt: new Date("2023-01-20") },
  {
    id: "2",
    poloId: "1",
    name: "Ginásio Artístico Municipal",
    address: "Av. Principal, 456",
    createdAt: new Date("2023-01-25"),
  },
  {
    id: "3",
    poloId: "2",
    name: "Centro Esportivo Vitória",
    address: "Rua Central, 789",
    createdAt: new Date("2023-02-25"),
  },
  { id: "4", poloId: "3", name: "Ginásio Linhares", address: "Av. Beira Mar, 321", createdAt: new Date("2023-03-15") },
]

// Professoras
export const professoras: Professora[] = [
  {
    id: "1",
    nome: "Mariana Silva",
    email: "mariana@ginastica.com",
    telefone: "(27) 98765-4321",
    turmaIds: ["1", "2"],
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "2",
    nome: "Carolina Santos",
    email: "carolina@ginastica.com",
    telefone: "(27) 98888-7777",
    turmaIds: ["3", "4"],
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "3",
    nome: "Juliana Oliveira",
    email: "juliana@ginastica.com",
    telefone: "(27) 99999-6666",
    turmaIds: ["5"],
    createdAt: new Date("2023-03-05"),
  },
]

// Turmas
export const turmas: Turma[] = [
  {
    id: "1",
    poloId: "1",
    localId: "1",
    name: "Iniciante 1",
    nivel: "Iniciante 1",
    mensalidade: 150,
    idadeAlvo: "4-6 anos",
    professoraIds: ["1"],
    createdAt: new Date("2023-02-01"),
  },
  {
    id: "2",
    poloId: "1",
    localId: "1",
    name: "Iniciante 2",
    nivel: "Iniciante 2",
    mensalidade: 180,
    idadeAlvo: "6-8 anos",
    professoraIds: ["1"],
    createdAt: new Date("2023-02-01"),
  },
  {
    id: "3",
    poloId: "1",
    localId: "2",
    name: "Intermediário A",
    nivel: "Intermediário",
    mensalidade: 220,
    idadeAlvo: "8-10 anos",
    professoraIds: ["2"],
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "4",
    poloId: "2",
    localId: "3",
    name: "Avançado",
    nivel: "Avançado",
    mensalidade: 280,
    idadeAlvo: "10-14 anos",
    professoraIds: ["2"],
    createdAt: new Date("2023-03-01"),
  },
  {
    id: "5",
    poloId: "3",
    localId: "4",
    name: "Iniciante 1",
    nivel: "Iniciante 1",
    mensalidade: 140,
    idadeAlvo: "4-6 anos",
    professoraIds: ["3"],
    createdAt: new Date("2023-03-20"),
  },
]

// Horários
export const horarios: Horario[] = [
  { id: "1", turmaId: "1", diaSemana: "Segunda", horaInicio: "10:00", horaFim: "11:00" },
  { id: "2", turmaId: "1", diaSemana: "Quarta", horaInicio: "10:00", horaFim: "11:00" },
  { id: "3", turmaId: "2", diaSemana: "Terça", horaInicio: "14:00", horaFim: "15:30" },
  { id: "4", turmaId: "2", diaSemana: "Quinta", horaInicio: "14:00", horaFim: "15:30" },
  { id: "5", turmaId: "3", diaSemana: "Segunda", horaInicio: "16:00", horaFim: "17:30" },
  { id: "6", turmaId: "3", diaSemana: "Sexta", horaInicio: "16:00", horaFim: "17:30" },
  { id: "7", turmaId: "4", diaSemana: "Terça", horaInicio: "18:00", horaFim: "20:00" },
  { id: "8", turmaId: "4", diaSemana: "Quinta", horaInicio: "18:00", horaFim: "20:00" },
  { id: "9", turmaId: "5", diaSemana: "Segunda", horaInicio: "09:00", horaFim: "10:00" },
  { id: "10", turmaId: "5", diaSemana: "Quarta", horaInicio: "09:00", horaFim: "10:00" },
]

// Alunas
export const alunas: Aluna[] = [
  {
    id: "1",
    nome: "Sofia Rodrigues",
    whatsapp: "(27) 99111-2222",
    email: "sofia@email.com",
    diaPagamento: 5,
    turmaId: "1",
    status: "Ativa",
    createdAt: new Date("2023-02-10"),
  },
  {
    id: "2",
    nome: "Isabella Costa",
    whatsapp: "(27) 99222-3333",
    email: "isabella@email.com",
    diaPagamento: 10,
    turmaId: "1",
    status: "Ativa",
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "3",
    nome: "Laura Almeida",
    whatsapp: "(27) 99333-4444",
    email: "laura@email.com",
    diaPagamento: 7,
    turmaId: "2",
    status: "Ativa",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "4",
    nome: "Valentina Souza",
    whatsapp: "(27) 99444-5555",
    email: "valentina@email.com",
    diaPagamento: 8,
    turmaId: "3",
    status: "Ativa",
    createdAt: new Date("2023-03-05"),
  },
  {
    id: "5",
    nome: "Helena Martins",
    whatsapp: "(27) 99555-6666",
    email: "helena@email.com",
    diaPagamento: 12,
    turmaId: "1",
    status: "Ativa",
    createdAt: new Date("2023-02-12"),
  },
  {
    id: "6",
    nome: "Alice Ferreira",
    whatsapp: "(27) 99666-7777",
    email: "alice@email.com",
    diaPagamento: 15,
    turmaId: "4",
    status: "Ativa",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "7",
    nome: "Sophia Lima",
    whatsapp: "(27) 99777-8888",
    email: "sophia@email.com",
    diaPagamento: 25,
    turmaId: "5",
    status: "Ativa",
    createdAt: new Date("2023-03-25"),
  },
  {
    id: "8",
    nome: "Manuela Santos",
    whatsapp: "(27) 99888-9999",
    email: "manuela@email.com",
    diaPagamento: 22,
    turmaId: "2",
    status: "Ativa",
    createdAt: new Date("2023-02-22"),
  },
]

// Pagamentos de Alunas
export const pagamentosAlunas: PagamentoAluna[] = [
  // Sofia Rodrigues - em dia
  {
    id: "1",
    alunaId: "1",
    mesReferencia: "2024-01",
    valor: 150,
    status: "Pago",
    dataPagamento: new Date("2024-01-05"),
  },
  {
    id: "2",
    alunaId: "1",
    mesReferencia: "2024-02",
    valor: 150,
    status: "Pago",
    dataPagamento: new Date("2024-02-05"),
  },
  {
    id: "3",
    alunaId: "1",
    mesReferencia: "2024-03",
    valor: 150,
    status: "Pago",
    dataPagamento: new Date("2024-03-05"),
  },

  // Isabella Costa - 2 meses pendentes
  {
    id: "4",
    alunaId: "2",
    mesReferencia: "2024-01",
    valor: 150,
    status: "Pago",
    dataPagamento: new Date("2024-01-10"),
  },
  { id: "5", alunaId: "2", mesReferencia: "2024-02", valor: 150, status: "Pendente" },
  { id: "6", alunaId: "2", mesReferencia: "2024-03", valor: 150, status: "Pendente" },

  // Laura Almeida - em dia
  {
    id: "7",
    alunaId: "3",
    mesReferencia: "2024-01",
    valor: 180,
    status: "Pago",
    dataPagamento: new Date("2024-01-07"),
  },
  {
    id: "8",
    alunaId: "3",
    mesReferencia: "2024-02",
    valor: 180,
    status: "Pago",
    dataPagamento: new Date("2024-02-07"),
  },
  {
    id: "9",
    alunaId: "3",
    mesReferencia: "2024-03",
    valor: 180,
    status: "Pago",
    dataPagamento: new Date("2024-03-07"),
  },

  // Valentina Souza - 1 mês pendente
  {
    id: "10",
    alunaId: "4",
    mesReferencia: "2024-01",
    valor: 220,
    status: "Pago",
    dataPagamento: new Date("2024-01-08"),
  },
  {
    id: "11",
    alunaId: "4",
    mesReferencia: "2024-02",
    valor: 220,
    status: "Pago",
    dataPagamento: new Date("2024-02-08"),
  },
  { id: "12", alunaId: "4", mesReferencia: "2024-03", valor: 220, status: "Pendente" },
]

// Pagamentos de Professoras
export const pagamentosProfessoras: PagamentoProfessora[] = [
  // Mariana Silva
  {
    id: "1",
    professoraId: "1",
    mesReferencia: "2024-01",
    valor: 2500,
    status: "Pago",
    dataPagamento: new Date("2024-01-30"),
  },
  {
    id: "2",
    professoraId: "1",
    mesReferencia: "2024-02",
    valor: 2500,
    status: "Pago",
    dataPagamento: new Date("2024-02-28"),
  },
  { id: "3", professoraId: "1", mesReferencia: "2024-03", valor: 2500, status: "Pendente" },

  // Carolina Santos
  {
    id: "4",
    professoraId: "2",
    mesReferencia: "2024-01",
    valor: 3000,
    status: "Pago",
    dataPagamento: new Date("2024-01-30"),
  },
  {
    id: "5",
    professoraId: "2",
    mesReferencia: "2024-02",
    valor: 3000,
    status: "Pago",
    dataPagamento: new Date("2024-02-28"),
  },
  { id: "6", professoraId: "2", mesReferencia: "2024-03", valor: 3000, status: "Pendente" },

  // Juliana Oliveira
  {
    id: "7",
    professoraId: "3",
    mesReferencia: "2024-01",
    valor: 1800,
    status: "Pago",
    dataPagamento: new Date("2024-01-30"),
  },
  {
    id: "8",
    professoraId: "3",
    mesReferencia: "2024-02",
    valor: 1800,
    status: "Pago",
    dataPagamento: new Date("2024-02-28"),
  },
  {
    id: "9",
    professoraId: "3",
    mesReferencia: "2024-03",
    valor: 1800,
    status: "Pago",
    dataPagamento: new Date("2023-03-05"),
  },
]

export function getCurrentUser(_pathname: string): User {
  return {
    id: "1",
    name: "Ana Paula",
    email: "ana@ginastica.com",
    role: "admin",
  }
}

// Usuário padrão (admin) - mantido para compatibilidade
export const defaultCurrentUser: User = {
  id: "1",
  name: "Ana Paula",
  email: "ana@ginastica.com",
  role: "admin",
}
