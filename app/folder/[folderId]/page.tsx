import Header from "../../_components/Header"
import Sidebar from "../../_components/Sidebar"
import LinkGrid from "../../_components/LinkGrid"
import { FOLDERS } from "../../_data/folders"
import { LINKS } from "../../_data/links"

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params
  const folder = FOLDERS.find((f) => f.id === Number(folderId))
  const folderLinks = LINKS.filter((link) => link.folder === folder?.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-60 flex-1">
          <LinkGrid links={folderLinks} title={folder?.name ?? "폴더"} />
        </main>
      </div>
    </div>
  )
}
