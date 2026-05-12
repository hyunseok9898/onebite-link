import Header from "../_components/Header"
import Sidebar from "../_components/Sidebar"
import NewLinkForm from "../_components/NewLinkForm"

export default function NewLinkPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-60 flex-1">
          <div className="p-6">
            <NewLinkForm />
          </div>
        </main>
      </div>
    </div>
  )
}
