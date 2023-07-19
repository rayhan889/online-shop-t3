import type { FC } from "react";
import { type Product, columns } from "./column";
import { DataTable } from "./data-table";
import { DebounceInput } from "~/components/input/debounceInput";
import { useState } from "react";
import { api } from "~/utils/api";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

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
  console.log(data);

  return (
    <div className="py-10 sm:container md:mx-auto">
      <div className="flex flex-col gap-4 rounded-sm bg-white p-4">
        <div className="mb-4 w-full items-center justify-between md:flex">
          <div className="mb-3 flex flex-col gap-1 md:mb-0">
            <h2 className="text-xl font-semibold text-blue-500">
              Product List
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Display all the products.
            </p>
          </div>
          <Button variant="solidBlue" href="/dashboard/products/new">
            <Plus className="mr-1 h-5 w-5" />
            Add Product
          </Button>
        </div>
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
