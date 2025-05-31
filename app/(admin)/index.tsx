import { Redirect } from "expo-router";

export default function Admin() {
  return <Redirect href={"/(admin)/businesses" as any} />;
}
