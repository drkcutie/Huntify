'use client'

import {useState} from "react";

export default function Footer() {
    
    // TODO Set the newsletter box opacity when clicked
    const[setNewsletterBox, newsLetterBox ] = useState();
    
    return (
        <footer className="text-white w-screen flex flex-col">
            <div className="bg-green-900 p-2 w-full text-center flex items-center justify-center gap-5">
                <p className='text-2xl font-bold'>NEWSLETTER</p>
                <input type="text" className=" text-black bg-gray-300 opacity-20 w-1/3 h-12 rounded-full px-4 text-lg" placeholder=""/>
            </div>
            <div className="w-full border-2 p-10 flex flex-row items-center justify-between pr-20 pl-20">
                <div>
                    <p className='text-3xl text-black font-bold'>Huntify</p>
                    <p className='text-m text-gray-600'>Simplify your search, make informed decisions ,<br/> and get the
                        services you need with just a few clicks.</p>
                </div>

                <div>
                    <div>
                        <p className='text-2xl text-black font-bold'>Contact Info</p>
                        <p className='text-m text-gray-600'>Phone : 09123456789<br/>Email: huntify@gmail.com<br/> Location: Building 5, Philippines, Cebu</p>
                    </div>
                </div>
                {/* Content for the bottom div */}
            </div>
        </footer>
    );
}
