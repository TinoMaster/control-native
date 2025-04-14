const urlBase = "http://192.168.200.172:5000/api/v1";
/* const urlBase = "http://192.168.223.99:5000/api/v1"; */

export const apiConfig = {
  baseUrl: urlBase,
  publicUrl: `${urlBase}/public`,
  privateUrl: `${urlBase}/private`,
  superadminUrl: `${urlBase}/superadmin`,
  ownerUrl: `${urlBase}/owner`,
  adminUrl: `${urlBase}/admin`,
};
