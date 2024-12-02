'use client'
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { MouseEventHandler } from "react";


export default function SettingsPage() {


    // const handleProfile: MouseEventHandler<HTMLDivElement> | undefined() = () =>{
    //    
    //    
    // }

    const  showProfileSettings= () =>{

        return;
    }

    const   showTransactionSettings= () =>{

        return;
    }
    const  showReviewSettings = () =>{
        
        return;
    } 
    
    
    
    return (
        <>
             <Navbar/>
            <div className='w-full h-auto bg-white flex flex-col p-10 '>
                <section id = 'left' className= 'w-1/3 border-r-2' >
                   <p className='font-bold text-2xl  pl-2 border-b-2'>User Settings</p>
                    <div id='settingsOption' className=' flex-col flex gap-5 p-10 text-xl'>
                        <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold  '
                           onClick={showProfileSettings}>Profile</p>

                        <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
                           onClick={showTransactionSettings}>Transactions</p>

                        <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
                           onClick={showReviewSettings}>Reviews</p>
                        <p className=''></p>
                        
                        



                    </div>


                </section>


                <section id='right' className=''>


                </section>


            </div> 
            <Footer/>
               
        </>
        
    )
    
    
}

