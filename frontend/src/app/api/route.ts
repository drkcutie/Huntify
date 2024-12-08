import Cookies from 'js-cookie';

interface LoginRequest {
    username: string;
    password: string;
}

function handleCookie(response: Response) {
    
    response.json().then((data) => {
        if (data.token) {
            Cookies.set('currentUser', data.token, { expires: 1 / 24 });
        }
    }, (error) => {
        console.error('Failed to parse the body', error);
    });
}

export async function loginUser(data: LoginRequest) {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
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
        handleCookie(response);
        return await response.json(); 
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
