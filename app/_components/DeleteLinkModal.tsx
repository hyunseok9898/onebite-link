"use client"

interface Props {
  linkTitle: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteLinkModal({ linkTitle, isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg border border-(--border) p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-(--text) mb-2">링크 삭제</h3>
        <p className="text-sm text-(--text-sub) mb-6">
          &ldquo;{linkTitle}&rdquo; 링크를 삭제할까요?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-(--border) text-sm text-(--text) hover:bg-(--hover-bg) transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-(--error) text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
