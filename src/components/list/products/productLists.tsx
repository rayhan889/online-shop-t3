import type { FC } from "react";
import { type Product, columns } from "./column";
import { DataTable } from "./data-table";

interface ProductListsProps {
  isPaginated?: boolean;
}

export const Products: Product[] = [
  {
    id: "e1",
    name: "Macbook Pro M1",
    price: 12000000,
    quantity: 10,
    image: "https://unsplash.com/photos/fhmRqhD_dYg",
    description: "Lorem ipsum description",
    sku: "01293012903",
  },
  {
    id: "e2",
    name: "Macbook Pro M1",
    price: 12000000,
    quantity: 10,
    image: "https://unsplash.com/photos/fhmRqhD_dYg",
    description: "Lorem ipsum description",
    sku: "01293012903",
  },
];

const ProductLists: FC<ProductListsProps> = ({}) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={Products} />
    </div>
  );
};

export default ProductLists;
