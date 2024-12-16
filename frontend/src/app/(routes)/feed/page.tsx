'use client';
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import React, {createContext, useEffect, useState} from "react";
import CreateAPostCard from "@/components/large/CreateAPostCard";
import NavbarLayout from "@/components/navbar-layout";
import {PostCard} from "@/components/large/PostCard";
import CameraPopup from "@/components/large/CameraPopup";
import {getAllPost} from "@/app/api/post/route";
import {MdDashboardCustomize} from "react-icons/md";

interface PostImage {
    postImageId: number;
    postId: number;
    postImageOrder: number;
    imagePath: string;
}
interface Post {
    postId: number;
    userId: number;
    title: string;
    location: string;
    description: string;
    user: any;
    postLikes: any[];
    postImages: PostImage[];
}

export const FeedContext = createContext('FeedContext');
export default function FeedPage() {
    //TODO: Implement the FeedPage component, Fetch ID and POst
    const [posts, setPosts] = useState([])
    const [providerService, setProviderService] = useState([])
    const [feed, setFeed] = useState(0)
    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPosts = await getAllPost();
            setPosts(fetchedPosts);
        }
        const  fetchProviderService = async () => {
            setProviderService(providerService);
        }

        fetchProviderService();
        fetchPost()
    }, [feed]);
    
    
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
                            <FeedContext.Provider value = {feed}>
                                <CreateAPostCard  />
                            </FeedContext.Provider>
                        </div>
                    </section>

                    <section className="w-3/4 my-5 shadow min-h-[500px] flex flex-col justify-center items-center">
                        <div className="flex flex-col gap-6 w-2/3 ">
                            {posts.length > 0 ? (
                                posts.map((post: Post) => (
                                    <PostCard
                                        key = {post.postId}
                                        userId = {post.userId} 
                                        postId = {post.postId} 
                                        title={post.title} 
                                        content={post.description} 
                                        serviceProvider={post.user ? post.user.name : "Unknown"} 
                                        location={post.location || "Location"} 
                                        images={post.postImages} 
                                        rating={1.5}
                                    />
                                ))
                            ) : (
                                <div className="text-center h-30 text-gray-500 mt-10">
                                    No posts available at the moment. Please check back later.
                                </div>
                            )}
                        </div>
                    </section>

                </main>
            </NavbarLayout>
        </>
    );
}
