import { useSession, signIn } from 'next-auth/client';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  function handleSubscribe() {
    if(!session){
      signIn('github')
      return;
    }
    
  }

  return (
    <button
      onClick={handleSubscribe}
      className={styles.subscribeButton}
      type="button"
    >
      Subscribe Now
    </button>
  );
}
