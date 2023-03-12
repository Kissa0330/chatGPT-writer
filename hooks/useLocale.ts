import en from "../locale/en.json";
import ja from "../locale/ja.json";
import { useRouter } from "next/router";

export const useLocale = () => {
  const { locale } = useRouter();

  const t = locale === "ja" ? ja : en;

  return { locale, t };
};