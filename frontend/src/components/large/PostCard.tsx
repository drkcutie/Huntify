import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageCircle, Heart } from "lucide-react";
import React, {useEffect, useState} from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {getNameUsingId} from "@/app/api/user/route";

interface PostProps {
  postId: number;
  userId: number;
  title: string;
  content: string;
  serviceProvider: string;
  location: string;
  rating: number;
  images: any;
}

export function PostCard({
  postId,
  userId,
  title,
  content,
  location,
  rating,
  images,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(true);
  const [name, setName] = useState("");
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchUser = async () => {
      const userName = await getNameUsingId(userId);
      setName(userName);
    };
    fetchUser(); // Call the async function
  }, [userId]); // Include userId as a dependency if it changes


  function handleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <Card key={postId}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        <Carousel>
          <CarouselContent key = {postId}>
            {images.length > 0 &&
                images.map((image :any) => (
                    <CarouselItem>
                    <Image
                        key={image.postImageId} // or another unique identifier from your image object
                        src={"/uploads/post/" + image.imagePath } // You should replace with the correct path
                        alt = {image.imagePath}
                        width={600}
                        height={600}
                        className="mb-4 h-64 w-full rounded-md object-cover"
                    />
                    </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="mr-1 h-7 w-7" />
          <span>{location}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Star className="mr-1 h-7 w-7 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={handleLike}>
          <Heart
            className={
              isLiked
                ? "mr-2 h-5 w-5 animate-bounce text-red-500 hover:scale-105"
                : "hover:scale:105 mr-2 h-4 w-4"
            }
          />
          Like
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="mr-2 h-4 w-4 hover:animate-in" />
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
}
