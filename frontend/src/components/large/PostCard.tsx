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
import { useState } from "react";

interface PostProps {
  serviceProviderId: number;
  title: string;
  content: string;
  serviceProvider: string;
  location: string;
  rating: number;
  image: string;
}

export function PostCard({
  serviceProviderId,
  title,
  content,
  serviceProvider,
  location,
  rating,
  image,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(true);

  function handleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <Card key={serviceProviderId}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{serviceProvider[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{serviceProvider}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="mb-4 h-64 w-full rounded-md object-cover"
        />
        <p className=''>{content}</p>
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
          <MessageCircle className="mr-2 h-4 w-4 hover:animate-in " />
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
}
