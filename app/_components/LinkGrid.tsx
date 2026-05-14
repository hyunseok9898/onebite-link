"use client"

import LinkCard from "./LinkCard"
import { useLinks } from "../_context/LinksContext"
import { useFolders } from "../_context/FoldersContext"

interface Props {
  folderId?: number
}

export default function LinkGrid({ folderId }: Props) {
  const { links } = useLinks()
  const { folders } = useFolders()

  const folder = folderId !== undefined ? folders.find((f) => f.id === folderId) : undefined
  const filtered = folderId !== undefined ? links.filter((l) => l.folder_id === folderId) : links
  const title = folder?.name ?? "전체"

  return (
    <div className="p-6">
      <div className="flex items-baseline mb-6">
        <h2 className="text-lg font-semibold text-(--text)">{title}</h2>
        <span className="text-sm text-(--text-sub) ml-2">{filtered.length}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  )
}
