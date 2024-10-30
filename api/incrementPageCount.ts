import { NextApiRequest, NextApiResponse } from "next";

let pageCount = 0; // Temporary storage for demonstration. Use a DB for production.

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    pageCount += 1;
    console.log("Unique Page Views:", pageCount); // Replace with a database call.
    res.status(200).json({ message: "Page count incremented", pageCount });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
