'use client';
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import React, {useEffect, useState} from "react";
import CreateAPostCard from "@/components/large/CreateAPostCard";
import NavbarLayout from "@/components/navbar-layout";
import {PostCard} from "@/components/large/PostCard";
import CameraPopup from "@/components/large/CameraPopup";
import {getAllPost} from "@/app/api/post/route";

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
export default function FeedPage() {
    //TODO: Implement the FeedPage component, Fetch ID and POst
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPosts = await getAllPost();
            setPosts(fetchedPosts);
        }
        fetchPost()
    }, []);
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

                    <section className="w-3/4 my-5 shadow min-h-[500px] flex flex-col justify-center items-center">
                        <div className="flex flex-col gap-6 w-full">
                            {posts.length > 0 ? (
                                posts.map((post: Post) => (
                                    <PostCard
                                        userId = {post.userId} 
                                        postId = {post.postId} // Always include a unique key for list items in React
                                        serviceProviderId={post.userId} // Assuming you want to use the userId as the serviceProviderId
                                        title={post.title} // Dynamic title from the post
                                        content={post.description} // Dynamic description or content from the post
                                        serviceProvider={post.user ? post.user.name : "Unknown"} // Assuming user data exists, otherwise use a fallback like "Unknown"
                                        location={post.location || "Location"} // You can replace this with actual location if available
                                        image={post.postImages} // Use the first image, or fallback to a placeholder
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
            <Footer/>
        </>
    );
}
