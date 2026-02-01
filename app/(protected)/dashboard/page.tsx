import { auth } from "@/auth";
import { MainCarausel } from "@/components/dashboard/carausel";
import NearbyDoctors from "@/components/dashboard/nearby-doctors";
import RecommendedDoctors from "@/components/dashboard/recommended-doctor";
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments";
import CalenderAndAppointments from "@/components/doctor-dashboard/doc-calender";
import { DocCarausel } from "@/components/doctor-dashboard/doc-Carausel";
import PatientList from "@/components/doctor-dashboard/doc-patientList";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck } from "lucide-react";

const page = async () => {
  const session = await auth();
  const id = session?.user.id || "";
  const role = session?.user.role;

  return (
    <div className="p-3 grid gap-4 grid-cols-6">
      {role && role === "USER" ? (
        <User id={id} />
      ) : role === "DOCTOR" ? (
        <Doctor id={id} />
      ) : role === "ADMIN" ? (
        <Admin id={id} />
      ) : (
        <h1>Unauthorized</h1>
      )}
    </div>
  );
};

export default page;

const User = ({ id }: any) => {
  return (
    <>
      <div className=" col-span-6 lg:col-span-4">
        <MainCarausel />
        <NearbyDoctors />
      </div>
      <UpcomingAppointments id={id} />
      <RecommendedDoctors />
    </>
  );
};

const Doctor = ({ id }: any) => {
  return (
    <>
      <div className=" col-span-6 lg:col-span-4">
        <DocCarausel />
        <PatientList />
      </div>
      <CalenderAndAppointments />
    </>
  );
};
const Admin = ({ id }: any) => {
  return (
    <>
      <div className="col-span-6 lg:col-span-4 space-y-4">
        <h2 className="text-xl font-semibold">Admin</h2>
        <Link href="/dashboard/admin/verify-doctors">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Review Documents</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Verify or reject doctor document uploads
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <CalenderAndAppointments />
    </>
  );
};
