import { Book, Github, DiscIcon as Discord } from "lucide-react"

export function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="font-semibold text-lg text-zinc-100">Steel Session Config</div>
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <Book className="w-4 h-4" />
              Documentation
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <Discord className="w-4 h-4" />
              Discord
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

