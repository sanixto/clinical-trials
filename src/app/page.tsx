import { redirect } from "next/navigation";
import { routeNames } from "@/constants/route-names";

export default async function HomePage() {
  redirect(routeNames.studies);
}
