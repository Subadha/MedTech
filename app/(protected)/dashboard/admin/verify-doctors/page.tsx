"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileCheck, XCircle, Loader2, RefreshCw, Eye, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Doctor = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  doctorProfile: {
    legalName: string;
    specialization: string;
    qualification: string;
  } | null;
  doctorLicenses: {
    userId: string;
    imageUrl1: string;
    imageUrl2: string;
    registrationNumber1: string;
    registrationNumber2: string;
    documentsVerified: boolean;
  } | null;
};

function isImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(url) || url.startsWith("data:image");
}

function DocumentView({ url, label }: { url: string; label: string }) {
  const isImage = isImageUrl(url);
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {isImage ? (
        <div className="relative aspect-[4/3] w-full max-w-md rounded border bg-muted overflow-hidden">
          <Image
            src={url}
            alt={label}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
            unoptimized={url.startsWith("data:") || url.includes("cloudinary")}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Open document in new tab
          </a>
        </div>
      )}
    </div>
  );
}

export default function VerifyDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [viewDocDoctor, setViewDocDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/doctors-pending");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDoctors(data);
    } catch (e) {
      console.error(e);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleVerify = async (userId: string, documentsVerified: boolean) => {
    setUpdatingId(userId);
    try {
      const res = await fetch("/api/v1/admin/verify-doctor", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, documentsVerified }),
      });
      if (!res.ok) throw new Error("Failed to update");
      await fetchDoctors();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-end lg:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Review Documents</h1>
          <p className="text-muted-foreground mt-1">
            Doctors who have uploaded documents. Verify or reject so that only
            verified doctors appear in the consult list.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchDoctors}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {doctors.length === 0 ? (
        <div className="rounded-md border">
          <div className="py-12 text-center text-muted-foreground">
            No doctors with uploaded documents yet.
          </div>
        </div>
      ) : (
        <>
          <div className="flex mt-4 gap-4 lg:h-20 lg:flex-row flex-col items-center justify-between">
            <p className="text-sm font-bold">
              <span className="font-normal text-gray-500">Showing:</span>{" "}
              {doctors.length} doctor{doctors.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-md border mt-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 whitespace-nowrap">Doctor Name</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Email / Phone</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Specialization</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Reg. No. 1</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Reg. No. 2</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Documents</TableHead>
                  <TableHead className="px-4 whitespace-nowrap">Status</TableHead>
                  <TableHead className="px-4 whitespace-nowrap text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => {
                  const license = doctor.doctorLicenses;
                  if (!license) return null;
                  const isVerified = license.documentsVerified;
                  const isUpdating = updatingId === doctor.id;
                  const displayName =
                    doctor.name || doctor.doctorProfile?.legalName || "—";
                  const contact =
                    doctor.email || doctor.phone || "—";
                  const specialization =
                    doctor.doctorProfile?.specialization || "—";

                  return (
                    <TableRow key={doctor.id} className="hover:bg-muted/50">
                      <TableCell className="px-4 whitespace-nowrap font-medium">
                        {displayName}
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap text-muted-foreground">
                        {contact}
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap">
                        {specialization}
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap text-muted-foreground">
                        {license.registrationNumber1}
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap text-muted-foreground">
                        {license.registrationNumber2}
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap">
                        <Button
                          variant="link"
                          size="sm"
                          className="pl-0 h-auto"
                          onClick={() => setViewDocDoctor(doctor)}
                        >
                          <Eye className="h-4 w-4 mr-1.5 inline" />
                          View
                        </Button>
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap">
                        <Badge
                          variant={isVerified ? "default" : "secondary"}
                          className="shrink-0"
                        >
                          {isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!isVerified ? (
                            <Button
                              size="sm"
                              onClick={() => handleVerify(doctor.id, true)}
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <FileCheck className="h-4 w-4 mr-2" />
                                  Verify
                                </>
                              )}
                            </Button>
                          ) : null}
                          <Button
                            size="sm"
                            variant={isVerified ? "outline" : "destructive"}
                            onClick={() => handleVerify(doctor.id, false)}
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* View Documents Dialog */}
      <Dialog
        open={!!viewDocDoctor}
        onOpenChange={(open) => !open && setViewDocDoctor(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Documents —{" "}
              {viewDocDoctor?.name ||
                viewDocDoctor?.doctorProfile?.legalName ||
                "Doctor"}
            </DialogTitle>
          </DialogHeader>
          {viewDocDoctor?.doctorLicenses && (
            <div className="grid gap-6 sm:grid-cols-1">
              <DocumentView
                url={viewDocDoctor.doctorLicenses.imageUrl1}
                label={`Document 1 · Reg: ${viewDocDoctor.doctorLicenses.registrationNumber1}`}
              />
              <DocumentView
                url={viewDocDoctor.doctorLicenses.imageUrl2}
                label={`Document 2 · Reg: ${viewDocDoctor.doctorLicenses.registrationNumber2}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
