// lib/whatsapp.ts
export function normalizePhoneToWa(phone: string) {
  if (!phone) return ""

  // remove tudo que não é número
  const numbers = phone.replace(/\D/g, "")

  // se já começa com 55 (Brasil), mantém
  if (numbers.startsWith("55")) return numbers

  // adiciona 55 automaticamente
  return `55${numbers}`
}

export function fillTemplate(
  template: string,
  variables: Record<string, string>
) {
  let result = template

  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, "g")
    result = result.replace(regex, value ?? "")
  })

  return result
}