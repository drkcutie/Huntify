import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MapPin, Star, MessageCircle, Heart } from 'lucide-react'

interface PostProps {
    serviceProviderId: number
    title: string
    content: string
    serviceProvider: string
    location: string
    rating: number
    image: string
}

export function PostCard({serviceProviderId,  title, content, serviceProvider  , location, rating, image }: PostProps) {
    return (
        <Card key = {serviceProviderId}>
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
                    className="w-full h-64 object-cover rounded-md mb-4"
                />
                <p>{content}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{rating.toFixed(1)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Like
                </Button>
                <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comment
                </Button>
            </CardFooter>
        </Card>
    )
}

