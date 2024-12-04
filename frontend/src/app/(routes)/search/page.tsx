'use client'
import React from "react";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"


    
export default function SearchPage() {

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Search Page</h1>
                <p className="text-lg">This is the search page</p>
                <Command className="rounded-lg border shadow-md w-[400px]">
                <CommandInput placeholder="Type a command or search..." />
                </Command>
                

            </div>
            <div className="flex flex-col items-center justify-start h-screen w-screen">
                <Tabs defaultValue="recommendations" className="w-10/12">
                <TabsList>
                    <TabsTrigger value="Plumber">Plumber</TabsTrigger>
                    <TabsTrigger value="Electrical">Electrical</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations" className="py-10">
                    {/* Title: Latest Service Listing */}
                    <h2 className="text-2xl font-bold mb-4">Latest Service Listing</h2>
                    
                    {/* Carousel for Latest Services */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                        {(() => {
                        const services = Array.from({ length: 5 }, (_, i) => `Service ${i + 1}`);
                        return services.map((service, i) => (
                            <div
                            key={i}
                            className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                            <p className="font-semibold text-center">{service}</p>
                            </div>
                        ));
                        })()}
                    </div>

                    {/* Title: Recommendations */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Recommendations</h2>

                    {/* Carousel for Recommendations */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                        {(() => {
                        const recommendations = Array.from({ length: 5 }, (_, i) => `Recommendation ${i + 1}`);
                        return recommendations.map((recommendation, i) => (
                            <div
                            key={i}
                            className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                            <p className="font-semibold text-center">{recommendation}</p>
                            </div>
                        ));
                        })()}
                    </div>

                </TabsContent>
                <TabsContent value="Plumber" className="py-10">
                {/* Title: Top Rated */}
                    <h2 className="text-2xl font-bold mb-4">Top Rated</h2>

                    {/* Carousel for Top Rated */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                        <p className="font-semibold text-center">Top Rated Plumber {i + 1}</p>
                        </div>
                    ))}
                    </div>

                    {/* Title: Closest to You */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Closest to You</h2>

                    {/* Carousel for Closest to You */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                        <p className="font-semibold text-center">Closest Plumber {i + 1}</p>
                        </div>
                    ))}
                    </div>
                </TabsContent>
                <TabsContent value="Electrical" className="py-10">
                     {/* Title: Top Rated */}
                    <h2 className="text-2xl font-bold mb-4">Top Rated</h2>

                    {/* Carousel for Top Rated */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                        <p className="font-semibold text-center">Top Rated Plumber {i + 1}</p>
                        </div>
                    ))}
                    </div>

                    {/* Title: Closest to You */}
                    <h2 className="text-2xl font-bold mt-8 mb-4">Closest to You</h2>

                    {/* Carousel for Closest to You */}
                    <div className="flex flex-row flex-nowrap justify-start h-[350px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-col justify-center bg-[#FFFAF4] items-center w-[300px] h-[300px] p-2 border rounded-2xl snap-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                        <p className="font-semibold text-center">Closest Plumber {i + 1}</p>
                        </div>
                    ))}
                    </div>
                </TabsContent>
                </Tabs>
            </div>
           


            <Footer />
            
        </>

    )
}