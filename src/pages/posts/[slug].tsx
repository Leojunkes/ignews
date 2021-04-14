
import { GetServerSideProps,  } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';

import { RichText } from 'prismic-dom';
import posts from '.';
import { getPrismicClient} from '../../services/prismic';



interface PostProps {
    post:{
        slug: string;
        title: string;
        content: string;
        updateAt: string;
    }
 
}

export default function Post({post}:PostProps) {
  return(
      <>
        <Head>
            <title>{post.title}</title>
        </Head>
        <main>
            <article>
                <h1>{post.title}</h1>
            <time>{post.updateAt}</time>
            </article>
        </main>
      </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  const prismic =getPrismicClient(req);
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };
  return {
    props: { posts },
  };
};
