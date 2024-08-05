import { auth } from "@/auth";
import Header from "@/components/dashboard/header";
import SideNav from "@/components/home/SideNav";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userName = session?.user.name || "User";
  const role = session?.user.role || "User";

  
  return (
    <div className="flex h-screen">
      <SideNav userName={userName} role={role}/>
      <div className=" h-screen  w-[calc(100vw-256px)]">
      <Header userName={userName}/>
      <div className="w-full overflow-y-auto h-[calc(100vh-80px)]">
      {children}
      </div>
      </div>
    </div>
  );
}
