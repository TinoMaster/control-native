import { MyCard } from "components/ui/cards/MyCard";
import { InfoRow } from "components/ui/InfoRow";
import { AddressModel } from "models/api/address.model";

interface Props {
  readonly address: AddressModel;
}

export const UserAddressInfo = ({ address }: Props) => {
  return (
    <MyCard title="Dirección">
      <InfoRow label="Calle" value={`${address.street}, ${address.number}`} />
      <InfoRow label="Ciudad" value={address.city} />
      <InfoRow label="Provincia" value={address.municipality} />
      <InfoRow label="Código Postal" value={address.zip} />
    </MyCard>
  );
};
