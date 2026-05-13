"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFolders } from "../_context/FoldersContext"
import { useLinks } from "../_context/LinksContext"

export default function NewLinkForm() {
  const router = useRouter()
  const { folders } = useFolders()
  const { addLink } = useLinks()

  const [url, setUrl] = useState("")
  const [folderId, setFolderId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!url.trim()) {
      setError("링크 주소를 입력해주세요.")
      return
    }
    if (!folderId) {
      setError("폴더를 선택해주세요.")
      return
    }

    const folder = folders.find((f) => f.id === Number(folderId))
    if (!folder) {
      setError("유효하지 않은 폴더입니다.")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url.trim())}`)
      const data = await res.json()

      addLink({
        title: data.title || new URL(url.trim()).hostname,
        url: url.trim(),
        folder: folder.name,
        description: data.description || undefined,
        thumbnail: data.thumbnail || undefined,
      })

      router.push("/")
    } catch {
      setError("링크 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-(--text) mb-6">새 링크 추가</h2>
      <form
        className="bg-white rounded-lg border border-(--border) p-6 space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-(--text) mb-1.5">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
          />
        </div>

        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-(--text) mb-1.5">
            폴더
          </label>
          <select
            id="folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
          >
            <option value="" disabled>
              폴더를 선택하세요
            </option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-(--error)">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "정보 불러오는 중..." : "저장"}
        </button>
      </form>
    </div>
  )
}
