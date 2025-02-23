import prisma from "@/lib/prismadb";

export const getAllCartByUser = async ({ userId }: { userId: string }) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true,
                brand: true,
                unitOfMeasure: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc", // Ordenar en orden descendente basado en updatedAt
          },
        },
      },
    });

    return cart?.products.length
      ? {
          success: true,
          data: cart,
        }
      : {
          success: false,
          error: "cart is empty",
        };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
export const addItemToCart = async ({
  productCode,
  userId,
}: {
  productCode: string;
  userId: string;
}) => {
  try {
    const cart = await prisma.cart.upsert({
      where: {
        userId: userId,
      },
      update: {},
      create: {
        userId: userId,
      },
    });
    const product = await prisma.product.findUnique({
      where: {
        code: productCode,
        deletedAt: null,
      },
    });
    if (!product) {
      return {
        success: false,
        error: "product not found",
      };
    }
    const cartItem = await prisma.cartItem.upsert({
      where: {
        productCode_cartId: {
          cartId: cart.id,
          productCode: productCode,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        product: {
          connect: {
            code: productCode,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
        quantity: 1,
      },
    });
    return {
      success: true,
      data: cartItem,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
