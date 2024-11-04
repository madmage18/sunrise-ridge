import { formatCurrency } from '@/utils/format';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@prisma/client';
import Image from 'next/image';
import FavoriteToggleButton from './FavoriteToggleButton';
// group and relative class placement are key to being able to have the favorites button placed in the return outside of the <Link/> and be able to invoke the favorites logic down the line. Group is also necessary for the hover functionality.
export default function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { name, price, image, company, shortDescription } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = product.id;

        return (
          <article key={productId} className='group relative'>
            {/* List product cards linking to product pages */}
            <Link href={`/products/${productId}`}>
              <Card className='transform group-hover:shadow-xl transition-shadow duration-500'>
                <CardContent className='p-8 gap-y-4 grid md:grid-cols-3'>
                  <div className='relative h-64 md:h-48 md:w-48'>
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
                      priority
                      className='w-full rounded-md object-cover'
                    />
                  </div>

                  <div>
                    <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                    <h4 className='text-muted-foreground'>{company !== "Sunrise Ridge" && 'Sunrise Ridge and '}{company}</h4>
                    <p className=" mt-2">{shortDescription}</p>
                  </div>
                  <p className='text-muted-foreground text-lg md:ml-auto'>
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            {/* Favorites toggle */}
            <div className='absolute bottom-8 right-8 z-5'>
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

