"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { LINKS, type LinkItem } from "../_data/links"

const BADGE_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500",
  "bg-red-500", "bg-pink-500", "bg-cyan-500", "bg-indigo-500",
  "bg-teal-500", "bg-yellow-500",
]

type NewLinkData = {
  title: string
  url: string
  folder: string
  description?: string
  thumbnail?: string
}

type UpdateLinkData = {
  title: string
  folder: string
  description?: string
}

type LinksContextType = {
  links: LinkItem[]
  addLink: (data: NewLinkData) => void
  updateLink: (id: number, data: UpdateLinkData) => void
  deleteLink: (id: number) => void
}

const LinksContext = createContext<LinksContextType | null>(null)

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(LINKS)

  function addLink(data: NewLinkData) {
    const id = links.length > 0 ? Math.max(...links.map((l) => l.id)) + 1 : 1
    const badgeColor = BADGE_COLORS[links.length % BADGE_COLORS.length]
    setLinks((prev) => [...prev, { ...data, id, badgeColor }])
  }

  function updateLink(id: number, data: UpdateLinkData) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)))
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinksContext)
  if (!ctx) throw new Error("useLinks must be used within LinksProvider")
  return ctx
}
