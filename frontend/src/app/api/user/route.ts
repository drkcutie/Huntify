import { getUserId } from "@/app/api/route";

export async function getUser() {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("User ID is required");
  }
  const response = await fetch(
    `http://localhost:5000/api/UserModel/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
}
export async function getName() {
  const data = await getUser();
  const name = data.firstName + " " + data.lastName;
  return name;
}

export async function getFirstName() {
    const data = await getUser();
    return data.name;
}

export async function getLastName() {
    const data = await getUser();
    return data.lastName;
}
export async function getUsername() {
    const data = await getUser();
    return data.username; 
}

export async function getEmail(){
    const data = await getUser();
    return data.email;

}
