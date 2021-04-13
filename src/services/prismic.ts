import Prismic from '@prismicio/client'


const apiEndPoint = process.env.PRISMIC_END_POINT
const accessToken = process.env.PRISMIC_ACCESS_TOKEN

export const client = Prismic.client(apiEndPoint, { accessToken })


