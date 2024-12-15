import { getUserId } from "@/app/api/route";

interface Post {
  title: string;
  description: string;
  images: string[];
}

export async function createPost(postData: {
  images: string[];
  description: string;
  location: string;
  title: string;
}) {
  const userId = await getUserId();
  let postId: number;

  try {
    const response = await fetch(
      "http://localhost:5000/api/Post/CreatePostUsingDto",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          title: postData.title,
          description: postData.description,
          location : postData.location 
        }),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from backend in createPost:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    postId = data.postId;
    console.log("Created post with ID:", postId);
    await createPostImages(postId, postData.images);
  } catch (error) {
    console.error("Error creating post:", error);
  }
}

async function createPostImages(postId: number, images: string[]) {
  console.log("Inside create post images", images);
  if (images === null || images.length === 0) {
    console.log("Posted no images");
    return;
  }
  try {
    const  response = await fetch("http://localhost:5000/api/PostImage/CreatePostImages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postId,
        imagePath: images //array of image paths
        }),
    });
    if(!response.ok){
      const errorData = await response.json();
      console.log("Error from backend in createPostImages:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Created post images:", data);
  } catch (error) {
    console.log("Error creating post images", error);
  }
}

export async  function getAllPost(){
  const response = await fetch("http://localhost:5000/api/Post/GetAllPosts",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
}