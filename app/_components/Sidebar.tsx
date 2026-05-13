"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFolders } from "../_context/FoldersContext"
import DeleteFolderModal from "./DeleteFolderModal"
import EditFolderModal from "./EditFolderModal"

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 3.5C1.5 2.948 1.948 2.5 2.5 2.5H5.586a1 1 0 0 1 .707.293l.914.914A1 1 0 0 0 7.914 4H13.5c.552 0 1 .448 1 1v7.5c0 .552-.448 1-1 1h-11a1 1 0 0 1-1-1V3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.917 1.75a1.237 1.237 0 0 1 1.75 1.75L4.083 11.083l-2.333.583.583-2.333L9.917 1.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.75 3.5h10.5M5.25 3.5V2.333a.583.583 0 0 1 .583-.583h2.334a.583.583 0 0 1 .583.583V3.5M11.083 3.5l-.583 8.167H3.5L2.917 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6.417v2.916M5.25 6.417l.175 2.916M8.75 6.417l-.175 2.916" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

type Folder = { id: number; name: string }

export default function Sidebar() {
  const pathname = usePathname()
  const { folders, deleteFolder } = useFolders()
  const [pendingDelete, setPendingDelete] = useState<Folder | null>(null)
  const [pendingEdit, setPendingEdit] = useState<Folder | null>(null)

  function handleConfirmDelete() {
    if (pendingDelete) {
      deleteFolder(pendingDelete.id)
      setPendingDelete(null)
    }
  }

  return (
    <>
      <aside className="fixed top-12 left-0 w-60 h-[calc(100vh-3rem)] bg-white border-r border-(--border) overflow-y-auto">
        <nav className="p-2">
          <Link
            href="/"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              pathname === "/"
                ? "bg-(--hover-bg) text-(--text) font-semibold"
                : "text-(--text-sub) hover:bg-(--hover-bg) hover:text-(--text)"
            }`}
          >
            <GridIcon />
            전체
          </Link>

          <div className="mt-5">
            <p className="px-3 mb-1.5 text-xs font-medium text-(--text-sub) uppercase tracking-wider">폴더</p>
            <ul className="space-y-0.5">
              {folders.map((folder) => {
                const href = `/folder/${folder.id}`
                const isActive = pathname === href
                return (
                  <li key={folder.id} className="group relative">
                    <Link
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 pr-14 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-(--hover-bg) text-(--text) font-semibold"
                          : "text-(--text-sub) hover:bg-(--hover-bg) hover:text-(--text)"
                      }`}
                    >
                      <FolderIcon />
                      <span className="truncate">{folder.name}</span>
                    </Link>
                    <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setPendingEdit(folder)
                        }}
                        className="p-1 rounded text-(--text-sub) hover:text-(--accent) hover:bg-(--hover-bg) transition-colors"
                      >
                        <PencilIcon />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setPendingDelete(folder)
                        }}
                        className="p-1 rounded text-(--text-sub) hover:text-(--error) hover:bg-(--hover-bg) transition-colors"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </aside>

      <EditFolderModal folder={pendingEdit} onClose={() => setPendingEdit(null)} />
      <DeleteFolderModal
        folderName={pendingDelete?.name ?? ""}
        isOpen={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
