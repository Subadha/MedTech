import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UpdateProfilePicture } from "@/actions/doctor-profile/Update";
import Image from "next/image";

export default function Edit({ profileImage,refresh, id }: any) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(profileImage || '');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const updateProfileImage = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "ypij3fxm");
        formData.append("cloud_name", "cloud-space");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/cloud-space/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        const imageUrl = data.secure_url;

        const resp = await UpdateProfilePicture(id, imageUrl);
        if (resp?.success) {
            setIsDialogOpen(false)
            refresh()
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full md:w-[30vw]">
            <div>
                <h1 className="font-bold text-lg md:text-xl">Edit Profile</h1>
            </div>
            <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image src={profileImage||''} alt="Profile Picture" width={80} height={80} className="object-cover" />
                    </div>
                    <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Change Photo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogTitle>Select Profile Image</DialogTitle>
                            <div className="flex flex-col items-center gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput">
                                    <Button asChild variant="outline">
                                        <span>Select Image</span>
                                    </Button>
                                </label>
                                {previewImage && (
                                    <div className="w-32 h-32 rounded-full overflow-hidden">
                                        <Image src={previewImage} alt="Preview Image" width={128} height={128} className="object-cover" />
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button onClick={updateProfileImage} disabled={!selectedFile}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Profile Info Section */}
                <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-4">
                    {["Your Name", "Your Email", "Your Phone Number"].map((label, index) => (
                        <div key={index} className="flex flex-col w-full">
                            <div className="flex pb-2">
                                <h1 className="text-sm md:text-md">{label}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-sm md:text-md">Sid</h1>
                                </div>
                                <div>
                                    <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KYC Section */}
                <div className="flex flex-col gap-4 border-2 rounded-lg shadow-lg p-6">
                    <div>
                        <h1 className="text-sm md:text-md font-semibold">KYC</h1>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm md:text-md">KYC Status</h1>
                            <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">View</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm md:text-md">KYC Details</h1>
                            <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
