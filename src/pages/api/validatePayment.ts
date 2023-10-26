import type { NextApiRequest, NextApiResponse } from "next";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
import prisma from "@/lib/prismadb";
const { HASH_IZIPAY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { clientAnswer, hash } = req.body;
        const { transactions, orderDetails } = clientAnswer;
        const answerHash = Hex.stringify(
          hmacSHA256(JSON.stringify(clientAnswer), HASH_IZIPAY as string)
        );
        if (hash === answerHash) {
          await prisma.order.update({
            where: { id: parseInt(orderDetails.orderId) },
            data: {
              checkoutUuid: transactions[0].uuid,
              orderStatus: transactions[0].status,
            },
          });
          return res.status(200).send("Valid payment");
        } else return res.status(500).send("Payment hash mismatch");
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
