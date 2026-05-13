"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { FOLDERS } from "../_data/folders"

type Folder = { id: number; name: string }

type FoldersContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
  deleteFolder: (id: number) => void
  renameFolder: (id: number, name: string) => void
}

const FoldersContext = createContext<FoldersContextType | null>(null)

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(FOLDERS)

  function addFolder(name: string) {
    const nextId = Math.max(...folders.map((f) => f.id)) + 1
    setFolders((prev) => [...prev, { id: nextId, name }])
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id))
  }

  function renameFolder(id: number, name: string) {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)))
  }

  return (
    <FoldersContext.Provider value={{ folders, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FoldersContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FoldersContext)
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider")
  return ctx
}
