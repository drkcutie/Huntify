"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CreateAPostCard from "@/components/large/CreateAPostCard";
import NavbarLayout from "@/components/navbar-layout";
import { PostCard } from "@/components/large/PostCard";
import {
  getAllProviderServices,
  getAllServices,
  getAllServiceProviders,
} from "@/app/api/route";
import { getAllPost } from "@/app/api/post/route";
import {
  FeedContext,
  FeedContext as FeedContext2,
} from "@/app/(routes)/feed/feedContext";

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
  providerServiceId: number;
  description: string;
  user: any;
  postLikes: any[];
  postImages: PostImage[];
}
export interface FeedContextType {
  feed: number;
  setFeed: Dispatch<SetStateAction<number>>;
}

export default function FeedPage() {
  //TODO: Implement the FeedPage component, Fetch ID and POst
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [providerService, setProviderService] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPosts = await getAllPost();
      const fetchedProviderService = await getAllProviderServices();
      const fetchedServices = await getAllServices();
      const fetchedServiceProviders = await getAllServiceProviders();
      setPosts(fetchedPosts);
      setServices(fetchedServices);
      setServiceProviders(fetchedServiceProviders);
      setProviderService(fetchedProviderService);
    };

    fetchPost();
  }, []);
  const refreshFeed = async () => {
    const fetchedPosts = await getAllPost();
    setPosts(fetchedPosts); // Update the state with new posts
  };

  return (
    <>
      <NavbarLayout>
        <div></div>
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-8">
          {/* Section 1: Create a Post */}
          <section className="mb12 w-3/4">
            <h2 className="mb-4 text-xl font-semibold">Create a Post</h2>
            <div className="rounded-lg bg-white p-5 shadow-md">
              <CreateAPostCard onPostCreated={refreshFeed} />
            </div>
          </section>

          <section className="my-5 flex min-h-[500px] w-3/4 flex-col items-center justify-center shadow">
            <div className="flex w-2/3 flex-col gap-6">
              {posts.length > 0 ? (
                posts.map((post: Post) => (
                  <PostCard
                    key={post.postId}
                    userId={post.userId}
                    postId={post.postId}
                    title={post.title}
                    content={post.description}
                    serviceProvider={post.user ? post.user.name : "Unknown"}
                    providerServiceId={post.providerServiceId}
                    location={post.location || "Location"}
                    images={post.postImages}
                    rating={1.5}
                  />
                ))
              ) : (
                <div className="h-30 mt-10 text-center text-gray-500">
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
