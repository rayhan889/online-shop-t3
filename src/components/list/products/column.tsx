"use client";

import { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  sku: string;
};

const columnHelper = createColumnHelper<Product>();

export const columns: ColumnDef<Product>[] = [
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
