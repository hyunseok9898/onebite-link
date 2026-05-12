import Header from "./_components/Header"
import Sidebar from "./_components/Sidebar"
import LinkGrid from "./_components/LinkGrid"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-60 flex-1">
          <LinkGrid />
        </main>
      </div>
    </div>
  )
}
