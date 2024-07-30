// pages/api/upload.js

import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { NextApiRequest,NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Retrieve the file from the request
      const file = req.body.file; // Assume the file is sent as a buffer or base64 string

      // Create a FormData instance
      const form = new FormData();
      form.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });

      // Send the file to the external API
      const response = await fetch('http://23.20.122.223:8000/genSceneGraph/', {
        method: 'POST',
        body: form,
        headers: {
          ...form.getHeaders(),
          accept: 'application/json'
        }
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get the response data
      const responseData = await response.json();

      // Send response back to the client
      res
        .status(200)
        .json({
          message: 'File uploaded and sent successfully',
          response: responseData
        });
    } catch (error:any) {
      console.error(error);
      res
        .status(500)
        .json({
          message: 'File upload or sending failed',
          error: error.message
        });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
