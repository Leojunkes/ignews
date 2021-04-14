import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Link  from 'next/link';

type Post = {
  slug: string;
  title: string;
  textSummary: string;
  updateAt: string;
};

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.textSummary}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [Prismic.Predicates.at('document.type', 'post')],
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      textSummary:
        post.data.content.find((content) => content.type === 'paragraph')
          ?.text ?? '',
      updateAt: new Date(post.first_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};
