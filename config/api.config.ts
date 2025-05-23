const urlBase = "http://192.168.0.25:5000/api/v1";

export const apiConfig = {
  baseUrl: urlBase,
  publicUrl: `${urlBase}/public`,
  privateUrl: `${urlBase}/private`,
  superadminUrl: `${urlBase}/superadmin`,
  ownerUrl: `${urlBase}/owner`,
  adminUrl: `${urlBase}/admin`
};
