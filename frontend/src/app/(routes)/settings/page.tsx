"use client";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { decode } from "@/app/api/route";

import React, { useEffect, useState } from "react";
import ProfileSettingsPage from "@/components/large/ProfileSettingsPage";
import NavbarLayout from "@/components/navbar-layout";
import { JwtPayload } from "jwt-decode";

export default function SettingsPage() {
  // State to keep track of the currently selected settings option
  const [selectedSetting, setSelectedSetting] = useState<string | null>(
    "profile",
  );
  const [isClient, setIsClient] = useState<boolean>();
  const [decoded, setDecoded] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const fetchDecoded = async () => {
      const decodedData = await decode();
      if (decodedData !== undefined) {
        setDecoded(decodedData);
      } else {
        setDecoded(null); // or handle the case where decodedData is undefined
      }
    };
    fetchDecoded();
    setIsClient(true); // Set to true after the initial render (client-side)
  }, []);

  // Handlers for each settings option
  const handleSettingClick = (setting: string) => {
    setSelectedSetting(setting);
  };
  const SettingContent = () => {
    if (!isClient) {
      return null;
    }

    if (selectedSetting === "profile") {
      return <ProfileSettings />;
    } else if (selectedSetting === "history") {
      return <HistorySettings />;
    } else if (selectedSetting === "appointments") {
      return <AppointmentSettings />;
    } else if (selectedSetting === "bookings") {
      return <BookingSettings />;
    } else {
      return <ProfileSettings />;
    }
  };
  const ProfileSettings = () => <ProfileSettingsPage />;

  const HistorySettings = () => (
    <div className="flex flex-col gap-4">
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
                className="h-20 w-20 rounded-full object-cover"
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
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
              </div>
              <button>details</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const AppointmentSettings = () => (
    <div className="flex flex-col gap-4">
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
                className="h-20 w-20 rounded-full object-cover"
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
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
              </div>
              <button>Rate</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const BookingSettings = () => (
    <div className="flex flex-col gap-4">
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
                className="h-20 w-20 rounded-full object-cover"
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
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
              </div>
              <button>Rate</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <>
      <NavbarLayout>
        <div className="flex h-auto w-full flex-row bg-white p-10">
          <section id="left" className="w-1/3 border-r-2">
            <p className="border-b-2 pl-2 text-2xl font-bold">User Settings</p>
            <div
              id="settingsOption"
              className="flex flex-col gap-5 p-10 text-xl"
            >
              <p
                className="border-2 font-bold hover:scale-105 hover:cursor-pointer"
                onClick={() => handleSettingClick("profile")}
              >
                Profile
              </p>
              <p
                className="border-2 font-bold hover:scale-105 hover:cursor-pointer"
                onClick={() => handleSettingClick("history")}
              >
                History
              </p>
              <p
                className="border-2 font-bold hover:scale-105 hover:cursor-pointer"
                onClick={() => handleSettingClick("orders")}
              >
                Orders
              </p>
              <p
                className="border-2 font-bold hover:scale-105 hover:cursor-pointer"
                onClick={() => handleSettingClick("bookings")}
              >
                Bookings
              </p>
            </div>
          </section>
          <span id="right" className="ml-20 w-2/3">
            <SettingContent />
          </span>
        </div>
      </NavbarLayout>
      <Footer />
    </>
  );
}
