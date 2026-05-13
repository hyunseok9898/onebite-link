import { type LinkItem } from "../_data/links"

export default function LinkCard({ link }: { link: LinkItem }) {
  const domain = new URL(link.url).hostname.replace("www.", "")

  return (
    <div className="bg-white rounded-lg border border-(--border) p-4 hover:bg-(--hover-bg) transition-colors cursor-pointer">
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
      <h3 className="font-medium text-(--text) text-sm mb-1.5 line-clamp-2">
        {link.title}
      </h3>
      <p className="text-xs text-(--text-sub) truncate">{domain}</p>
    </div>
  )
}
