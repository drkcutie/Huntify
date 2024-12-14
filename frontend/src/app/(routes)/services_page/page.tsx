"use client";
import React from "react";
import Footer from "@/components/large/Footer";
import NavbarLayout from "@/components/navbar-layout";

export default function ServicesPage() {
  const [providerServices, setProviderServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/ProviderService",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setProviderServices(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarLayout>
        <div className="container mx-auto p-4">
          <h1 className="mb-4 text-2xl font-bold">Provider Services</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && providerServices.length === 0 && (
            <p>No services available.</p>
          )}

          {!loading && !error && providerServices.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {providerServices.map((service: any) => (
                <div
                  key={service.providerServiceId}
                  className="rounded-lg border p-4 shadow transition-shadow hover:shadow-md"
                >
                  <h2 className="text-lg font-bold">{service.service}</h2>
                  <p>{service.description}</p>
                  <p className="text-sm text-gray-600">Rate: ${service.rate}</p>
                  <p className="text-sm text-gray-600">
                    Rate Type: {service.rateType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Experience: {service.yearsOfExperience || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </NavbarLayout>
    </>
  );
}
