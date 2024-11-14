import React, { useEffect, useState } from "react";
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
import { useToast } from "../ui/use-toast";
import { PlusCircle } from "lucide-react";

const UploadDocument = () => {
  const { id } = useUser();
  // State to store the selected files and their previews
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const { toast } = useToast();

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

  const [dialog,setDialog] = useState(false)
  const [data, setData] = useState<any>();

  const FetchData = async () => {
    try {
      const data = await fetch(
        `/api/v1/patients/document-upload/get?userId=${id}`,
        {
          method: "GET",
        }
      );
      const response = await data.json();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    const formData: any = new FormData();

    if (image1) {
      formData.append("document1", image1);
    }
    if (image2) {
      formData.append("document2", image2);
    }
    formData.append("userId", id);

    try {
      const response = await fetch("/api/v1/patients/document-upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status) {
        FetchData();
        toast({
          title: "Document Upload Success",
          variant: "success",
        });
        setDialog(false);
      } else {
        toast({
          title: "Failed to upload document ",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <Dialog open={dialog} onOpenChange={()=>setDialog(!dialog)}>
      <DialogTrigger asChild>
        <Button variant="outline">Check Reports</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add report</DialogTitle>
          <DialogDescription>Upload your reports</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Document 1 Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p className=" whitespace-nowrap font-semibold">Document 1</p>
            <div className="p-2 border rounded">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage1, setPreview1)}
              className="hidden"
              id="fileInput1"
            />
            <label htmlFor="fileInput1" className="cursor-pointer">
             {preview1 || data?.imageUrl1? <Image
                src={preview1 || data?.imageUrl1}
                alt="Document 1 Preview"
                width={200}
                height={100}
                className="object-cover  w-64 h-auto"
              />: <PlusCircle/>}
            </label>
            </div>
          </div>
          {/* Document 2 Upload */}
          <div className="grid grid-cols-4 items-center gap-4">
            <p className=" whitespace-nowrap font-semibold">Document 2</p>
           <div className="p-2 border rounded">
           <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setImage2, setPreview2)}
              className="hidden"
              id="fileInput2"
            />
            <label htmlFor="fileInput2" className="cursor-pointer">
             {preview2 || data?.imageUrl2?<Image
                src={preview2 || data?.imageUrl2}
                alt="Document 2 Preview"
                width={200}
                height={100}
                className="object-cover w-64 h-auto"
              />: <PlusCircle/>}
            </label>
           </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocument;
