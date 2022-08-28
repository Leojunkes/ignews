import { loadStripe } from '@stripe/stripe-js';


export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.PUBLIC_STRIPE_KEY)
    return stripeJs
}