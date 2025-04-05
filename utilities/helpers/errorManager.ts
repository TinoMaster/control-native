import { IResponse } from "types/request.types";

export function handleFetchError<T>(error: any): IResponse<T> {
  let errorMessage =
    "Ah ocurrido un error inesperado, revise su conexión a internet e intente nuevamente";
  let statusCode = 500;

  if (error.message === "Failed to fetch") {
    errorMessage = "No se ha podido establecer conexión con el servidor";
    statusCode = 503;
  }

  return {
    message: errorMessage,
    status: statusCode,
    data: undefined,
  };
}
