"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { RouterOutputs } from "~/utils/api";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  sku: string;
};

type ProductColumn = RouterOutputs["product"]["getAll"][number];

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: (info) => (
      <Avatar>
        <AvatarImage src={info.getValue() as string} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
];
