import "dotenv/config";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const baseURL: string = process.env.BASE_URL ?? "https://jsonplaceholder.typicode.com";

async function getUser(id: number): Promise<void> {
  try {
    const response = await fetch(`${baseURL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const user: User = await response.json();
    console.log(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}
