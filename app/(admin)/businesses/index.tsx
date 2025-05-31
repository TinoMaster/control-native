import { Redirect } from "expo-router";

export default function Businesses() {
  return <Redirect href={"/(admin)/businesses/my_businesses" as any} />;
}
