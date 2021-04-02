import {NextApiResponse, NextApiRequest} from 'next'
import { stripe } from '../../services/stripe'
export default async(req:NextApiRequest, res:NextApiResponse)=>{
    if(req.method ==='POST'){
        
    }else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('MEthod not allowed')
    }
}