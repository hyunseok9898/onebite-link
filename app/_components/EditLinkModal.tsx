"use client"

import { useState, useEffect } from "react"
import { useLinks } from "../_context/LinksContext"
import { useFolders } from "../_context/FoldersContext"
import { type LinkItem } from "../_data/links"

interface Props {
  link: LinkItem | null
  onClose: () => void
}

export default function EditLinkModal({ link, onClose }: Props) {
  const { updateLink } = useLinks()
  const { folders } = useFolders()
  const [title, setTitle] = useState("")
  const [folder, setFolder] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (link) {
      setTitle(link.title)
      setFolder(link.folder)
      setDescription(link.description ?? "")
    }
  }, [link])

  if (!link) return null

  function handleSave() {
    if (!title.trim() || !link) return
    updateLink(link.id, {
      title: title.trim(),
      folder,
      description: description.trim() || undefined,
    })
    onClose()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="bg-white rounded-lg border border-(--border) p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-(--text) mb-4">링크 수정</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs text-(--text-sub) mb-1">폴더</label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            >
              {folders.map((f) => (
                <option key={f.id} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-(--text-sub) mb-1">제목</label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-(--text-sub) mb-1">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
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
