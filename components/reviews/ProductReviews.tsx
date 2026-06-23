import { fetchProductReviews } from "@/utils/actions";

import ReviewCard from "./ReviewCard";
import SectionTitle from "../global/SectionTitle";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          // below object prop for individual review cards
          const reviewInfo = {
            comment,
            rating,
            // image is prop as Review card is reused. Different images used for dif use cases
            image: authorImageUrl,
            name: authorName,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
        
      </div>
    </div>
  );
}

export default ProductReviews;
