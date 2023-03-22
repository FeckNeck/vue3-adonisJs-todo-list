import api from "../../api";

export async function getCheck(): Promise<any> {
  return await api
    .get("/auth/check")
    .then((res) => {
      return res.data.authenticated;
    })
    .catch((error) => {
      throw error;
    });
}
