'use client';
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";

export default function Profile() {
    return(
        <>
        <Navbar />

        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <p className="text-lg">This is the profile page.</p>
        </div>

        <Footer/>
        </>
    )
}