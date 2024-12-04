'use client'
import React from "react";
import {Button} from "@/components/ui/button";

interface CardProps {
    //TODO ADD ID for the Card;
    image: React.ReactNode;
    name : string;
    skills: string[];
    rating: string;
    rate: string;
    reviews_count:string;
}

export default function ProviderCard({image ,name , skills, rating, reviews_count, rate }: CardProps) {
    //TODO LIST ALL SKILLS BY FETCHING 
    //TODO FUNCTION IF CLICKED
    //

    return (
        <>
            <div
                className='
                    w-2/4 h-72  p-5 border-2 border-gray-300 rounded-2xl flex flex-row justify-between items-center 
                    hover:scale-105 hover:border-gray-500 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 
                    transition-all duration-300 ease-in-out flex-shrink-0 gap-2
                '
                tabIndex={0}
                // makes the div focusable
            >
                <i className='rounded-2xl border-2 h-full w-1/2'>{image}</i>
                <div className='flex flex-col border-2 h-full p-2 justify-between items-center w-1/2'>
                    <div id = 'skills' className= 'flex-row flex no-scrollbar w-full justify-start items-center overflow-x-auto whitespace-break-spaces gap-2 '>
                        <Button>Maintenance</Button>
                        <Button>Electricity</Button>
                        <Button>Plumbing</Button>
                        <Button>Carpentry</Button>
                        <Button>Wiring</Button>
                        
                    </div>
                    <p className='font-bold text-2xl '>{name}</p>
                    <div className='flex flex-row gap-2'>
                        <i></i>
                        <p>{rating} Rating</p>
                        <i></i>
                        <p>{reviews_count} Review</p>
                    </div>
                    <div id ='bottom_bar' className='flex flex-row justify-between w-full items-center  '>
                        <p>Starts at P{rate}/hr</p>
                        <Button>Book now</Button>
                        
                    </div>
                    
                    
                </div>
            </div>
        </>
    );
}
