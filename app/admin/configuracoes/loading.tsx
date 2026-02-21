// app/admin/configuracoes/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-(--color-background-secondary)">
      <div className="px-4 pt-4 space-y-3">
        <div className="h-10 bg-white rounded-lg animate-pulse" />
        <div className="h-32 bg-white rounded-lg animate-pulse" />
        <div className="h-48 bg-white rounded-lg animate-pulse" />
      </div>
    </div>
  )
}