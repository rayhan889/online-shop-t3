import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type PropsWithChildren, useEffect, useState } from "react";
import { Home, ShoppingBag } from "lucide-react";

import Sidebar from "~/components/dashboard/Sidebar";
import ContentArea from "~/components/dashboard/ContentArea";
import Navbar from "~/components/dashboard/Navbar";

const AdminLayout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { pathname } = useRouter();

  const [navLinks, setNavLinks] = useState([
    {
      name: "Home",
      href: "/dashboard/home",
      icon: Home,
      current: false,
    },
    {
      name: "Product",
      href: "/dashboard/products",
      icon: ShoppingBag,
      current: false,
    },
  ]);

  useEffect(() => {
    setNavLinks((prevNavLinks) =>
      prevNavLinks.map((nav) => {
        if (pathname.includes(nav.href)) {
          return { ...nav, current: true };
        } else {
          return { ...nav, current: false };
        }
      })
    );
  }, [pathname]);

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} entries={navLinks} />
      <Navbar setSidebarOpen={setSidebarOpen} />
      <ContentArea {...props} />
    </>
  );
};

export default AdminLayout;
