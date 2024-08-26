'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";



const ShareModal = ({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) => {
    const user = useSelf();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState<UserType>('viewer'); //"creator" | "editor" | "viewer";

    const shareDocumentHandler = async () => {
        setLoading(false);


    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="gradient-blue flex h-9 gap-1 px-4" disabled={currentUserType !== 'editor'}>
                    <Image
                        src="/assets/icons/share.svg"
                        alt="share"
                        width={20}
                        height={20}
                        className="min-w-4 md:size-5"
                    />
                    <p className="mr-1 hidden sm:block">
                        Share
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
}

export default ShareModal;