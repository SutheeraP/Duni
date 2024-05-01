import PageResult from '../pageContent/result';
import { useLocale, useTranslations } from "next-intl";

const Page = () => {
    const t = useTranslations('Resultpage');
    const n = useTranslations('Navtext');
    const lang = useLocale();
    return (
        <PageResult
        movies={t('movies')}
        results={t('results')}
        edit={t('edit')}
        seq={t('seq')}
        min={t('min')}
        logline={n('logline')}
      l1={n('l1')}
      l2={n('l2')}
      l3={n('l3')}
      l4={n('l4')}
      lang={lang}
        />
    )
}

export default Page