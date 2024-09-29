import { $host } from "./index";

export const sendForm = async (message) => {
  const { data } = await $host.post("api/user/send", { message });
  return data;
};
