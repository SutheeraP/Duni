import PageResult from '../pageContent/result';
import { useTranslations } from "next-intl";

const Page = () => {
    const t = useTranslations('Resultpage');
    const n = useTranslations('Navtext');
    return (
        <PageResult
        movies={t('movies')}
        results={t('results')}
        edit={t('edit')}
        logline={n('logline')}
      l1={n('l1')}
      l2={n('l2')}
      l3={n('l3')}
      l4={n('l4')}
        />
    )
}

export default Page