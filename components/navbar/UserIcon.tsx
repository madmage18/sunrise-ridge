import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
// updated to Image from next/image from img. Testing

async function UserIcon() {
  const user = await currentUser(); // currentUser() is async but auth() for getting userId only is not.
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <Image
        src={profileImage}
        alt="profile image"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  return <LuUser className='w-6 h-6 bg-primary rounded-full text-white'/>;
}

export default UserIcon;
