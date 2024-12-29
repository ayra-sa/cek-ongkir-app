/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type ResponseData = {
  message?: string;
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/province`, {
      headers: { key: API_KEY }
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
}
