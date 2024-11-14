import { useTranslation } from 'react-i18next';
import { useNavigate } from '~/overrides/remix';
import { Button, Result } from '~/shared/ReactJS';

export const Page = () => {
  const { t } = useTranslation(['page500']);
  const navigate = useNavigate();

  return (
    <Result
      status="500"
      title={t('page500:title')}
      subTitle={t('page500:description')}
      extra={
        <Button onClick={() => navigate('/')} color="primary">
          {t('page500:back_to_home')}
        </Button>
      }
    />
  );
};

export default Page;
