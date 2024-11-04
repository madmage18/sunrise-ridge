import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";

export default function FavoriteToggleButton({
  productId,
}: {
  productId: string;
}) {
  console.log(productId);
  return (
    <Button className='p-2 cursor-pointer' size='icon' variant='outline'>
      <FaHeart />
    </Button>
  );
}
