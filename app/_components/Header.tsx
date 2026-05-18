"use client"

import { useState } from "react"
import Link from "next/link"
import NewFolderModal from "./NewFolderModal"

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-12 bg-white/90 backdrop-blur-sm border-b border-(--border) flex items-center justify-between px-4 z-50">
        <span className="text-base font-semibold text-(--text)">현석링크</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 border border-(--border) text-(--text) text-sm font-medium px-4 py-2 rounded-md hover:bg-(--hover-bg) transition-colors"
          >
            <PlusIcon />
            새 폴더
          </button>
          <Link
            href="/new"
            className="flex items-center gap-1.5 bg-(--accent) text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-(--accent-hover) transition-colors"
          >
            <PlusIcon />
            새 링크
          </Link>
        </div>
      </header>
      <NewFolderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
