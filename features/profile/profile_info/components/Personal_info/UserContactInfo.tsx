import { MyCard } from "components/ui/cards/MyCard";
import { InfoRow } from "components/ui/InfoRow";

interface Props {
  readonly phone: string;
  readonly email: string;
}

export const UserContactInfo = ({ phone, email }: Props) => {
  return (
    <MyCard title="Información de Contacto">
      <InfoRow label="Teléfono" value={phone} />
      <InfoRow label="Email" value={email} />
    </MyCard>
  );
};
