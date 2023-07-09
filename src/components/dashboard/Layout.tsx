import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type PropsWithChildren, useEffect, useState } from "react";
import { Home } from "lucide-react";

import Sidebar from "~/components/dashboard/Sidebar";
import ContentArea from "~/components/dashboard/ContentArea";
import Navbar from "~/components/dashboard/Navbar";

const AdminLayout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [navLinks, setNavLinks] = useState([
    {
      name: "Beranda",
      href: "/dashboard/home",
      icon: Home,
      current: false,
    },
    {
      name: "Beranda",
      href: "/dashboard/home",
      icon: Home,
      current: false,
    },
    {
      name: "Beranda",
      href: "/dashboard/home",
      icon: Home,
      current: false,
    },
  ]);

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} entries={navLinks} />
      <Navbar setSidebarOpen={setSidebarOpen} />
      <ContentArea {...props} />
    </>
  );
};

export default AdminLayout;
