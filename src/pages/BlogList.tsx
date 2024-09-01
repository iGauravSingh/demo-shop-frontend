import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface PostAttributes {
  Title: string;
}

interface Post {
  id: number;
  attributes: PostAttributes;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/articles?populate=Image")
      .then((response) => {
        const posts: Post[] = response.data.data;
        setPosts(posts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className=" mb-6">
            <Link
              to={`/blog/${post.id}`}
              className="text-slate-800 text-4xl font-semibold hover:underline"
            >
              {post.attributes.Title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
