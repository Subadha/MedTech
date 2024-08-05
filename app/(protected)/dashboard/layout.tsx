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
    </div>
  );
}
