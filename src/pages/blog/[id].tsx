// pages/blog/[id].js
import { client } from "../../libs/client";
import type { Blog } from "types/blog"
import styles from "styles/pageStyle/Home.module.scss"

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({
        endpoint: 'portforio',
      })

  const paths = data.contents.map((content:{id:string}) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context:{params:{id:string}}) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'portforio', contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

type Props = {
    blog:Blog;
}
const BlogId:React.FC<Props> = ({ blog }) => {
    return (
        <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
          className={styles.post}
        />
      </main>
    );
  }

export default BlogId