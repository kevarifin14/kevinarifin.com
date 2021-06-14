import sendgridClient, { Client } from '@sendgrid/client';
import { NextApiRequest } from 'next';

sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);

export interface SendgridClientApiRequest extends NextApiRequest {
  sendgridClient: Client
}

export default async function SendgridClientMiddleware(req, res, next) {
  req.sendgridClient = sendgridClient;
  return next();
}
