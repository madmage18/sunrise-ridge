// searchParams is a special prop we have access to in the server components
// Example: URL: localhost:3000/products?search=ava&random=name THE searchParams value would be: {search: 'ava', random: 'name'}
import ProductsContainer from "@/components/products/ProductsContainer";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';

  return <ProductsContainer layout={layout} search={search}/>;
}
