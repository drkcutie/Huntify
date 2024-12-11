"use client";
import React from "react";
import Navbar from "@/components/large/NavBar";
import Footer from "@/components/large/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

// Define the Skill interface based on your backend model
interface Service {
  serviceId: number;
  serviceType: string;
  title: string;
  description: string;
  image: string;
}
interface Skill {
  skillId: number;
  skillName: string;
}
interface ServiceProvider {
  serviceProviderId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  skills: Skill[];
}

export default function SearchPage() {
  const [services, setService] = React.useState<Service[]>([]);
  const [skills, setSkill] = React.useState<Skill[]>([]);
  const [serviceProvider, setServiceProvider] = React.useState<
    ServiceProvider[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("recommendations");
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setKey(key + 1);
  }, [activeTab]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, skillsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/Service", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch("http://localhost:5000/api/Skill", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (!servicesResponse.ok) {
          throw new Error("Failed to fetch services");
        }

        const servicesData = await servicesResponse.json();
        const skillsData = await skillsResponse.json();
        console.log("Data Taken: " + servicesData);
        setService(servicesData);
        setSkill(skillsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.serviceType]) {
      acc[service.serviceType] = [];
    }
    acc[service.serviceType].push(service);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Lets Hunt for the Service</h1>
        <h1 className="text-4xl font-bold mb-4">You Need!</h1>
        <div className="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-green-900 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
          <div className="flex items-center justify-center fill-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Isolation_Mode"
              data-name="Isolation Mode"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
            </svg>
          </div>
          <input
            type="text"
            className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start w-screen overflow-y-auto">
        <Tabs key={key} defaultValue={activeTab} className="w-10/12">
          <h1 className="text-4xl font-bold mb-4">Categories:</h1>
          <TabsList>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            {services.map((serviceItem) => (
              <TabsTrigger
                key={serviceItem.serviceId}
                value={serviceItem.title}
              >
                {serviceItem.title.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="recommendations" className="py-10">
            {loading ? (
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : services.length > 0 ? (
              Object.keys(groupedServices).map((serviceType) => (
                <div key={serviceType} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">
                    {serviceType.toUpperCase()}
                  </h2>
                  <div className="flex flex-row flex-nowrap justify-start h-[500px] items-center gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {groupedServices[serviceType].map((service) => (
                      <div
                        key={service.serviceId}
                        className="flex flex-col justify-center  items-center w-1/4 h-[400px] p-2 snap-center"
                        onClick={() => {
                          setActiveTab(service.title);
                        }}
                      >
                        <div className="group hover:cursor-pointer w-full h-full">
                          {/* Image Section */}
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-64 object-fill mb-4 rounded-lg transition-transform duration-300 group-hover:scale-105"
                            />
                          
                          <div className="p-4 bg-background">
                            <h3 className="font-semibold text-lg">
                              {service.title.toUpperCase()}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>No services created yet</div>
            )}
          </TabsContent>
          {services.map((service) => (
            <TabsContent
              key={service.serviceId}
              value={service.title}
              className="py-10"
            >
              {/* New section for service providers */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Service Providers</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {serviceProvider.map((provider) => (
                    <div
                      key={provider.serviceProviderId}
                      className="relative group overflow-hidden rounded-lg"
                    >
                      <img
                        src="#"
                        alt={provider.name}
                        width={450}
                        height={300}
                        className="object-cover w-full aspect-[3/2] group-hover:opacity-50 transition-opacity"
                      />
                      <div className="p-4 bg-background">
                        <h3 className="font-semibold text-lg">
                          {provider.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {provider.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </>
  );
}
