import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// In a server component
async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      return <p>Please log in</p>;
   }

   return (
      <div>
         <h1>Welcome, {session.user.name}</h1>
         <p>Email: {session.user.email}</p>
      </div>
   );
}

export default ProfilePage;
