"use client";
import React from "react";
import Footer from "@/components/large/Footer";
import NavbarLayout from "@/components/navbar-layout";
import { decode } from "@/app/api/route";
import { Button } from "@/components/ui/button";
import { getRateTypeAndExperience } from "@/lib/functions";
import Link from "next/link";

interface Service {
  serviceId: number;
  serviceType: string;
  title: string;
  description: string;
  image: string;
}

export default function ServicesPage() {
  const [providerServices, setProviderServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [serviceProviderId, setServiceProviderId] = React.useState(1); // Replace with the actual ServiceProviderId of the current user
  const [service, setService] = React.useState<Service[]>([]);
  const renderServiceDetails = (service: any) => {
    const { rateType, experience } = getRateTypeAndExperience(
      service.rateType,
      service.yearsOfExperience,
    );
    return (
      <>
        <p className="text-sm text-gray-600">Rate: ${service.rate}</p>
        <p className="text-sm text-gray-600">Rate Type: {rateType}</p>
        <p className="text-sm text-gray-600">Experience: {experience}</p>
      </>
    );
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const decoded = await decode();
        console.log("Data " + decoded);
        if (!decoded) throw new Error("Invalid token");

        setServiceProviderId(decoded.id);
        const [ProviderServiceResponse, servicesResponse] = await Promise.all([
          fetch(
            `http://localhost:5000/api/ProviderService?serviceProviderId=${serviceProviderId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            },
          ),
          fetch("http://localhost:5000/api/Service", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (!ProviderServiceResponse.ok && !servicesResponse.ok) {
          throw new Error(
            `Failed to fetch: ${ProviderServiceResponse.statusText} or ${servicesResponse.statusText}`,
          );
        }

        const ProviderService = await ProviderServiceResponse.json();
        const ServiceData = await servicesResponse.json();
        setProviderServices(ProviderService);
        setService(ServiceData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceProviderId]);

  return (
    <>
      <NavbarLayout>
        <div className="container mx-auto p-4">
          <h1 className="mb-4 text-2xl font-bold">Your Services</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {providerServices.length === 0 && <p>No services available.</p>}

          {providerServices.length > 0 && (
            <div className="grid min-h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
              {providerServices.map((providerService: any) => {
                console.log(
                  "Da experience aight:" + providerService.yearsOfExperience,
                );
                console.log(
                  "also this its ratetype: " + providerService.rateType,
                );
                return (
                  <div
                    key={providerService.providerServiceId}
                    className="rounded-lg border p-4 shadow transition-shadow hover:shadow-md"
                  >
                    <h2 className="text-lg font-bold">
                      {service
                        .find(
                          (s: Service) =>
                            s.serviceId === providerService.serviceId,
                        )
                        .title.toUpperCase()}
                    </h2>
                    <p>{providerService.description}</p>
                    {renderServiceDetails(providerService)}
                    <Button asChild>
                      <Link href="/feed">Post</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </NavbarLayout>
    </>
  );
}
