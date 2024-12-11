'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavbarLayout from "@/components/navbar-layout";
import Footer from "@/components/large/Footer";
import {useState} from "react";
import Link from "next/link";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  coverPhoto: string;
  profilePicture: string;
}

const dummyUser: UserProfile = {
  name: "Jane Doe",
  username: "@janedoe",
  bio: "Passionate developer | Open source enthusiast | Coffee lover",
  location: "San Francisco, CA",
  website: "https://janedoe.dev",
  joinDate: "Joined September 2021",
  coverPhoto: "/placeholder.svg?height=300&width=1000",
  profilePicture: "/placeholder.svg?height=150&width=150",
};
export default function ProfilePage({
  user = dummyUser,
}: {
  user?: UserProfile;
}) {
  return (
    <>
      <NavbarLayout>
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative">
            <img
              src={user.coverPhoto}
              alt=""
              className="h-72 w-full rounded-t-lg border-2 object-cover shadow"
            />
            <Avatar className="border-1 absolute bottom-0 left-20 h-32 w-32 translate-y-1/2 transform border-white shadow-lg">
              <AvatarImage src={user.profilePicture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <Card className="mt-20 self-center rounded-t-none">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-500">{user.username}</p>
                </div>
                <Link href = "/settings"><Button>Edit Profile</Button></Link>
              </div>
              <p className="mb-4">{user.bio}</p>
              <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-500">
                {user.location && (
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {user.location}
                  </span>
                )}
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {user.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
                {user.joinDate && (
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {user.joinDate}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </NavbarLayout>
      <Footer />
    </>
  );
}
