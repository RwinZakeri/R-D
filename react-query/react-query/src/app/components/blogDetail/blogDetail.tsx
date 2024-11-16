import { useQuery } from "@tanstack/react-query";

const BlogDetail = ({ id }) => {
  const { data, isFetching, isLoading } = useQuery<Comment[]>({
    queryKey: ["test"],

    queryFn: async (): Promise<Comment[]> => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    },
  });
  return (
    <div>
      <h1>{data?.id}</h1>
      <h2>{data?.title}</h2>
      <h3>{data?.body}</h3>
    </div>
  );
};

export default BlogDetail;
