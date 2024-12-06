import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCamera, FaFileImage } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { GrEmoji } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineFileImage } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";

interface CreateAPostCardProps {
    id: number;
}

export default function CreateAPostCard({ id }: CreateAPostCardProps) {
    const [content, setContent] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fadeClass, setFadeClass] = useState("opacity-0"); // Controls opacity for fade-in and fade-out

    const handleAddImages = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.multiple = true; // Allow selecting multiple images
        input.onchange = (e) => {
            const files = (e.target as HTMLInputElement).files;
            if (files) {
                //TODO
            }
        };
        input.click();
    };

    const handleAddAttachment = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
        };
        input.click();
    };

    const handleAddLocation = () => {
        const location = prompt("Enter your location:");
    };

    const handleAddEmoji = () => {
        const emoji = prompt("Enter an emoji (e.g., 😊):");
    };

    const handlePostContent = () => {
        if (!content.trim()) {
            setErrorMessage("Content cannot be empty");
            setShowError(true);
            setFadeClass("opacity-100"); // Set to opacity-100 for fade-in

            // Hide the alert after 3 seconds
            const timer = setTimeout(() => {
                setFadeClass("opacity-0"); // Fade-out after 3 seconds
                setTimeout(() => {
                    setShowError(false);
                }, 500); // Wait for the fade-out animation to complete
            }, 3000);

            return;
        }
        // Todo: PostContent
        console.log(content);
        setContent(""); // Clear input after posting
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                {showError && (
                    <Alert
                        variant="destructive"
                        className={`transition-opacity duration-500 ease-in-out ${fadeClass}`}
                    >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                <section className="flex flex-row gap-2">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Input
                        type="text"
                        placeholder="What's on your mind?"
                        className="rounded-2xl"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </section>

                <section className="flex flex-row gap-2 items-center justify-between">
                    <div className="flex flex-row gap-5">
                        <IoCameraOutline
                            className="h-5 w-5 cursor-pointer"
                            onClick={handleAddImages}
                        />
                        <AiOutlineFileImage
                            className="h-5 w-5 cursor-pointer"
                            onClick={handleAddImages}
                        />
                        <CgAttachment
                            className="h-5 w-5 cursor-pointer"
                            onClick={handleAddAttachment}
                        />
                        <CiLocationOn
                            className="h-5 w-5 cursor-pointer"
                            onClick={handleAddLocation}
                        />
                        <GrEmoji className="h-5 w-5 cursor-pointer" onClick={handleAddEmoji} />
                    </div>
                    <Button className="p-5" onClick={() => handlePostContent()}>
                        Post
                    </Button>
                </section>
            </div>
        </>
    );
}
