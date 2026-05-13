"use client"

import { useState } from "react"
import { useLinks } from "../_context/LinksContext"
import DeleteLinkModal from "./DeleteLinkModal"
import { type LinkItem } from "../_data/links"

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

export default function LinkCard({ link }: { link: LinkItem }) {
  const { deleteLink } = useLinks()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const domain = new URL(link.url).hostname.replace("www.", "")

  return (
    <>
      <div className="group relative bg-white rounded-lg border border-(--border) overflow-hidden hover:bg-(--hover-bg) transition-colors cursor-pointer">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setIsDeleteModalOpen(true) }}
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-md bg-white/80 backdrop-blur-sm border border-(--border) text-(--text-sub) hover:text-(--error) hover:border-(--error) transition-colors opacity-0 group-hover:opacity-100"
          aria-label="링크 삭제"
        >
          <TrashIcon />
        </button>
        {link.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt={link.title}
            className="w-full h-28 object-cover"
          />
        ) : null}
        <div className="p-4">
          {!link.thumbnail && (
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-white shrink-0 ${link.badgeColor}`}
              >
                {link.title.charAt(0)}
              </div>
              <span className="text-xs bg-(--hover-bg) text-(--text-sub) px-2 py-0.5 rounded ml-2 shrink-0">
                {link.folder}
              </span>
            </div>
          )}
          {link.thumbnail && (
            <span className="inline-block text-xs bg-(--hover-bg) text-(--text-sub) px-2 py-0.5 rounded mb-2">
              {link.folder}
            </span>
          )}
          <h3 className="font-medium text-(--text) text-sm mb-1 line-clamp-2">{link.title}</h3>
          {link.description && (
            <p className="text-xs text-(--text-sub) line-clamp-2 mb-1">{link.description}</p>
          )}
          <p className="text-xs text-(--text-sub) truncate">{domain}</p>
        </div>
      </div>
      <DeleteLinkModal
        linkTitle={link.title}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => { deleteLink(link.id); setIsDeleteModalOpen(false) }}
      />
    </>
  )
}
