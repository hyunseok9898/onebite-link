import { type LinkItem } from "../_data/links"

export default function LinkCard({ link }: { link: LinkItem }) {
  const domain = new URL(link.url).hostname.replace("www.", "")

  return (
    <div className="bg-white rounded-lg border border-(--border) overflow-hidden hover:bg-(--hover-bg) transition-colors cursor-pointer">
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
  )
}
