"use client"

import { useState, useEffect } from "react"
import { useFolders } from "../_context/FoldersContext"

interface Props {
  folder: { id: number; name: string } | null
  onClose: () => void
}

export default function EditFolderModal({ folder, onClose }: Props) {
  const { renameFolder } = useFolders()
  const [name, setName] = useState("")

  useEffect(() => {
    if (folder) setName(folder.name)
  }, [folder])

  if (!folder) return null

  async function handleSave() {
    if (!name.trim() || !folder) return
    await renameFolder(folder.id, name.trim())
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg border border-(--border) p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-(--text) mb-4">폴더 이름 수정</h3>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-(--border) text-sm text-(--text) hover:bg-(--hover-bg) transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-(--accent) text-white text-sm font-medium hover:bg-(--accent-hover) transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
