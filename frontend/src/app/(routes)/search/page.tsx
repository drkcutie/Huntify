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
        <h1 className="mb-4 text-4xl font-bold">Lets Hunt for the Service</h1>
        <h1 className="mb-4 text-4xl font-bold">You Need!</h1>
        <div className="group flex h-[60px] w-[60px] items-center overflow-hidden rounded-full bg-green-900 p-5 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] duration-300 hover:w-[270px] hover:duration-300">
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
            className="w-full bg-transparent px-4 text-[20px] font-normal text-white outline-none"
          />
        </div>
      </div>
      <div className="flex w-screen flex-1 flex-col items-center justify-start overflow-y-auto">
        <Tabs key={key} defaultValue={activeTab} className="w-10/12">
          <h1 className="mb-4 text-4xl font-bold">Categories:</h1>
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
                  <h2 className="mb-4 text-2xl font-bold">
                    {serviceType.toUpperCase()}
                  </h2>
                  <div className="flex h-[500px] snap-x snap-mandatory flex-row flex-nowrap items-center justify-start gap-6 overflow-x-scroll no-scrollbar">
                    {groupedServices[serviceType].map((service) => (
                      <div
                        key={service.serviceId}
                        className="flex h-[400px] w-1/4 snap-center flex-col items-center justify-center p-2"
                        onClick={() => {
                          setActiveTab(service.title);
                        }}
                      >
                        <div className="group h-full w-full hover:cursor-pointer">
                          {/* Image Section */}
                          <img
                            src={service.image}
                            alt={service.title}
                            className="mb-4 h-64 w-full rounded-lg object-fill transition-transform duration-300 group-hover:scale-105"
                          />

                          <div className="bg-background p-4">
                            <h3 className="text-lg font-semibold">
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
                <h2 className="mb-4 text-2xl font-bold">Service Providers</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                  {serviceProvider.map((provider) => (
                    <div
                      key={provider.serviceProviderId}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <img
                        src="#"
                        alt={provider.name}
                        width={450}
                        height={300}
                        className="aspect-[3/2] w-full object-cover transition-opacity group-hover:opacity-50"
                      />
                      <div className="bg-background p-4">
                        <h3 className="text-lg font-semibold">
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
