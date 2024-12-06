import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, {useEffect, useState} from "react";
import { FaRegClock } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";


interface PostCardProps {
    postId: number; // Unique ID for the post
    userId: number; // Author's name
    role : string;
    avatarSrc: string; // Avatar image URL
    content: string; // Post content
    timestamp: string; // Time when the post was created
    imageSrc?: string; // Optional post image
}

export default function PostCard(props : PostCardProps) {
    const [showFullContent, setShowFullContent] = useState(false);

    const content =
        "It is a long established fact that a reader will be distracted by the readable content of a page " +
        "when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal " +
        "distribution of letters, as opposed to using 'Content here, content here', making it look like " +
        "readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their " +
        "default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. " +
        "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

    const charLimit = 150; // Set character limit

    const truncatedContent =
        content.length > charLimit ? content.slice(0, charLimit) + "..." : content;
    useEffect(() => {
        console.log(props.postId)
    }, []);
    return (
        <>
            <div className="border-2 rounded-xl font-sans">
                <section className="flex flex-row gap-2 items-center w-96 p-5">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p>Derrick Binangbang</p>
                        <div className="text-sm font-sans flex flex-row items-center gap-2 text-gray-600">
                            <FaRegClock />
                            <p>12 minutes ago</p>
                        </div>
                    </div>
                </section>
                <p id="content" className="p-5">
                    {showFullContent ? content : truncatedContent}
                </p>
                {content.length > charLimit && (
                    <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="text-blue-500 underline px-5 mb-2"
                    >
                        {showFullContent ? "Read Less" : "Read More"}
                    </button>
                )}
                {/*<div className="flex justify-center items-center bg-black border-2">*/}
                {/*    <Image*/}
                {/*        src="https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg"*/}
                {/*        width={1920}*/}
                {/*        height={1080}*/}
                {/*        alt="Picture of the author"*/}
                {/*    />*/}
                {/*</div>*/}
                <Carousel className="w-full ">
                <CarouselContent >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                                <Image
                                    src="https://wallpapers.com/images/hd/1920-x-1080-hd-1qq8r4pnn8cmcew4.jpg"
                                    width={1920}
                                    height={1080}
                                    alt="Picture of the author"
                                />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

                <div className="flex flex-row w-full items-center justify-between p-3 pl-20 pr-20 gap-2">
                    <Button className="w-36 h-10">Like </Button>
                    <Button className="w-36 h-10">Comments</Button>
                    <Button className="w-36 h-10">Book </Button>
                </div>
            </div>
        </>
    );
}
