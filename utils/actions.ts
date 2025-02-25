"use server"; // added after adding createProductAction
import db from "@/utils/db";
import { Product, ProductCategory, ProductType } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { productSchema } from "./schemas";
import { auth, currentUser } from "@clerk/nextjs/server";
import { validateWithZodSchema, imageSchema } from "./schemas";
import { File } from "buffer";
import { uploadImage, deleteImage } from "./supabase";

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
  if (!product) redirect("/products");
  return product;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

// additional check to protect page (& their data) that should only be accessible to admin users. (Additional to what is in middleware)
const getAdminUser = async () => {
  const user = await getAuthUser();
  console.log(`User.id: ${user.id}`);
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchAdminProducts = async () => {
  console.log("fetchAdminProducts ran");
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;

  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {}
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: { id: productId },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);
    const file = formData.get("image") as File; // see if unkown can be removed

    // these are using helper functions which will throw toast error messages if validations do not pass.
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const validatedFile = validateWithZodSchema(imageSchema, { image: file }); // test by attempt larger than 1MB image upload
    console.log(validatedFile);
    const fullPath = await uploadImage(validatedFile.image);
    // log the result to test
    console.log(validatedFile);

    await db.product.create({
      data: {
        ...validatedFields,
        // test the image validation below
        // image: "/vercel.svg",
        image: fullPath,
        type: "product",
        productCategory: "eggs",
        clerkId: user.id,
      },
    });
    //  return { message: "product created" };
    // const name = formData.get('name') as string;
    // const company = formData.get('company') as string;
    // const type = formData.get('type') as ProductType;
    // const productCategory = formData.get('productCategory') as ProductCategory;
    // const experience = Boolean(formData.get('experience') as string);
    // const siteSpecial = Boolean(formData.get('siteSpecial') as string);
    // const shortDescription = formData.get('shortDescription') as string;
    // const price = Number(formData.get('price') as string);
    // const image = formData.get('image') as File;
    // const description = formData.get('description') as string;
    // const featured = Boolean(formData.get('featured') as string);

    // await db.product.create({
    //   data: {
    //     name,
    //     company,
    //     //temp hardcoding and then fixing select field. Must fix the select field and images
    //     // add keys to fix react console error
    //     // fix error that clerk is throwing!
    //     type: 'product',
    //     productCategory: 'eggs',
    //     experience,
    //     siteSpecial,
    //     price,
    //     image: '/images/vercel.svg',
    //     description,
    //     shortDescription,
    //     featured,
    //     clerkId: user.id,
    //   },
    // });
    // uncomment out below line to get toast for successful product creation
    // return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products"); // instead of returning a 'product created' message
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

// used in FavoriteToggleForm.tsx. prevState si coming from following in the files fn. See the bind
//  const toggleAction = toggleFavoriteAction.bind(null, {
//   productId,
//   favoriteId,
//   pathname,
// });
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from Favorites" : "Added to Favorites",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  console.log("Fetch user favorites running.");
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    //allows inclusion of other model data which we will need access to
    include: {
      product: true,
    },
  });
  return favorites;
};
