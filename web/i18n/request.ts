import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../actions/core/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});
