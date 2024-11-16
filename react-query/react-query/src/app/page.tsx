import Link from "next/link";
import BlogDetail from "./components/blogDetail/blogDetail";
import Post from "./components/post";

const Home = () => {
  return (
    <div>
      <Link href={"/blog"}>blog</Link>
      <Post />
    </div>
  );
};

export default Home;
