import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts(){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="">
                        <time>12 de abril de 2021</time>
                        <strong>Psyonix Announces Rocket League® Sideswipe, A New Mobile Game Coming Later This Year</strong>
                        <p>Psyonix, the San Diego video game developer that joined the Epic Games family in 2019, today announced Rocket League Sideswipe, a brand-new, standalone Rocket League game for mobile devices coming later this year!</p>
                    </a>

                    <a href="">
                        <time>12 de abril de 2021</time>
                        <strong>Psyonix Announces Rocket League® Sideswipe, A New Mobile Game Coming Later This Year</strong>
                        <p>Psyonix, the San Diego video game developer that joined the Epic Games family in 2019, today announced Rocket League Sideswipe, a brand-new, standalone Rocket League game for mobile devices coming later this year!</p>
                    </a>

                    <a href="">
                        <time>12 de abril de 2021</time>
                        <strong>Psyonix Announces Rocket League® Sideswipe, A New Mobile Game Coming Later This Year</strong>
                        <p>Psyonix, the San Diego video game developer that joined the Epic Games family in 2019, today announced Rocket League Sideswipe, a brand-new, standalone Rocket League game for mobile devices coming later this year!</p>
                    </a>
                </div>
            </main>
        </>
    )
}