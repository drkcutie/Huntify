import React, { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
import { IoCameraOutline, IoLocationOutline } from "react-icons/io5";
import { AiOutlineFileImage } from "react-icons/ai";
import { createPost } from "@/app/api/post/route";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { decode } from "@/app/api/route";

// Types for better type safety
interface PostData {
  location: string;
  title: string;
  description: string;
  images: string[];
  providerServiceId: number | null;
}

interface FileUploadResult {
  files?: Array<{ path: string }>;
  error?: string;
}

export default function CreateAPostCard() {
  // State hooks with explicit typing
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [serviceProviderId, setServiceProviderId] = React.useState(1); // Replace with the actual ServiceProviderId of the current user
  const [loading, setLoading] = React.useState(true);
  const [providerServices, setProviderServices] = React.useState([]);
  const [service, setService] = React.useState([]);
  const [selectedServiceId, setSelectedServiceId] = React.useState<
    number | null
  >(null);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decoded = await decode();
        console.log("Data " + decoded);
        if (!decoded) throw new Error("Invalid token");

        setServiceProviderId(decoded.roleId);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (serviceProviderId !== 1) {
      const fetchProviderServices = async () => {
        try {
          const [ProviderServiceResponse, servicesResponse] = await Promise.all(
            [
              fetch(
                `http://localhost:5000/api/ProviderService/getProviderServiceID/${serviceProviderId}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" },
                },
              ),
              fetch("http://localhost:5000/api/Service", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
              }),
            ],
          );

          if (!ProviderServiceResponse.ok && !servicesResponse.ok) {
            throw new Error(
              `Failed to fetch: ${ProviderServiceResponse.statusText} or ${servicesResponse.statusText}`,
            );
          }

          const ProviderService = await ProviderServiceResponse.json();
          const ServiceData = await servicesResponse.json();
          setProviderServices(ProviderService);
          setService(ServiceData);
          setLoading(false);
        } catch (err: any) {
          setError(err.message || "An error occurred while fetching data");
          setLoading(false);
        }
      };

      fetchProviderServices();
    }
  }, [serviceProviderId]);

  // Reset form function
  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setLocation("");
    setImages([]);
    setImagesPath([]);
    setError(null);
  }, []);

  // Animate progress bar
  const animateProgressBar = useCallback(() => {
    setIsLoading(true);
    let timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(timer);
          setIsLoading(false);
          return prevProgress;
        }
      });
    }, 20);
  }, []);

  // Handle image selection
  const handleAddImages = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // File input change handler
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const newImages = Array.from(files);
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    },
    [],
  );
  useEffect(() => {
    console.log("The selected Service is: " + selectedServiceId);
  }, [selectedServiceId]);

  // File upload handler
  const handleFileUpload = useCallback(async (): Promise<FileUploadResult> => {
    if (!images.length) {
      return { files: [] };
    }

    const formData = new FormData();
    images.forEach((file) => formData.append("file", file));

    try {
      const response = await fetch("/api/upload/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("File upload error:", error);
      setError("Failed to upload files");
      return { error: "Upload failed" };
    }
  }, [images]);

  // Post content handler
  const handlePostContent = useCallback(async () => {
    // Validate inputs
    if (!title.trim() || !description.trim()) {
      setError(
        !title.trim()
          ? "Please fill in the title"
          : "Please fill in the description",
      );
      return;
    }
    setIsLoading(true);
    setError(null);
    animateProgressBar();

    try {
      const uploadResult = await handleFileUpload();

      if (uploadResult.error) {
        throw new Error(uploadResult.error);
      }

      const filenames = uploadResult.files?.map((file) => file.path) || [];
      setImagesPath((prevPaths) => [...prevPaths, ...filenames]);

      // Prepare post data
      const postData: PostData = {
        location,
        title,
        description,
        images: filenames,
        providerServiceId: selectedServiceId,
      };

      // Create post (assuming createPost is imported from your API route)
      await createPost(postData);

      // Reset form after successful post
      resetForm();
      setProgress(0);
    } catch (error) {
      console.error("Post creation error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    title,
    description,
    location,
    handleFileUpload,
    animateProgressBar,
    resetForm,
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
        />

        <section className="flex flex-col gap-2">
          <p>Advertise Your Service</p>
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
          ) : providerServices.length > 0 ? (
            <Select
              onValueChange={(value) => {
                console.log("Value found on change: " + value);

                if (value) {
                  const newServiceId = parseInt(value, 10);
                  setSelectedServiceId(newServiceId);
                  console.log("The selected Service is: " + newServiceId);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose The Service To Post" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-xl">Your Services</SelectLabel>
                  {providerServices.map((providerService) => {
                    const serviceData = service.find(
                      (s) => s.serviceId === providerService.serviceId,
                    );
                    return (
                      <SelectItem
                        className="text-lg"
                        key={providerService.providerServiceId}
                        value={providerService.providerServiceId}
                      >
                        {serviceData
                          ? serviceData.title.toUpperCase()
                          : "Service not found"}
                        <div className="ml-5 text-sm font-light">
                          Rate: ${providerService.rate}{" "}
                          {providerService.rateType === 0
                            ? "Per Hour"
                            : "Per Order"}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <h3>No Services To Post</h3>
          )}
        </section>

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
            onChange={(e) => setDescription(e.target.value)}
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
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter Location"
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Button
            className="p-5"
            onClick={handlePostContent}
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
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
