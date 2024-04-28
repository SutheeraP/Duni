import Homepage from "./pageContent/home";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Homepage');
  const n = useTranslations('Navtext');
  const lang = useLocale();
  return (
    <Homepage
      minutes={t('minutes')}
      scheldule={t('schedules')}
      delall={t('delall')}
      interestText={t('interestText')}
      lang={lang}
      logline={n('logline')}
      l1={n('l1')}
      l2={n('l2')}
      l3={n('l3')}
      l4={n('l4')}
    />

  )
}
