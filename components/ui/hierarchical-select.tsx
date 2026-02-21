"use client"

import { useState, useEffect } from "react"

interface Option {
  value: string
  label: string
}

interface HierarchicalSelectProps {
  locais: Option[]
  turmas?: Option[]
  onLocalChange?: (localId: string) => void
  onTurmaChange?: (turmaId: string) => void
  selectedPolo?: string
  selectedLocal?: string
  selectedTurma?: string
  showTurmas?: boolean
}

export function HierarchicalSelect({
  locais,
  turmas = [],
  onLocalChange,
  onTurmaChange,
  selectedLocal = "",
  selectedTurma = "",
  showTurmas = false,
}: HierarchicalSelectProps) {
  const [local, setLocal] = useState(selectedLocal)
  const [turma, setTurma] = useState(selectedTurma)

  // Reset turma quando local muda
  useEffect(() => {
    if (local !== selectedLocal) {
      setTurma("")
      onTurmaChange?.("")
    }
  }, [local])

  const handleLocalChange = (value: string) => {
    setLocal(value)
    onLocalChange?.(value)
  }

  const handleTurmaChange = (value: string) => {
    setTurma(value)
    onTurmaChange?.(value)
  }

  return (
    <div className="space-y-3">
      {
        <div>
          <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Local</label>
          <select
            value={local}
            onChange={(e) => handleLocalChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
          >
            <option value="">Selecione um local</option>
            {locais.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      }

      {showTurmas && local && (
        <div>
          <label className="block text-sm font-medium text-(--color-foreground) mb-1.5">Turma</label>
          <select
            value={turma}
            onChange={(e) => handleTurmaChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
          >
            <option value="">Selecione uma turma</option>
            {turmas.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}
