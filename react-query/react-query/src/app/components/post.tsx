"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BlogDetail from "./blogDetail/blogDetail";

// Define the type of the data being fetched
interface Comment {
  id: number;
  name: string;
  body: string;
}

const Post = () => {
  // Explicitly specify the type of `data` returned by `useQuery`
  const { data, isFetching, isLoading } = useQuery<Comment[]>({
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
    gcTime: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // staleTime: 5000, // Cache stays fresh for 10 seconds
  });

  console.log(`is loading ${isLoading} .... is fetching ${isFetching}`);
  const [selectedPost, setSelectedPost] = useState();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }

  console.log(data);

  const clickHandler = (id) => {
    setSelectedPost(id);
  };

  return (
    <div>
      <ul>
        {data &&
          data?.map((item) => (
            <li key={item.id} onClick={() => clickHandler(item.id)}>
              <strong>{item.name}</strong>: {item.body}
            </li>
          ))}
      </ul>
      <hr />
      <br />
      <br />
      <br />
      <br />
      <h1>blog detail</h1>
      {selectedPost && <BlogDetail id={selectedPost} />}
    </div>
  );
};

export default Post;
