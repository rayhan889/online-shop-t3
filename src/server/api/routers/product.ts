import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return products;
  }),

  getAllCategory: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }),

  createNew: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2, { message: "Product name cannot less than 2" }),
        price: z.number().min(0, { message: "Price cannot be 0" }),
        quantity: z.number(),
        image: z.string(),
        description: z
          .string()
          .min(4, { message: "Must be 4 or more characters long" }),
        sku: z.string(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, price, quantity, image, description, sku, categoryId } =
        input;

      const category = await ctx.prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Category not found!",
        });

      const product = await ctx.prisma.product.create({
        data: {
          name,
          price,
          quantity,
          image,
          description,
          sku,
          categoryId: category?.id,
          userId: ctx?.session?.user.id,
        },
      });

      return product;
    }),
});
