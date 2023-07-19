"use client";

import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { type RouterInputs, api } from "~/utils/api";
import toast from "react-hot-toast";

type NewProduct = RouterInputs["product"]["createNew"];

export const redAsterisk = <span className="ml-1 text-red-600">*</span>;

export function NewProductForm() {
  const { data: productCategory } = api.product.getAllCategory.useQuery();

  const { mutate } = api.product.createNew.useMutation();

  const form = useForm<NewProduct>({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      image: "",
      description: "",
      sku: "",
      categoryId: "",
    },
  });

  const ctx = api.useContext();

  const onSubmit: SubmitHandler<NewProduct> = (values) => {
    mutate(
      {
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        image: values.image,
        sku: values.sku,
        categoryId: values.categoryId,
        description: values.description,
      },
      {
        onSuccess: () => {
          // clear up
          form.reset();
          form.resetField("name");
          form.resetField("price");
          form.resetField("quantity");
          form.resetField("sku");
          form.resetField("description");
          // refresh data
          void ctx.product.getAll.invalidate();
          toast.success("Successfully create product!");
        },
        onError: (e) => {
          const errorMsg = e?.data?.zodError?.fieldErrors?.name;
          if (errorMsg && errorMsg[0]) {
            toast.error(errorMsg[0]);
          } else {
            toast.error("Error while create product!");
          }
        },
      }
    );
  };

  return (
    <div className="py-10 sm:container md:mx-auto">
      <div className="overflow-hidden rounded-lg bg-white p-4 shadow-sm outline outline-1 outline-slate-200">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-500">New Product</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Fill the form below to create new product.
          </p>
        </div>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name {redAsterisk}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Guitar Accoustic"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full md:flex md:gap-x-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price {redAsterisk}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Quantity {redAsterisk}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full md:flex md:gap-x-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>SKU {redAsterisk}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input the SKU"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category {redAsterisk}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Product Category</SelectLabel>
                            {productCategory?.map((cat, catId) => (
                              <SelectItem key={catId} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image {redAsterisk}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the product"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end gap-x-4">
              <Button type="submit" variant="ghost" className="rounded-md">
                Clear
              </Button>
              <Button
                type="submit"
                variant="outlineBlue"
                className="rounded-md"
              >
                Create New
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
