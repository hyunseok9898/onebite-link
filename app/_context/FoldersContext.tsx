"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { FOLDERS } from "../_data/folders"

type Folder = { id: number; name: string }

type FoldersContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
}

const FoldersContext = createContext<FoldersContextType | null>(null)

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(FOLDERS)

  function addFolder(name: string) {
    const nextId = Math.max(...folders.map((f) => f.id)) + 1
    setFolders((prev) => [...prev, { id: nextId, name }])
  }

  return (
    <FoldersContext.Provider value={{ folders, addFolder }}>
      {children}
    </FoldersContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FoldersContext)
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider")
  return ctx
}
