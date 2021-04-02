import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Leonardo' },
        { id: 2, name: 'Lorena' },
        { id: 3, name: 'Guilherme' }
    ]
    return response.json(users)
}