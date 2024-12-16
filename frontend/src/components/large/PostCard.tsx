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
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getNameUsingId } from "@/app/api/user/route";
import { FaBookmark, FaCartPlus, FaRegBookmark, FaStar } from "react-icons/fa";
import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { MdOutbond, MdOutlineShoppingCart } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

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
  const [isLiked, setIsLiked] = useState(false);
  const [name, setName] = useState("Derrick Binangbang");
  const [avatar, setAvatar] = useState("");
  function handleLike() {
    setIsLiked(!isLiked);
  }

  function handleService() {
   //TODO FETCH PROVIDERSERVICE ID OR SOMETHING 
  }

  return (
    <Card key={postId}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='w-full p-0 '>
        <p className="mb-5 ml-5">{content}</p>
        {images.length > 0 && (
          <Carousel className="w-full h-full bg-black justify-center items-center">
            <CarouselContent  key={postId}>
              {images.length > 0 &&
                images.map((image: any) => (
                  <CarouselItem className=" flex items-center justify-center" key={`carousel-item-${image.postImageId}`}>
                    <Image
                      key={image.postImageId} // or another unique identifier from your image object
                      src={"/uploads/post/" + image.imagePath} // You should replace with the correct path
                      alt={image.imagePath}
                      width={1080}
                      height={1080}
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14 opacity-70" />
            <CarouselNext className="mr-14 opacity-70" />
          </Carousel>
        )}
        <div className="flex w-full flex-row gap-5 p-2">
          <div className="flex w-1/3 cursor-pointer items-center justify-center gap-5 rounded-2xl p-5 font-bold shadow transition-all duration-300 hover:scale-105">
            <FaStar />
            <p className="font-normal">{rating}</p>
          </div>
          <div className="flex w-2/3 cursor-pointer items-center justify-center gap-4 rounded-2xl p-5 font-bold shadow transition-all duration-300 hover:scale-105">
            <FaLocationDot />
            <p className="font-normal">{location}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start gap-2">
        <div className="flex justify-start space-x-4">
          <Heart
              className={`h-7 w-7 cursor-pointer ${
                  isLiked
                      ? "text-red-500"
                      : "transition-all duration-300 hover:scale-110"
              }`}
              onClick={handleLike}
          />
          <MdOutlineShoppingCart
              className="h-7 w-7 cursor-pointer transition-all duration-300 hover:scale-110"
              onClick={handleService}
          />
          <MessageCircle className="h-7 w-7 cursor-pointer transition-all duration-300 hover:scale-110" />
        </div>
        <div className='flex flex-row  gap-1'>
          <p className='text-sm'> {10}</p>
          <p className='text-sm'>likes</p>
        </div>
      </CardFooter>
    </Card>
  );
}
