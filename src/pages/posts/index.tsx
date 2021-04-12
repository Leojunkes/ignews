import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>
              Psyonix Announces Rocket League® Sideswipe, A New Mobile Game
              Coming Later This Year
            </strong>
            <p>
              Psyonix, the San Diego video game developer that joined the Epic
              Games family in 2019, today announced Rocket League Sideswipe, a
              brand-new, standalone Rocket League game for mobile devices coming
              later this year!
            </p>
          </a>

          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>
              Psyonix Announces Rocket League® Sideswipe, A New Mobile Game
              Coming Later This Year
            </strong>
            <p>
              Psyonix, the San Diego video game developer that joined the Epic
              Games family in 2019, today announced Rocket League Sideswipe, a
              brand-new, standalone Rocket League game for mobile devices coming
              later this year!
            </p>
          </a>

          <a href="#">
            <time>12 de abril de 2021</time>
            <strong>
              Psyonix Announces Rocket League® Sideswipe, A New Mobile Game
              Coming Later This Year
            </strong>
            <p>
              Psyonix, the San Diego video game developer that joined the Epic
              Games family in 2019, today announced Rocket League Sideswipe, a
              brand-new, standalone Rocket League game for mobile devices coming
              later this year!
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ],{
      fetch: ['publication.title', 'publication.content'],
      pageSize:100,
    });


  console.log(response)
  
  return {
    props: {},
  };
};
