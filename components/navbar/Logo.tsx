import Link from "next/link";
import { Button } from "../ui/button";
import { PiFarm } from "react-icons/pi";

export default function Logo() {
  return (
    <Button size="default" asChild>
      <Link href="/">
        <PiFarm className="w-6 h-6" />
      </Link>
    </Button>
  );
}
