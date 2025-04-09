import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceSchema } from "models/zod/serviceSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

export default function CreateServiceScreen() {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      costs: [{ consumable: { id: 0, name: "" }, quantity: "" }],
    },
  });

  const onSubmit: SubmitHandler<ServiceSchema> = (data) => {
    console.log(data);
  };

  return <View></View>;
}
