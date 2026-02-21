"use client"

import { useState } from "react"
import { Menu, X, LogOut, LayoutDashboard, MapPin, Users, User, UserCog, DollarSign, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/mock-data"
import Image from "next/image"

interface MobileHeaderProps {
  title: string
}

export function MobileHeader({ title }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const user = getCurrentUser(pathname)
  const isAdmin = user.role === "admin"

  const adminMenuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Locais", href: "/admin/locais", icon: MapPin },
    { label: "Turmas", href: "/admin/turmas", icon: Users },
    { label: "Alunos", href: "/admin/alunas", icon: User },
    { label: "Professores", href: "/admin/professoras", icon: UserCog },
    { label: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
    { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  const professoraMenuItems = [
    { label: "Dashboard", href: "/professora" },
    { label: "Minhas Turmas", href: "/professora/turmas" },
    { label: "Meus Alunos", href: "/professora/alunas" },
    { label: "Financeiro", href: "/professora/financeiro" },
  ]

  const menuItems = isAdmin ? adminMenuItems : professoraMenuItems

  return (
    <>
      {/* Header fixo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="relative flex items-center px-4 h-14">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (<X className="w-6 h-6 text-gray-700" />) : (<Menu className="w-6 h-6 text-gray-700" />)}
          </button>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-gray-900 truncate">{title}</h1>
        </div>
      </header>

      {/* Drawer lateral */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in" onClick={() => setIsMenuOpen(false)}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Menu */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white animate-slide-in-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {/*<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9EF01A] to-[#7BC918] flex items-center justify-center text-gray-900 text-sm font-semibold">
                    {user.name.charAt(0)}
                  </div>*/}
                  <div className="flex-1 min-w-0">
                    {/*<p className="font-semibold text-gray-900 truncate text-sm">{user.name}</p>*/}
                    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#9EF01A]/20 text-[#7BC918]">
                      {isAdmin ? "Administrador" : "Professora"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 space-y-1">
                  {menuItems.map((item) => {
                    const Icon = (item as any).icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        {Icon && <Icon size={18} />}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Footer do menu */}
              <div className="px-3 py-4 border-t border-gray-200">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Spacer para compensar o header fixo */}
      <div className="h-14" />
    </>
  )
}
