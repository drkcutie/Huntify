"use server"
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";



interface LoginRequest {
    username: string;
    password: string;
}
interface ProviderService {
    serviceProviderId: number;
    serviceProvider: string;
    serviceId: number;
    service: string;
    rate: number;
    rateType: string;
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
        name: 'currentUser',
        value: data.token,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
    });
    redirect('/home');
}

export async function deleteCookie() {
    (await cookies()).delete('currentUser');
}

export async function loginUser(data: LoginRequest) {
    try {
        const response = await fetch('http://localhost:5000/api/UserModel/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to login');
        }
        const result = await response.json();
        await createCookies(result);
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Re-throw to handle it in the calling function
    }
}

export async function GET(request: Request) {
    const token = Cookies.get('token'); // Get the token from cookies
    if (!token) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }
    try {
        const userData = await fetch('http://localhost:5000/api/protected', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!userData.ok) {
            return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        return new Response(await userData.json());
    } catch (error) {
        console.error('Error during GET request:', error);
        return new Response(JSON.stringify({ message: 'Error occurred' }), { status: 500 });
    }
}

export async function registerUser(data: RegisterRequest) {
    try {
        const response = await fetch('http://localhost:5000/api/UserModel/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register user');
        }

        const result = await response.json();
        console.log(result);
        redirect('/auth/login');
        return result;
    } catch (error: any) {
        console.error('Error during registration:', error.message || error);
        throw error; // Re-throw to handle it in the calling function
    }
}

export async function PostService(data: ProviderService) {
    let rateType = 0;
    if(data.rateType == "PerOrder"){
        rateType = 1;
    }
    let experience = 0;
    if(data.yearsOfExperience == "OneToThreeYears"){
        experience = 1;
    }else if(data.yearsOfExperience == "ThreeToFiveYears"){
        experience = 2;
    }else if(data.yearsOfExperience == "MoreThanFiveYears"){
        experience = 3;
    }
    try {
        const response = await fetch('http://localhost:5000/api/ProviderService', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                providerServiceId: data.providerServiceId,
                serviceProviderId: data.serviceProviderId,
                serviceProvider: data.serviceProvider,
                serviceId: data.serviceId,
                service: data.service,
                rate: data.rate,
                rateType: rateType,
                description: data.description,
                yearsOfExperience: experience,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to post service');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting service:', error);
    }
}

