"use client"

import { useFolders } from "../_context/FoldersContext"

export default function NewLinkForm() {
  const { folders } = useFolders()

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-(--text) mb-6">새 링크 추가</h2>
      <form
        className="bg-white rounded-lg border border-(--border) p-6 space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-(--text) mb-1.5">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://"
            className="w-full px-3 py-2 rounded-md border border-(--border) text-sm text-(--text) bg-white focus:outline-none focus:border-(--accent) transition-colors"
          />
        </div>

        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-(--text) mb-1.5">
            폴더
          </label>
          <select
            id="folder"
            defaultValue=""
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

        <button
          type="submit"
          className="w-full bg-(--accent) text-white text-sm font-medium py-2 rounded-md hover:bg-(--accent-hover) transition-colors"
        >
          저장
        </button>
      </form>
    </div>
  )
}
