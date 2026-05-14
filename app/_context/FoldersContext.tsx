"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "../../utils/supabase/client"

type Folder = { id: number; name: string }

type FoldersContextType = {
  folders: Folder[]
  isAdding: boolean
  addFolder: (name: string) => Promise<void>
  deleteFolder: (id: number) => Promise<void>
  renameFolder: (id: number, name: string) => Promise<void>
}

const FoldersContext = createContext<FoldersContextType | null>(null)

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const client = createClient()
    client
      .from("folders")
      .select("id, name")
      .order("created_at")
      .then(({ data }) => {
        if (data) setFolders(data)
      })
  }, [])

  async function addFolder(name: string) {
    if (isAdding) return
    setIsAdding(true)
    try {
      const client = createClient()
      const { data, error } = await client
        .from("folders")
        .insert({ name })
        .select("id, name")
        .single()
      if (!error && data) {
        setFolders((prev) => [...prev, data])
      }
    } finally {
      setIsAdding(false)
    }
  }

  async function deleteFolder(id: number) {
    const client = createClient()
    const { error } = await client.from("folders").delete().eq("id", id)
    if (!error) {
      setFolders((prev) => prev.filter((f) => f.id !== id))
    }
  }

  async function renameFolder(id: number, name: string) {
    const client = createClient()
    const { error } = await client.from("folders").update({ name }).eq("id", id)
    if (!error) {
      setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)))
    }
  }

  return (
    <FoldersContext.Provider value={{ folders, isAdding, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FoldersContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FoldersContext)
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider")
  return ctx
}
