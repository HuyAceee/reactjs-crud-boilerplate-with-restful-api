import { BellOutlined } from '@ant-design/icons';
import { isEmpty } from 'ramda';
import { UIEventHandler, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button, Dropdown, DropdownItem, Empty, Loading } from '~/shared/ReactJS';
import { humanizeTimeago } from '~/shared/Utilities';

export const Notification = () => {
  const { t } = useTranslation(['dashboard_layout', 'common']);

  const [isLoading] = useState(false);
  const [isLoadingMore] = useState(true);
  const [items] = useState([
    { id: '_1', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_2', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_3', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_4', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_5', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_6', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_7', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_8', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_9', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
    { id: '_10', content: 'Welcome to ReactJS CRUD boilerplate with Restful API', createdAt: Date.now() },
  ]);

  const handleScroll: UIEventHandler<HTMLDivElement> = event => {
    const scrollableDiv = event.currentTarget as HTMLDivElement;
    const scrollPosition = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
    const scrollHeight = scrollableDiv.scrollHeight;
    if (scrollHeight - scrollPosition <= 100) {
      console.log('Loadmore notifications');
    }
  };

  const dropdownItems: DropdownItem[] = useMemo(() => {
    if (isLoading) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-screen',
          label: (
            <div className="flex items-center justify-center py-6">
              <Loading />
            </div>
          ),
        },
      ];
    }

    if (isEmpty(items)) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-screen',
          label: (
            <div className="grid grid-cols-1 py-3 text-center">
              <Empty />
              <div>{t('common:no_data')}</div>
            </div>
          ),
        },
      ];
    }

    return items
      .map<DropdownItem>(item => ({
        key: item.id,
        className: 'w-[420px] max-w-screen',
        label: (
          <div className="grid grid-cols-1 py-3">
            <div className="font-medium">{item.content}</div>
            <div className="text-xs">{humanizeTimeago({ date: item.createdAt })}</div>
          </div>
        ),
      }))
      .concat({
        key: 'loadmore',
        disabled: true,
        hidden: !isLoadingMore,
        className: '!cursor-default w-[420px] max-w-screen',
        label: (
          <div className="flex items-center justify-center py-6">
            <Loading />
          </div>
        ),
      });
  }, [isLoading, isLoadingMore, items, t]);

  return (
    <Dropdown
      arrow={{ pointAtCenter: true }}
      footer={
        <div className="flex justify-center">
          <Button type="link">{t('dashboard_layout:mark_all_as_read')}</Button>
        </div>
      }
      menuMaxHeight="calc(100dvh - 160px)"
      onMenuScroll={handleScroll}
      items={dropdownItems}
    >
      <div className="flex size-6 cursor-pointer items-center justify-center">
        <Badge content={5}>
          <BellOutlined className="text-xl" />
        </Badge>
      </div>
    </Dropdown>
  );
};
