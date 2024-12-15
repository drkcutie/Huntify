import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCamera, FaFileImage } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { GrEmoji } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import { IoCameraOutline, IoLocationOutline } from "react-icons/io5";
import { AiOutlineFileImage } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Progressbar from "@/components/ui/progressbar";
import ProgressBar from "@/components/ui/progressbar";
import { createPost } from "@/app/api/post/route";

export default function CreateAPostCard() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fadeClass, setFadeClass] = useState("opacity-0"); // Controls opacity for fade-in and fade-out
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  useEffect(() => {
    console.log(description);
  }, [description]);

  const handleAddImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true; // Allow selecting multiple images
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const newImages = Array.from(files); // Convert FileList to an array
        setImages((prevImages) => [...prevImages, ...newImages]); // Add new images to the state
      }
    };
    input.click();
  };

  useEffect(() => {
    if (!isLoading) return;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
      });
    }, 20);

    return () => clearInterval(timer);
  }, [isLoading]);

  const handleFileUpload = async () => {
    if (images == null || images.length === 0) {
      console.log("No files uploaded, proceeding without images");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => formData.append("file", file));

    try {
      const response = await fetch("/api/upload/post", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      console.log(result);

      return result; // Handle success case
    } catch (error) {
      console.error("Error during file upload:", error);
      setShowError(true);
      setFadeClass("opacity-100");
      setTimeout(() => {
        setFadeClass("opacity-0");
        setShowError(false);
      }, 3000);
    }
  };

  const handlePostContent = async () => {
    let images: string[] = [];
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Fill all the fields");
      setShowError(true);
      setFadeClass("opacity-100");
      setTimeout(() => {
        setFadeClass("opacity-0");
        setShowError(false);
      }, 3000);
      return;
    }

    const result = await handleFileUpload();
    const filenames = await result.files.map(
      (file: { path: string }) => file.path,
    );
    setImagesPath((prevImages) => [...prevImages, ...filenames]);
    const response = createPost({
      location: location,
      title: title,
      description: description,
      images: imagesPath,
    });

    if (result) {
      console.log("Post content with images:", result);
      setTitle(""); // Clear input after posting
      setDescription("");
      setImages([]); // Clear images after posting
    } else if (!result) {
      setTitle(""); // Clear input after posting
      setDescription("");
      setImages([]); // Clear images after posting
    }
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
        <section className="flex flex-col gap-2">
          <p>Title</p>
          <Input
            type="text"
            placeholder="What's on your mind?"
            className="rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </section>
        <section className="flex flex-col gap-2">
          <p>Description</p>
          <Textarea
            placeholder="Give a brief description"
            value={description}
            onInput={(e) => setDescription(e.currentTarget.value)}
            className=""
          />
        </section>

        <section className="ml-5 flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row gap-5">
            <IoCameraOutline
              className="h-5 w-5 cursor-pointer"
              onClick={handleAddImages}
            />
            <AiOutlineFileImage
              className="h-5 w-5 cursor-pointer"
              onClick={handleAddImages}
            />
            <Dialog>
              <DialogTrigger>
                <IoLocationOutline className="h-5 w-5 cursor-pointer" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-gray-700">
                    Enter Location
                  </DialogTitle>
                  <DialogDescription className="flex gap-5">
                    <Input
                      onInput={(e) => setLocation(e.currentTarget.value)}
                      placeholder="Enter Location"
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Button className="p-5" onClick={handlePostContent}>
            Post
          </Button>
        </section>

        <section id="files">
          {images.length > 0 && (
            <div className="flex w-2/3 flex-row gap-2 text-sm">
              {images.map((image, index) => (
                <p className="truncate hover:text-clip" key={index}>
                  {image.name}
                </p>
              ))}
            </div>
          )}
          {isLoading && <Progress value={progress} />}
        </section>
      </div>
    </>
  );
}
