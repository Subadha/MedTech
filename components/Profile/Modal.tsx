"use client"

import {
    Dialog,
    DialogOverlay,
    DialogContent,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from 'react'

export function Modal({
    children,
}: {
    children: React.ReactNode
}) {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)
    const router = useRouter()

    const closeModal = () => {
        router.back()
    }

    const handleOpenChange = () => {
        const isUserFormModified = localStorage.getItem("userFormModified")
        if (isUserFormModified && JSON.parse(isUserFormModified)) {
            setShowExitConfirmation(true)
        } else {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden">
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}