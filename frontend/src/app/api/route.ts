"use server";
import Cookies from "js-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface LoginRequest {
  username: string;
  password: string;
}

interface PostProviderServiceDto {
  serviceProviderId: number;
  serviceId: number;
  rate: number;
  rateType: number;
  description: string;
  yearsOfExperience: string;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
  username: string;
  password: string;
  accountType: number;
}

export async function createCookies(data: any) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "currentUser",
    value: data.tokenResult.token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
  await decode(); // Decode token after setting cookie
  redirect("/home");
}

export async function deleteCookie() {
  (await cookies()).delete("currentUser");
}

export async function getCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("currentUser");
  return token ? token.value : null; // Return token value or null
}

export async function loginUser(data: LoginRequest) {
  try {
    const response = await fetch("http://localhost:5000/api/UserModel/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }
    const result = await response.json();
    await createCookies(result);
  } catch (error) {
    console.log("Error logging in:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  const token = Cookies.get("token"); // Get the token from cookies
  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const userData = await fetch("http://localhost:5000/api/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!userData.ok) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    return new Response(await userData.json());
  } catch (error) {
    console.error("Error during GET request:", error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
}

export async function registerUser(data: RegisterRequest) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/UserModel/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Send data as JSON
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    const result = await response.json();
    console.log(result);
    redirect("/auth/login");
    return result;
  } catch (error: any) {
    console.error("Error during registration:", error.message || error);
    throw error;
  }
}

export async function decode() {
  const token = await getCookie();
  console.log("Token:", token);
  if (!token) {
    console.log("No token found");
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
  }
}

export async function getUserId(): Promise<number | null> {
  try {
    const decoded = await decode();
    if (!decoded) {
      console.log("Decoded token is null");
      return null;
    }

    return decoded.id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}

export async function PostService(data: PostProviderServiceDto) {
  redirect("/services_page");
  let experience = 0;
  if (data.yearsOfExperience === "OneToThreeYears") {
    experience = 1;
  } else if (data.yearsOfExperience === "ThreeToFiveYears") {
    experience = 2;
  } else if (data.yearsOfExperience === "MoreThanFiveYears") {
    experience = 3;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/ProviderService/PostProviderServiceDto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceProviderId: data.serviceProviderId,
          serviceId: data.serviceId,
          rate: data.rate,
          rateType: data.rateType,
          description: data.description,
          yearsOfExperience: experience,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to post service");
    }
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error posting service:", error);
  }
}
export async function getAllServices() {
  const response = await fetch("http://localhost:5000/api/Service", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function getAllProviderServices() {
  const response = await fetch("http://localhost:5000/api/ProviderService", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function getAllServiceProviders() {
  const response = await fetch(
    "http://localhost:5000/api/ServiceProviderModel",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
