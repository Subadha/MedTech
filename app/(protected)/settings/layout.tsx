import { auth } from "@/auth";
import SideNav from "@/components/home/SideNav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userName = session?.user.name || "User";
  const role = session?.user.role || "User";
  return (
    <>
      <SideNav userName={userName} role={role}> {children}</SideNav>
    </>
  );
}
