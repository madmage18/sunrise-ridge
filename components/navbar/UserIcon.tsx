import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";

async function UserIcon() {
  const user = await currentUser(); // currentUser() is async but auth() for getting userId only is not.
  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt="profile image"
        className="w-6 h-6 rounded-full object-cover"
      />
    );
  }

  return <LuUser className='w-6 h-6 bg-primary rounded-full text-white'/>;
}

export default UserIcon;
