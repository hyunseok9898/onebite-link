"use client"

import { useState } from "react"
import { useLinks } from "../_context/LinksContext"
import { useFolders } from "../_context/FoldersContext"
import DeleteLinkModal from "./DeleteLinkModal"
import EditLinkModal from "./EditLinkModal"
import { type LinkItem } from "../_data/links"

const BADGE_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500",
  "bg-red-500", "bg-pink-500", "bg-cyan-500", "bg-indigo-500",
  "bg-teal-500", "bg-yellow-500",
]

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const { deleteLink } = useLinks()
  const { folders } = useFolders()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const domain = new URL(link.url).hostname.replace("www.", "")
  const folderName = folders.find((f) => f.id === link.folder_id)?.name ?? ""
  const badgeColor = BADGE_COLORS[link.id % BADGE_COLORS.length]

  return (
    <>
      <div
        className="group relative bg-white rounded-lg border border-(--border) overflow-hidden hover:bg-(--hover-bg) transition-colors cursor-pointer"
        onClick={() => window.open(link.url, "_blank", "noopener,noreferrer")}
      >
        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true) }}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/80 backdrop-blur-sm border border-(--border) text-(--text-sub) hover:text-(--accent) hover:border-(--accent) transition-colors"
            aria-label="링크 수정"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true) }}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/80 backdrop-blur-sm border border-(--border) text-(--text-sub) hover:text-(--error) hover:border-(--error) transition-colors"
            aria-label="링크 삭제"
          >
            <TrashIcon />
          </button>
        </div>
        {link.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail_url}
            alt={link.title}
            className="w-full h-28 object-cover"
          />
        ) : null}
        <div className="p-4">
          {!link.thumbnail_url && (
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-white shrink-0 ${badgeColor}`}
              >
                {link.title.charAt(0)}
              </div>
              <span className="text-xs bg-(--hover-bg) text-(--text-sub) px-2 py-0.5 rounded ml-2 shrink-0">
                {folderName}
              </span>
            </div>
          )}
          {link.thumbnail_url && (
            <span className="inline-block text-xs bg-(--hover-bg) text-(--text-sub) px-2 py-0.5 rounded mb-2">
              {folderName}
            </span>
          )}
          <h3 className="font-medium text-(--text) text-sm mb-1 line-clamp-2">{link.title}</h3>
          {link.description && (
            <p className="text-xs text-(--text-sub) line-clamp-2 mb-1">{link.description}</p>
          )}
          <p className="text-xs text-(--text-sub) truncate">{domain}</p>
        </div>
      </div>
      <EditLinkModal
        link={isEditModalOpen ? link : null}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteLinkModal
        linkTitle={link.title}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => { await deleteLink(link.id); setIsDeleteModalOpen(false) }}
      />
    </>
  )
}
