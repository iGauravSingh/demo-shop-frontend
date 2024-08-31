import axios from "axios";
import { useEffect, useState } from "react";

interface ImageFormats {
  thumbnail: { url: string };
  small: { url: string };
  medium: { url: string };
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

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/articles?populate=Image')
      .then(response => {
        const posts: Post[] = response.data.data;
        setPosts(posts);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.attributes.Title}</h2>
          {post.attributes.Content.map((contentItem, index) => (
            <div key={index}>
              {contentItem.children.map((child, childIndex) => (
                <p key={childIndex}>{child.text}</p>
              ))}
            </div>
          ))}
          {post.attributes.Image?.data && (
            <img
              src={`http://localhost:1337${post.attributes.Image.data.attributes.url}`}
              alt={post.attributes.Title}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Blog;