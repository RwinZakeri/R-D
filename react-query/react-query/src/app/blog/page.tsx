"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// Define the type of the data being fetched
interface Comment {
  id: number;
  name: string;
  body: string;
}

const Blogs = () => {
  // Explicitly specify the type for `useQuery`
  const { data, isFetching, isLoading, isError, error } = useQuery<Comment[]>({
    queryKey: ["post"],
    queryFn: async (): Promise<Comment[]> => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1/comments"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div>
      <Link href="/">Home</Link>

      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
