import db from "@/utils/db";
import { ProductCategory, ProductType } from "@prisma/client";
import { redirect } from "next/navigation";
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({ where: { featured: true } });
  return products;
};

// if not using the where featured and are pulling all product do not need the async await function.
export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  // save arrays with enums values of ProductCategory enum & ProductTypes enum
  const validProductCategories = Object.values(
    ProductCategory
  ) as ProductCategory[];
  const validProductTypes = Object.values(ProductType) as ProductType[];

  // check if search value matches a value in the ProductCategory array
  const isValidCategory = validProductCategories.includes(
    search as ProductCategory
  );
  // check if search value matches a value in the ProductCategory array
  const isValidType = validProductTypes.includes(search as ProductType);

  // include all possible conditions for type safety
  type Condition =
    | { name: { contains: string; mode: "insensitive" } }
    | { productCategory: ProductCategory }
    | { type: ProductType };

  const conditions: Condition[] = [
    { name: { contains: search, mode: "insensitive" } },
  ];
  // check if the search term matches a valid ProductCategory value or ProductType value for more complete search results. Only check for matches if the search term is an allowed enum value
  if (isValidCategory) {
    conditions.push({ productCategory: search as ProductCategory });
  }
  if (isValidType) {
    conditions.push({ type: search as ProductType });
  }

  return db.product.findMany({
    where: {
      OR: conditions,
    },
    // specifies newest product will be first
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSiteSpecialProducts = async () => {
  const products = await db.product.findMany({ where: { siteSpecial: true } });
  // will return an array with all products marked siteSpecial
  // for use in future siteSpecial component that will highlight siteSpecial product/s
  return products;
};

// Future enhancement: add funtions to filter product page results by type(product, ticket, appointmentRequiredTicket, subscription) and to filter by productCategory(eggs, dairy, flowers,) and experiences(true, false).
// future filter component needs to update the products shown on the products page using this new function

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect('/products');
  return product;
};
