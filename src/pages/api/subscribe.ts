import { NextApiResponse, NextApiRequest } from 'next'
import { query as q } from 'faunadb'
import { stripe } from '../../services/stripe'
import { getSession } from 'next-auth/client'
import { fauna } from '../../services/fauna';

type User = {
    ref: {
        id: string
    }
    data: {
        stripe_customer_id: string
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        const user: User = await fauna.query(
            q.Get(
                q.Match(
                    q.Index('user_by_email',),
                    q.Casefold(session.user.email)
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        if (!customerId) {
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
            })

            await fauna.query(
                q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id,
                        }
                    }
                )
            )
            customerId = stripeCustomer.id
        }



        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1IaAraC2DsI1dPYgrqw5jOn3', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })
        return res.status(200).json({ session: stripeCheckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('MEthod not allowed')
    }
}