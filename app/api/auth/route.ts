import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest, res: NextResponse) => {
  if (req.method === 'POST') {
    // Replace with your actual backend API endpoint for registration
    const response = await fetch('http://localhost:5000/api/auth/org/login', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Return the user data including access token
    } else {
      res.status(response.status).json(data);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
