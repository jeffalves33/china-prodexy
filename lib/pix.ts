// lib/pix.ts
export type PixConfig = {
  pixChave: string
  pixNome: string
  pixBanco?: string
  mensagemTemplate?: string
}

const STORAGE_KEY = "ecg_pix_config_v1"

export const DEFAULT_TEMPLATE =
  "Olá {aluno}, tudo bem?\n\nSua mensalidade está pendente ({meses}).\nValor total: {valor}.\n\nPIX: {pixChave} ({pixNome})\n{pixBanco}"

export function getPixConfig(): PixConfig {
  if (typeof window === "undefined") return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: DEFAULT_TEMPLATE }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: DEFAULT_TEMPLATE }

    const parsed = JSON.parse(raw) as Partial<PixConfig>
    return {
      pixChave: parsed.pixChave ?? "",
      pixNome: parsed.pixNome ?? "",
      pixBanco: parsed.pixBanco ?? "",
      mensagemTemplate: parsed.mensagemTemplate ?? DEFAULT_TEMPLATE,
    }
  } catch {
    return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: DEFAULT_TEMPLATE }
  }
}