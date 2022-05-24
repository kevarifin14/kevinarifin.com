import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { post } from "lib/http";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res, next) => {
  try {
    const response = await post(process.env.HASURA_ENDPOINT!, req.body, {
      "x-hasura-role": "public",
    });

    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
  return next;
});

export default handler;
