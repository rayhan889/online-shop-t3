import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "~/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Menu, Bell, User, Settings, LogOut } from "lucide-react";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const userNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/", icon: LogOut },
];

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Laoding...</div>;

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

        <div className="flex flex-1 justify-between px-4">
          <div className="flex flex-1">
            <div className="flex w-full items-center md:ml-0">
              {/* show realtime locale hours */}
              {/* <span className="sm:text-sm">{time.format('dddd D MMMM YYYY')}, {time.format('h:mm')}</span> */}
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* profile dropdown */}

            <DropdownMenu>
              <div className="relative ml-3">
                <DropdownMenuTrigger
                  className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  asChild
                >
                  <div>
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      <AvatarImage
                        src={session?.user.image as string}
                        className="h-8 w-8 rounded-full"
                      />
                      <AvatarFallback>
                        {session?.user.name
                          ?.split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block  cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                        )}
                        onClick={() => {
                          if (item.name === "Logout") {
                            void signOut({ callbackUrl: "/auth/signin" });
                          }
                        }}
                      >
                        <DropdownMenuItem key={item.name}>
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.name}</span>
                        </DropdownMenuItem>{" "}
                      </Link>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
