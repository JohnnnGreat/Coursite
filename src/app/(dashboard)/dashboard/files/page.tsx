import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FileDashboard from "@/components/Dashboard/Pages/Files/FDashboard";

const FilePage = async () => {
   const session = await getServerSession(authOptions);
   return <FileDashboard userId={session?.user.id} />;
};

export default FilePage;
