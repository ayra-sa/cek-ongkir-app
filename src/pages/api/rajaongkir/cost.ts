/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ResponseData = {
  message?: string;
  [key: string]: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const { origin, destination, weight, courier } = req.body;

    try {
      const response = await axios.post(
        `${BASE_URL}/cost`,
        new URLSearchParams({
          origin,
          destination,
          weight,
          courier,
        }).toString(),
        {
          headers: {
            key: API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: 'Failed to fetch cost data', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
