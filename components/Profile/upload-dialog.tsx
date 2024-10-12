import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUser } from "@/app/context/userContext";

const UploadDocument = () => {
    const{id}=useUser()
  // State to store the selected files and their previews
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  // Function to handle file input change and set the image and preview states
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // Save the file to state
      setPreview(URL.createObjectURL(file)); // Generate a preview URL and save it to state
    }
  };

  const handleSubmit = async () => {
    if (!image1 || !image2) {
      alert("Please select both documents before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("document1", image1);
    formData.append("document2", image2);
    formData.append("userId", id); 

    try {
      const response = await fetch("/api/v1/patients/document-upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        alert("Documents uploaded successfully!");
      } else {
        alert("Failed to upload documents.");
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add report</DialogTitle>
          <DialogDescription>Upload your reports</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Document 1 Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Document 1</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
              className="hidden"
              id="fileInput1"
            />
            <label htmlFor="fileInput1" className="cursor-pointer">
              <Image
                src={preview1 || "/placeholder-image.png"}
                alt="Document 1 Preview"
                width={50}
                height={50}
                className="object-cover"
              />
            </label>
          </div>
          {/* Document 2 Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p>Document 2</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
              className="hidden"
              id="fileInput2"
            />
            <label htmlFor="fileInput2" className="cursor-pointer">
              <Image
                src={preview2 || "/placeholder-image.png"}
                alt="Document 2 Preview"
                width={50}
                height={50}
                className="object-cover"
              />
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocument;
