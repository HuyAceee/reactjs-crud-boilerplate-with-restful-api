import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '~/overrides/remix';
import { SessionExpiredPath } from '~/packages/common/Auth/constants/SessionExpired';

export const useGetAvatarDropdown = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const fetcher = useFetcher();

  const items = [
    { key: '1', label: t('dashboard_layout:profile'), icon: <UserOutlined /> },
    {
      key: '2',
      label: t('dashboard_layout:logout'),
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        fetcher.submit({}, { method: 'POST', action: SessionExpiredPath });
      },
    },
  ];
  return items;
};
