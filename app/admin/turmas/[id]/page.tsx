// app/admin/turmas/[id]/page.tsx
"use client"

import { use as usePromise, useState } from "react"
import { MobileHeader } from "@/components/layout/mobile-header"
import { BackButton } from "@/components/ui/back-button"
import { Modal } from "@/components/ui/modal"
import { GraduationCap, Users, DollarSign, Clock, Plus, Edit, Trash2, AlertCircle, MessageCircle } from "lucide-react"
import { locais, turmas, alunas, horarios, professoras, pagamentosAlunas } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"
import type { Horario, Aluna } from "@/lib/types"
import Link from "next/link"
import { normalizePhoneToWa, fillTemplate } from "@/lib/whatsapp"
import { getPixConfig, DEFAULT_TEMPLATE } from "@/lib/pix"

export default function TurmaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params)
  const idStr = String(id)
  const turma = turmas.find((t) => String(t.id) === idStr)

  if (!turma) return <TurmaDetailClient turmaId={id} turma={null} />

  const local = locais.find((l) => l.id === turma.localId)
  const horariosDaTurma = horarios.filter((h) => String(h.turmaId) === String(turma.id))
  const alunasDaTurma = alunas.filter((a) => String(a.turmaId) === String(turma.id))
  const professoraIds = Array.isArray((turma as any).professoraIds) ? (turma as any).professoraIds : (turma as any).professoraId ? [(turma as any).professoraId] : []
  const professorasDaTurma = professoras.filter((p) => professoraIds.map(String).includes(String(p.id)))

  return (
    <TurmaDetailClient
      turmaId={idStr}
      turma={turma}
      local={local}
      horariosDaTurma={horariosDaTurma}
      alunasDaTurma={alunasDaTurma}
      professorasDaTurma={professorasDaTurma}
    />
  )
}

function TurmaDetailClient({
  turmaId,
  turma,
  local,
  horariosDaTurma = [],
  alunasDaTurma = [],
  professorasDaTurma = [],
}: any) {
  const [isAddHorarioModalOpen, setIsAddHorarioModalOpen] = useState(false)
  const [isEditHorarioModalOpen, setIsEditHorarioModalOpen] = useState(false)
  const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [selectedAluna, setSelectedAluna] = useState<Aluna | null>(null)
  const [isCobrarModalOpen, setIsCobrarModalOpen] = useState(false)

  const pixCfg = getPixConfig()
  const pixOk = !!pixCfg.pixChave && !!pixCfg.pixNome

  const pendentes = selectedAluna
    ? pagamentosAlunas
      .filter((p) => String(p.alunaId) === String(selectedAluna.id) && p.status === "Pendente")
      .sort((a, b) => b.mesReferencia.localeCompare(a.mesReferencia))
    : []

  const valorPendente = pendentes.reduce((sum, p) => sum + p.valor, 0)
  const mesesPendentes = pendentes.map((p) => p.mesReferencia).join(", ")

  const waPhone = normalizePhoneToWa(selectedAluna?.whatsapp || "")

  const waText = fillTemplate(pixCfg.mensagemTemplate || DEFAULT_TEMPLATE, {
    aluno: selectedAluna?.nome || "Aluno",
    meses: mesesPendentes || "mês(es) pendente(s)",
    valor: formatCurrency(valorPendente || 0),
    pixChave: pixCfg.pixChave || "",
    pixNome: pixCfg.pixNome || "",
    pixBanco: pixCfg.pixBanco ? `Banco: ${pixCfg.pixBanco}` : "",
  })
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  const waUrl = waPhone ? `https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}` : ""

  if (!turma) return <div>Turma não encontrada</div>

  const mesAtual = "2024-03"
  const getPendencias = (alunaId: string) => {
    const pagamentos = pagamentosAlunas.filter((p) => p.alunaId === alunaId && p.status === "Pendente")
    return pagamentos.length
  }

  return (
    <div className="min-h-screen bg-(--color-background-secondary)">
      <MobileHeader title={turma.name} />
      <BackButton />

      <main className="px-4 pb-6 space-y-6">
        {/* Info da turma */}
        <section className="pt-4 bg-white rounded-lg p-4 border border-(--color-border)">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-(--color-primary-light) flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-(--color-primary)" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl text-(--color-foreground) mb-1">{turma.name}</h2>
              <p className="text-sm text-(--color-foreground-secondary)">
                {local?.name}
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-(--color-primary-light) text-(--color-primary)">
                {turma.nivel}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-(--color-background-secondary) rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-(--color-foreground-secondary)" />
                <p className="text-xs text-(--color-foreground-secondary)">Mensalidade</p>
              </div>
              <p className="text-lg font-bold text-(--color-foreground)">{formatCurrency(turma.mensalidade)}</p>
            </div>

            <div className="bg-(--color-background-secondary) rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-(--color-foreground-secondary)" />
                <p className="text-xs text-(--color-foreground-secondary)">Alunos</p>
              </div>
              <p className="text-lg font-bold text-(--color-foreground)">{alunasDaTurma.length}</p>
            </div>
          </div>

          <p className="text-sm text-(--color-foreground-secondary) mt-1">
            <strong>Professor{professorasDaTurma.length > 1 ? "es" : ""}:</strong>{" "}
            {professorasDaTurma.length
              ? professorasDaTurma.map((p: any) => p.nome ?? p.name).join(", ")
              : "—"}
          </p>
        </section>

        {/* Horários */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-(--color-foreground)">Horários</h3>
            <button
              onClick={() => setIsAddHorarioModalOpen(true)}
              className="px-3 py-1.5 bg-(--color-primary) text-white text-sm font-medium rounded-lg hover:bg-(--color-primary-hover) transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>

          {horariosDaTurma.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center border border-(--color-border)">
              <Clock className="w-10 h-10 mx-auto text-(--color-foreground-muted) mb-2" />
              <p className="text-(--color-foreground-secondary)">Nenhum horário cadastrado</p>
            </div>
          ) : (
            <div className="space-y-2">
              {horariosDaTurma.map((horario) => (
                <div
                  key={horario.id}
                  className="bg-white rounded-lg p-3 border border-(--color-border) flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-(--color-foreground)">{horario.diaSemana}</p>
                      <p className="text-sm text-(--color-foreground-secondary)">
                        {horario.horaInicio} - {horario.horaFim}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedHorario(horario)
                        setIsEditHorarioModalOpen(true)
                      }}
                      className="p-2 hover:bg-(--color-background-tertiary) rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-(--color-foreground-secondary)" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-(--color-error)" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Alunos */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-(--color-foreground)">Alunas da Turma</h3>

          {alunasDaTurma.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-center border border-(--color-border)">
              <Users className="w-10 h-10 mx-auto text-(--color-foreground-muted) mb-2" />
              <p className="text-(--color-foreground-secondary)">Nenhuma aluna matriculada</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alunasDaTurma.map((aluna) => {
                const pendencias = getPendencias(aluna.id)
                const valorPendente = pagamentosAlunas
                  .filter((p) => p.alunaId === aluna.id && p.status === "Pendente")
                  .reduce((sum, p) => sum + p.valor, 0)

                return (
                  <div key={aluna.id} className="bg-white rounded-lg p-4 border border-(--color-border)">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-(--color-foreground)">{aluna.nome}</h4>
                        <p className="text-sm text-(--color-foreground-secondary)">Venc. dia {aluna.diaPagamento}</p>
                        <p className="text-sm text-(--color-foreground-secondary)">Mensalidade: {formatCurrency(aluna.mensalidade ?? turma.mensalidade)}</p>
                      </div>
                      {pendencias > 0 && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {pendencias} mês{pendencias > 1 ? "es" : ""}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/admin/alunas/${aluna.id}`}
                        className="flex-1 px-3 py-2 border border-(--color-border) rounded-lg text-sm font-medium text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors text-center"
                      >
                        Ver Ficha
                      </Link>

                      {pendencias > 0 && (
                        <button
                          onClick={() => {
                            setSelectedAluna(aluna)
                            setIsCobrarModalOpen(true)
                          }}
                          className="flex-1 px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-zinc-900 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Cobrar
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedAluna(aluna)
                          setIsTransferModalOpen(true)
                        }}
                        className="flex-1 px-3 py-2 border border-(--color-border) rounded-lg text-sm font-medium text-(--color-primary) hover:bg-(--color-primary-light) transition-colors"
                      >
                        Transferir
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Modal Adicionar Horário */}
      <Modal isOpen={isAddHorarioModalOpen} onClose={() => setIsAddHorarioModalOpen(false)} title="Adicionar Horário">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setIsAddHorarioModalOpen(false)
          }}
        >
          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Dia da Semana</label>
            <select
              className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              required
            >
              <option value="">Selecione o dia</option>
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Hora Início</label>
              <input
                type="time"
                className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Hora Fim</label>
              <input
                type="time"
                className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddHorarioModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-(--color-border) rounded-lg font-semibold text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-(--color-primary) text-white rounded-lg font-semibold hover:bg-(--color-primary-hover) transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Editar Horário */}
      <Modal isOpen={isEditHorarioModalOpen} onClose={() => setIsEditHorarioModalOpen(false)} title="Editar Horário">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setIsEditHorarioModalOpen(false)
          }}
        >
          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Dia da Semana</label>
            <select
              defaultValue={selectedHorario?.diaSemana}
              className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              required
            >
              <option value="Segunda">Segunda</option>
              <option value="Terça">Terça</option>
              <option value="Quarta">Quarta</option>
              <option value="Quinta">Quinta</option>
              <option value="Sexta">Sexta</option>
              <option value="Sábado">Sábado</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Hora Início</label>
              <input
                type="time"
                defaultValue={selectedHorario?.horaInicio}
                className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Hora Fim</label>
              <input
                type="time"
                defaultValue={selectedHorario?.horaFim}
                className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditHorarioModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-(--color-border) rounded-lg font-semibold text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-(--color-primary) text-white rounded-lg font-semibold hover:bg-(--color-primary-hover) transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Transferir Aluna */}
      <Modal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} title="Transferir Aluna">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setIsTransferModalOpen(false)
          }}
        >
          <p className="text-(--color-foreground-secondary)">
            Transferir <strong>{selectedAluna?.nome}</strong> para:
          </p>
          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Nova Turma</label>
            <select
              className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)"
              required
            >
              <option value="">Selecione uma turma</option>
              {turmas
                .filter((t) => t.id !== turmaId)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} - {locais.find((l) => l.id === t.localId)?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsTransferModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-(--color-border) rounded-lg font-semibold text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-(--color-primary) text-white rounded-lg font-semibold hover:bg-(--color-primary-hover) transition-colors"
            >
              Transferir
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isCobrarModalOpen} onClose={() => setIsCobrarModalOpen(false)} title="Cobrar pelo WhatsApp">
        <div className="space-y-4">
          <div className="bg-(--color-background-secondary) rounded-lg p-4">
            <p className="text-sm text-(--color-foreground-secondary) mb-1">Aluna</p>
            <p className="font-semibold text-(--color-foreground)">{selectedAluna?.nome}</p>

            <p className="text-sm text-(--color-foreground-secondary) mt-3 mb-1">WhatsApp</p>
            <p className="font-medium text-(--color-foreground)">{selectedAluna?.whatsapp}</p>

            <p className="text-sm text-(--color-foreground-secondary) mt-3 mb-1">Meses Pendentes</p>
            <p className="text-xl font-bold text-amber-600">
              {getPendencias(selectedAluna?.id || "")} mês{getPendencias(selectedAluna?.id || "") > 1 ? "es" : ""}
            </p>

            <p className="text-sm text-(--color-foreground-secondary) mt-3 mb-1">Valor Total</p>
            <p className="text-2xl font-bold text-(--color-foreground)">
              {formatCurrency(
                pagamentosAlunas
                  .filter((p) => p.alunaId === selectedAluna?.id && p.status === "Pendente")
                  .reduce((sum, p) => sum + p.valor, 0),
              )}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCobrarModalOpen(false)}
              className="flex-1 px-4 py-2.5 border border-(--color-border) rounded-lg font-semibold text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors"
            >
              Fechar
            </button>

            {pixOk ? (
              waUrl ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  title="WhatsApp do aluno inválido"
                  className="flex-1 px-4 py-2.5 bg-black text-white rounded-lg font-semibold opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Abrir WhatsApp
                </button>
              )
            ) : (
              <a
                href="/admin/configuracoes"
                className="flex-1 px-4 py-2.5 bg-(--color-primary) text-white rounded-lg font-semibold hover:bg-(--color-primary-hover) transition-colors flex items-center justify-center"
              >
                Configurar PIX
              </a>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
