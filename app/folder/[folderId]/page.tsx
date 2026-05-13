import Header from "../../_components/Header"
import Sidebar from "../../_components/Sidebar"
import LinkGrid from "../../_components/LinkGrid"

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params

  return (
    <div className="min-h-screen bg-(--bg)">
      <Header />
      <div className="flex pt-12">
        <Sidebar />
        <main className="ml-60 flex-1">
          <LinkGrid folderId={Number(folderId)} />
        </main>
      </div>
    </div>
  )
}
