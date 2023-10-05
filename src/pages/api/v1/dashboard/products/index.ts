import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { name, category, disabled } = req.query;
        if (disabled) {
          const products = await prisma.product.findMany({
            where: {
              NOT: {
                deletedAt: null,
              },
            },
            include: {
              category: true,
              brand: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(400).json({ message: "products not found" });
        }
        if (name) {
          const products = await prisma.product.findMany({
            where: {
              name: {
                contains: name as string,
                mode: "insensitive",
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(400).json({ message: "products not found" });
        }
        if (category) {
          const products = await prisma.product.findMany({
            where: {
              category: {
                name: {
                  contains: category as string,
                },
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(400).json({ message: "products not found" });
        }
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null,
          },
          include: {
            category: true,
            brand: true,
          },
        });
        products.length
          ? res.status(200).json(products)
          : res.status(400).json({ message: "products not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const {
          code,
          name,
          description,
          price,
          image,
          discount,
          categoryId,
          brandId,
        }: {
          code: string;
          name: string;
          description: string;
          price: number;
          image: string;
          discount: number;
          categoryId: number;
          brandId: number;
        } = req.body;
        if (!code || !name || !description || !price || !image || !categoryId) {
          return res
            .status(400)
            .json({ message: "Todos los campos son obligatorios." });
        }
        const findProduct = await prisma.product.findUnique({
          where: { code: code },
        });
        if (findProduct)
          return res
            .status(400)
            .json({ message: "Ya existe un producto con ese código" });
        const newProduct = await prisma.product.create({
          data: {
            code,
            name,
            description,
            price,
            image,
            rating: 0,
            discount,
            categoryId,
            brandId,
          },
        });

        res.status(201).json({
          newProduct,
          message: "El producto se ha creado exitosamente",
        });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
