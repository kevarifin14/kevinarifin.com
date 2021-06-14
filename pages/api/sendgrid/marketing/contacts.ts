import { NextApiResponse } from 'next';
import NextConnect from 'next-connect';

import SendgridClientMiddleware, { SendgridClientApiRequest } from 'middleware/SendgridClient';

const handler = NextConnect<SendgridClientApiRequest, NextApiResponse>();

handler.use(SendgridClientMiddleware);

handler.post(async (req, res, next) => {
  const { sendgridClient } = req;
  const { email } = req.body;

  sendgridClient.request({
    url: '/v3/marketing/contacts',
    method: 'PUT',
    body: { contacts: [{ email }] },
  });

  res.status(200).json({});

  return next;
});

export default handler;
