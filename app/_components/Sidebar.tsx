"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useFolders } from "../_context/FoldersContext"

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

export default function Sidebar() {
  const pathname = usePathname()
  const { folders } = useFolders()

  return (
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
                <li key={folder.id}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-(--hover-bg) text-(--text) font-semibold"
                        : "text-(--text-sub) hover:bg-(--hover-bg) hover:text-(--text)"
                    }`}
                  >
                    <FolderIcon />
                    {folder.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
