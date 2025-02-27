import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {UpdatePassword } from "@/actions/doctor-profile/Update"; // Import UpdatePassword
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function Edit({id }: any) {
    // State for managing password edit dialog
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [passwordValue, setPasswordValue] = useState<string>('');

    const savePasswordValue = async () => {
        const response = await UpdatePassword(id, passwordValue);
        if (response?.success) {
            setIsPasswordDialogOpen(false);
        } else {
            console.error("Error updating password");
        }
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    return (
        <div className="flex flex-col gap-5 w-full md:w-[30vw]">
            <div>
                <h1 className="font-bold text-lg md:text-xl">Edit Profile</h1>
            </div>

            {/* Other profile fields */}

            {/* Password Update Section */}
            <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-sm md:text-md">Password</h1>
                    <button
                        onClick={() => setIsPasswordDialogOpen(true)}
                        className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Edit Password Dialog */}
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Edit Password</DialogTitle>
                     <div className="relative">
                            <Input
                              value={passwordValue}
                              onChange={(e) => setPasswordValue(e.target.value)}
                              placeholder="Enter new password"
                              type={showPassword ? "text" : "password"}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>
                    <DialogFooter>
                        <Button onClick={savePasswordValue} disabled={!passwordValue}>
                            Save
                        </Button>
                        <Button onClick={() => setIsPasswordDialogOpen(false)} variant="outline">
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
