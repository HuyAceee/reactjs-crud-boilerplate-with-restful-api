import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from '~/overrides/remix';
import { MenuVerticalProps } from '~/shared/ReactJS';

export const useGetNavData = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuVerticalProps<string>['items'] = useMemo(() => {
    return [
      {
        key: '/dashboard',
        icon: <HomeOutlined />,
        label: t('dashboard_layout:menu.home'),
        onClick: () => navigate('/dashboard'),
      },
      {
        key: '/branding',
        icon: <StarOutlined />,
        label: t('dashboard_layout:menu.branding'),
        onClick: () => navigate('/branding'),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentActiveKey = location.pathname;
    const parentMenuItem = items.find(item => {
      return (
        item &&
        'children' in item &&
        item.children?.some(child => 'key' in child && child.key && currentActiveKey.startsWith(child.key.toString()))
      );
    });
    setOpenKeys(parentMenuItem?.key ? [parentMenuItem.key.toString()] : []);
  }, [items, location]);

  const selectedKey = useMemo(() => {
    const secondSlashIndex = location.pathname.indexOf('/', 1);
    if (secondSlashIndex !== -1) {
      return location.pathname.substring(0, secondSlashIndex);
    } else {
      return location.pathname;
    }
  }, [location]);

  return { items, openKeys, setOpenKeys, selectedKey };
};
