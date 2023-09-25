// pages/index.js
import Link from "next/link";
import type { InferGetStaticPropsType, NextPage } from "next";
import { client } from "libs/client";    // srcから見た絶対パスで指定
import type { Blog, Tag } from "types/blog";    // srcから見た絶対パスで指定

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: 'portforio',
  })

  return {
    props: {
      blogs: blog.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
};

const Home:React.FC<Props> = ({ blogs }) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home
