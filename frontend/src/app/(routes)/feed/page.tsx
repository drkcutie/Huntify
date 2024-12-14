'use client';
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import React from "react";
import CreateAPostCard from "@/components/large/CreateAPostCard";
import NavbarLayout from "@/components/navbar-layout";
import {PostCard} from "@/components/large/PostCard";
import CameraPopup from "@/components/large/CameraPopup";

export default function FeedPage() {
    //TODO: Implement the FeedPage component, Fetch ID and POst
    return (
        <>
            <NavbarLayout>
                <div>
                </div>
                <main className="container mx-auto px-4 py-8 flex flex-col justify-center items-center">
                    {/* Section 1: Create a Post */}
                    <section className="mb12 w-3/4">
                        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
                        <div className="bg-white shadow-md rounded-lg p-5">
                            <CreateAPostCard />
                        </div>
                    </section>

                    {/* Section 2: Posts Feed */}
                    <section className=" w-3/4 mt-5 shadow">
                        <div className="flex flex-col gap-6">
                            {/* Placeholder PostCards, replace with your PostCard components */}
                            <PostCard
                                serviceProviderId={1} 
                                title="Post Title"
                                content=""
                                serviceProvider=""
                                location="Location"
                                rating={4.5}
                                image="/placeholder.svg"/>
                        </div>
                    </section>
                </main>
                <Footer/>
            </NavbarLayout>
        </>
    );
}
