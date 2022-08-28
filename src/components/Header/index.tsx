import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export function Header() {
  const {asPath}=useRouter()
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          
            <a href='/' className={asPath==='/'?styles.active:''}>
              Home
            </a>
          

          
            <a href='/posts' className={asPath==='/posts'?styles.active:''}>Post</a>
          
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
