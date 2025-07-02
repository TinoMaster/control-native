import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { useDebts } from "hooks/api/useDebts";
import { Text } from "react-native";

export default function AllDebts() {
  const { debts } = useDebts();

  return (
    <GradientBackground>
      <Text style={{ color: "white" }}>{debts?.length}</Text>
    </GradientBackground>
  );
}
