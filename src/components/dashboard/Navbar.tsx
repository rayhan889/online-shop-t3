import { Menu } from "lucide-react";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  return (
    <header className="flex flex-1 flex-col md:pl-64">
      <div className="sticky top-0 flex h-16 flex-shrink-0 border-b border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          className="border-r border-slate-300 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:border-slate-500 dark:text-white md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="md:hidden">ThemeToggle</div>
      </div>
    </header>
  );
}
