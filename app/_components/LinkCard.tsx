import { type LinkItem } from "../_data/links"

export default function LinkCard({ link }: { link: LinkItem }) {
  const domain = new URL(link.url).hostname.replace("www.", "")

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0 ${link.badgeColor}`}
        >
          {link.title.charAt(0)}
        </div>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full ml-2 shrink-0">
          {link.folder}
        </span>
      </div>
      <h3 className="font-medium text-gray-900 text-sm mb-1.5 line-clamp-2 group-hover:text-indigo-600 transition-colors">
        {link.title}
      </h3>
      <p className="text-xs text-gray-400 truncate">{domain}</p>
    </div>
  )
}
