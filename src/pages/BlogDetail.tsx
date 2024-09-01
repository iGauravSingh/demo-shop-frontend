import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

interface ImageFormats {
  large: { url: string };
}

interface ImageData {
  id: number;
  attributes: {
    url: string;
    formats: ImageFormats;
  };
}

interface ContentChildren {
  type: string;
  text: string;
}

interface ContentItem {
  type: string;
  children: ContentChildren[];
}

interface PostAttributes {
  Title: string;
  Content: ContentItem[];
  Image?: {
    data: ImageData;
  };
}

interface Post {
  id: number;
  attributes: PostAttributes;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get(`https://strapi-blog-host-production.up.railway.app/api/articles/${id}?populate=Image`)
      .then((response) => {
        const post: Post = response.data.data;
        setPost(post);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-4 font-sans">
      {post.attributes.Image?.data && (
        <img
          src={`https://strapi-blog-host-production.up.railway.app${post.attributes.Image.data.attributes.formats.large.url}`}
          alt={post.attributes.Title}
          className="h-[250px] w-full object-contain mb-4"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.attributes.Title}</h1>
      <div className="prose">
        {post.attributes.Content.map((contentItem, index) => (
          <div key={index}>
            {contentItem.children.map((child, childIndex) => (
              <p key={childIndex}>{child.text}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
