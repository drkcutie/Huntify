'use client';
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {useEffect, useState} from "react";

export default function SettingsPage() {
  // State to keep track of the currently selected settings option
  const [selectedSetting, setSelectedSetting] = useState<string|null>("profile");
  const [isClient, setIsClient] = useState<boolean>();
  
    useEffect(() => {
        setIsClient(true); // Set to true after the initial render (client-side)
    }, []);

  // Handlers for each settings option
  const handleSettingClick = (setting : string) => {
    setSelectedSetting(setting);
  }
  const SettingContent = () => {
      if(!isClient){
          return null;
      }
      
      if (selectedSetting === 'profile') {
          return <ProfileSettings/>;
      } else if (selectedSetting === 'history') {
          return <HistorySettings/>;
      } else if (selectedSetting === 'appointments') {
          return <AppointmentSettings/>;
      } else if (selectedSetting === 'bookings') {
          return <BookingSettings/>;
      } else {
          return <ProfileSettings/>;
      }
    
  }

  // Placeholder components for each setting's content (replace with actual components or content)
  const ProfileSettings = () => 
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Profile</h2>
            
            <div className="flex items-center space-x-4">
            <img 
                src="https://via.placeholder.com/100" 
                alt="Profile Image"
                className="w-20 h-20 rounded-full object-cover"
            />
            <div>
                <h2 className="text-2xl font-bold">John Doe</h2> 
            </div>
            </div>
    
            <div>
            <h3 className="text-lg font-medium">Status & Recently</h3>
            <div className="text-gray-600"> 
                <p>Status: Active</p>
                <p>Recently: Logged in 3 hours ago</p>
            </div>
            </div>
    
            {/* About Section */}
            <div>
            <h2 className="text-xl font-bold">About</h2>
            <div className="h-2"></div> 
            <p className="text-gray-600"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
            </div>
    
            {/* Phone Details */}
            <div>
            <h3 className="text-lg font-medium">Phone</h3>
            <p className="text-gray-600"> 
                +1 123 456 7890
            </p>
            </div>
    
            {/* Email Address */}
            <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-gray-600"> 
                <a href="mailto:johndoe@example.com">johndoe@example.com</a>
            </p>
            </div>
    
            {/* Address Section */}
            <div>
            <h2 className="text-xl font-bold">Address</h2>
            <div className="h-2"></div> 
            <p className="text-gray-600"> 
                123 Main St, Anytown, USA 12345
            </p>
            </div>
    
            {/* Additional Details */}
            <div>
            <h3 className="text-lg font-medium">Additional Details</h3>
            <p className="text-gray-600"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
            </div>
    
            {/* Seeker Details Section */}
            <div>
            <h2 className="text-xl font-bold">Seeker Details</h2>
            <div className="h-2"></div> 
            
            {/* Date of Birth Details */}
            <div>
                <h3 className="text-lg font-medium">Date of Birth</h3>
                <p className="text-gray-600"> 
                January 1, 1990
                </p>
            </div>
    
            {/* National ID Details */}
            <div>
                <h3 className="text-lg font-medium">National ID</h3>
                <p className="text-gray-600"> 
                XXX-XX-1234
                </p>
            </div>
    
            {/* Job Details */}
            <div>
                <h3 className="text-lg font-medium">Job</h3>
                <p className="text-gray-600"> 
                Software Engineer at ABC Corporation
                </p>
            </div>
            </div>
        </div>    
        

  
  const HistorySettings = () => 
                <div className="flex flex-col gap-4 ">
            <h2 className="text-xl font-bold">History</h2>
            <Tabs defaultValue="bookings" className="w-[400px]">
            <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="bookings">
            <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                    <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                    </div>
                    <button>Details</button>
                </div>
                    </div>
            </TabsContent>
            <TabsContent value="appointments">
            <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                    <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                    </div>
                    <button>details</button>
                </div>
                    </div>
            </TabsContent>
            </Tabs></div>;




  const AppointmentSettings = () => 
    <div className="flex flex-col gap-4 ">
            <h2 className="text-xl font-bold">Appointments</h2>
            <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                </div>
                <button>Cancel</button>
                </div>
                    </div>
        </TabsContent>

        <TabsContent value="completed">
        <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                </div>
                <button>Rate</button>
                </div>
                    </div>
        </TabsContent>
        </Tabs></div>;


    const BookingSettings = () => 
        <div className="flex flex-col gap-4 ">
            <h2 className="text-xl font-bold">Booking</h2>
            <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                </div>
                <button>Cancel</button>
                </div>
                    </div>
        </TabsContent>

        <TabsContent value="completed">
        <div className="flex flex-row gap-4">
            <div className="flex items-center space-x-4">
                <img 
                    src="https://via.placeholder.com/100" 
                    alt="Profile Image"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-2xl font-bold">John Doe</h2> 
                </div>
                <button>Rate</button>
                </div>
                    </div>
        </TabsContent>
        </Tabs></div>;

  return (
    <>
      <Navbar />
      <div className='w-full h-auto bg-white flex flex-row p-10 '>
        <section id='left' className='w-1/3 border-r-2'>
          <p className='font-bold text-2xl  pl-2 border-b-2'>User Settings</p>
          <div id='settingsOption' className='flex-col flex gap-5 p-10 text-xl'>
            <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
               onClick={() => handleSettingClick('profile')}>Profile</p>
            <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
               onClick={() => handleSettingClick('history')}>History</p>
               <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
               onClick={() => handleSettingClick('orders')}>Orders</p>
            <p className='hover:cursor-pointer hover:scale-105 border-2  font-bold'
               onClick={() => handleSettingClick('bookings')} >Bookings</p>
          </div>
        </section>
        <section id='right' className='w-2/3 ml-20'>
          <SettingContent />
        </section>
      </div>
      
      <Footer />
    </>
  )
}