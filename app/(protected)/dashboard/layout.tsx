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
    <div className="flex min-h-screen">
      <SideNav userName={userName} role={role}> {children}</SideNav>
      <div className="flex-1 h-full lg:ml-64">
        <Header userName={userName}/>
        <main className="dashboard h-[calc(100vh-80px)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
