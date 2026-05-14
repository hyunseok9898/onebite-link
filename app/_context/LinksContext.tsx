"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "../../utils/supabase/client"
import { type LinkItem } from "../_data/links"

type NewLinkData = {
  title: string
  url: string
  folder_id: number | null
  description: string | null
  thumbnail_url: string | null
}

type LinksContextType = {
  links: LinkItem[]
  isAdding: boolean
  addLink: (data: NewLinkData) => Promise<void>
  updateLink: (id: number, data: { title: string; folder_id: number | null; description: string | null }) => void
  deleteLink: (id: number) => void
}

const LinksContext = createContext<LinksContextType | null>(null)

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const client = createClient()
    client
      .from("link")
      .select("id, title, url, description, thumbnail_url, folder_id, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data)
      })
  }, [])

  async function addLink(data: NewLinkData) {
    if (isAdding) return
    setIsAdding(true)
    try {
      const client = createClient()
      const { data: inserted, error } = await client
        .from("link")
        .insert(data)
        .select("id, title, url, description, thumbnail_url, folder_id, created_at")
        .single()
      if (!error && inserted) {
        setLinks((prev) => [inserted, ...prev])
      }
    } finally {
      setIsAdding(false)
    }
  }

  function updateLink(id: number, data: { title: string; folder_id: number | null; description: string | null }) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)))
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <LinksContext.Provider value={{ links, isAdding, addLink, updateLink, deleteLink }}>
      {children}
    </LinksContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinksContext)
  if (!ctx) throw new Error("useLinks must be used within LinksProvider")
  return ctx
}
