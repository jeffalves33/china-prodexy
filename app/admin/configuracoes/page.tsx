// app/admin/configuracoes/page.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { MobileHeader } from "@/components/layout/mobile-header"
import { Copy, Save, Settings } from "lucide-react"

type PixConfig = {
  pixChave: string
  pixNome: string
  pixBanco?: string
  mensagemTemplate: string
}

const STORAGE_KEY = "ecg_pix_config_v1"

const defaultTemplate =
  "Olá {responsavel}, tudo bem?\n\nA mensalidade de {aluna} está pendente ({meses}).\nValor total: {valor}.\n\nPIX: {pixChave} ({pixNome})\n{pixBanco}"

function loadPixConfig(): PixConfig {
  if (typeof window === "undefined") return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: defaultTemplate }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: defaultTemplate }
    const parsed = JSON.parse(raw) as Partial<PixConfig>
    return {
      pixChave: parsed.pixChave ?? "",
      pixNome: parsed.pixNome ?? "",
      pixBanco: parsed.pixBanco ?? "",
      mensagemTemplate: parsed.mensagemTemplate ?? defaultTemplate,
    }
  } catch {
    return { pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: defaultTemplate }
  }
}

function savePixConfig(cfg: PixConfig) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
}

export default function ConfiguracoesPage() {
  const [cfg, setCfg] = useState<PixConfig>({ pixChave: "", pixNome: "", pixBanco: "", mensagemTemplate: defaultTemplate })
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => setCfg(loadPixConfig()), [])

  const templatePreview = useMemo(() => {
    const meses = "Janeiro 2024, Fevereiro 2024"
    return cfg.mensagemTemplate
      .replaceAll("{responsavel}", "Responsável")
      .replaceAll("{aluna}", "Nome da Aluna")
      .replaceAll("{meses}", meses)
      .replaceAll("{valor}", "R$ 240,00")
      .replaceAll("{pixChave}", cfg.pixChave || "SUA_CHAVE_PIX")
      .replaceAll("{pixNome}", cfg.pixNome || "SEU_NOME")
      .replaceAll("{pixBanco}", cfg.pixBanco ? `Banco: ${cfg.pixBanco}` : "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  }, [cfg])

  function onSave() {
    savePixConfig({
      pixChave: cfg.pixChave.trim(),
      pixNome: cfg.pixNome.trim(),
      pixBanco: (cfg.pixBanco ?? "").trim(),
      mensagemTemplate: (cfg.mensagemTemplate || defaultTemplate).trim(),
    })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1500)
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(templatePreview)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  return (
    <div className="min-h-screen bg-(--color-background-secondary)">
      <MobileHeader title="Configurações" />

      <main className="px-4 pb-6 space-y-4 pt-4">
        <div className="bg-white rounded-lg border border-(--color-border) p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-(--color-primary-light) flex items-center justify-center">
            <Settings className="w-5 h-5 text-(--color-primary)" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-(--color-foreground)">PIX para cobrança no WhatsApp</p>
            <p className="text-sm text-(--color-foreground-secondary)">Esse PIX será incluído na mensagem do botão “Cobrar”.</p>
          </div>
        </div>

        <section className="bg-white rounded-lg border border-(--color-border) p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1">Chave PIX</label>
            <input
              value={cfg.pixChave}
              onChange={(e) => setCfg((s) => ({ ...s, pixChave: e.target.value }))}
              className="w-full px-3 py-2 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
              placeholder="Ex.: 11999999999 / email@dominio.com / chave aleatória"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1">Nome do recebedor</label>
            <input
              value={cfg.pixNome}
              onChange={(e) => setCfg((s) => ({ ...s, pixNome: e.target.value }))}
              className="w-full px-3 py-2 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
              placeholder="Ex.: João Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1">Banco (opcional)</label>
            <input
              value={cfg.pixBanco ?? ""}
              onChange={(e) => setCfg((s) => ({ ...s, pixBanco: e.target.value }))}
              className="w-full px-3 py-2 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
              placeholder="Ex.: Nubank"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-(--color-foreground) mb-1">Template da mensagem</label>
            <textarea
              value={cfg.mensagemTemplate}
              onChange={(e) => setCfg((s) => ({ ...s, mensagemTemplate: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-(--color-border) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary) bg-white"
            />
            <p className="text-xs text-(--color-foreground-secondary) mt-2">
              Variáveis: <span className="font-mono">{`{responsavel}`}</span>, <span className="font-mono">{`{aluna}`}</span>,{" "}
              <span className="font-mono">{`{meses}`}</span>, <span className="font-mono">{`{valor}`}</span>,{" "}
              <span className="font-mono">{`{pixChave}`}</span>, <span className="font-mono">{`{pixNome}`}</span>,{" "}
              <span className="font-mono">{`{pixBanco}`}</span>
            </p>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onSave}
              className="flex-1 px-4 py-2.5 bg-(--color-primary) text-white rounded-lg font-semibold hover:bg-(--color-primary-hover) transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saved ? "Salvo!" : "Salvar"}
            </button>

            <button
              onClick={onCopy}
              className="px-4 py-2.5 border border-(--color-border) rounded-lg font-semibold text-(--color-foreground) hover:bg-(--color-background-tertiary) transition-colors flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </section>

        <section className="bg-white rounded-lg border border-(--color-border) p-4">
          <p className="text-sm font-semibold text-(--color-foreground) mb-2">Preview</p>
          <pre className="whitespace-pre-wrap text-sm text-(--color-foreground-secondary) bg-(--color-background-secondary) rounded-lg p-3 border border-(--color-border)">
            {templatePreview}
          </pre>
        </section>
      </main>
    </div>
  )
}