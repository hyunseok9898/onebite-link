"use client"

import { FOLDERS } from "../_data/folders"

export default function NewLinkForm() {
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">새 링크 추가</h2>
      <form
        className="bg-white rounded-xl border border-gray-200 p-6 space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1.5">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-gray-700 mb-1.5">
            폴더
          </label>
          <select
            id="folder"
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
          >
            <option value="" disabled>
              폴더를 선택하세요
            </option>
            {FOLDERS.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          저장
        </button>
      </form>
    </div>
  )
}
