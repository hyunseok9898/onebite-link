import LinkCard from "./LinkCard"
import { LINKS, type LinkItem } from "../_data/links"

interface Props {
  links?: LinkItem[]
  title?: string
}

export default function LinkGrid({ links = LINKS, title = "전체" }: Props) {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}{" "}
          <span className="text-base font-normal text-gray-400 ml-1">{links.length}</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  )
}
