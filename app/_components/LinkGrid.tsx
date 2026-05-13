import LinkCard from "./LinkCard"
import { LINKS, type LinkItem } from "../_data/links"

interface Props {
  links?: LinkItem[]
  title?: string
}

export default function LinkGrid({ links = LINKS, title = "전체" }: Props) {
  return (
    <div className="p-6">
      <div className="flex items-baseline mb-6">
        <h2 className="text-lg font-semibold text-(--text)">
          {title}
        </h2>
        <span className="text-sm text-(--text-sub) ml-2">{links.length}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  )
}
