import type { FC } from "react";
import { type Product, columns } from "./column";
import { DataTable } from "./data-table";
import { DebounceInput } from "~/components/input/debounceInput";
import { useState } from "react";
import { api } from "~/utils/api";
import { Skeleton } from "~/components/ui/skeleton";

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
  const { data, isLoading } = api.product.getAll.useQuery();
  const [search, setSearch] = useState<string>("");

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4 rounded-sm bg-white p-4">
        <DebounceInput
          withIcon
          value={search}
          onChange={(value) => setSearch(String(value))}
        />

        {isLoading ? (
          <div className="flex w-full flex-col gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default ProductLists;
