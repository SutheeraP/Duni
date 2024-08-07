import PageContent from '../pageContent/edit'
import React, { useEffect, useState } from 'react'
import { useLocale, useTranslations } from "next-intl";

const Page = () => {
    const t = useTranslations('Editpage');
    const n = useTranslations('Navtext');
    const lang = useLocale();

    return (
        <PageContent
            interestText={t('interestText')}
            titleText={t('titleText')}
            durationText={t('durationText')}
            timeText={t('timeText')}
            saveText={t('saveText')}
            delText={t('delText')}
            fb1={t('fb1')}
            fb2={t('fb2')}
            fb3={t('fb3')}
            sureText={t('sureText')}
            cancelText={t('cancelText')}
            confirmText={t('confirmText')}
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