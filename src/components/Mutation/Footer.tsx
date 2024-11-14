import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { Popconfirm, Button, ButtonProps } from '~/shared/ReactJS';
import './styles.css';

interface Props {
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
  cancelProps?: Omit<ButtonProps, 'onClick'>;
  okProps?: Omit<ButtonProps, 'onClick'>;
  okConfirmProps?: Omit<ButtonProps, 'onClick'>;
  Left?: ReactNode;
  isLoading?: boolean;
  className?: string;
  Cancel?: (BaseButton: ReactNode) => ReactNode;
  Ok?: (BaseButton: ReactNode) => ReactNode;
  Other?: ReactNode;
}

export const MutationFooter = ({
  cancelText,
  okText,
  onCancel,
  onOk,
  cancelProps,
  okProps,
  Left,
  isLoading,
  className,
  okConfirmProps,
  Cancel = BaseButton => BaseButton,
  Ok = BaseButton => BaseButton,
  Other,
}: Props) => {
  const { t } = useTranslation(['components']);

  const cancelText_ = cancelText ?? t('components:FormMutation.cancel').toString();
  const okText_ = okText ?? t('components:FormMutation.save').toString();

  const BaseCancelButton = (
    <Button {...cancelProps} disabled={cancelProps?.disabled ?? isLoading} onClick={onCancel}>
      {cancelProps?.children ?? cancelText_}
    </Button>
  );
  const BaseOkButton = (
    <Button
      {...okProps}
      color={okProps?.color ?? 'primary'}
      loading={isLoading}
      disabled={isLoading}
      className={okProps?.className}
    >
      {okProps?.children ?? okText_}
    </Button>
  );

  return (
    <div className={classNames('FormMutation__Footer', className)}>
      <div className="FormMutation__Left">{Left}</div>
      <div className="FormMutation__Buttons">
        {Cancel(BaseCancelButton)}
        {Other}
        <Popconfirm
          okButtonProps={{ ...okConfirmProps, loading: okConfirmProps?.loading || isLoading }}
          onConfirm={onOk}
          okText={t('components:FormMutation.ok')}
          cancelText={t('components:FormMutation.cancel')}
          content={t('components:FormMutation.confirm_description')}
        >
          {Ok(BaseOkButton)}
        </Popconfirm>
      </div>
    </div>
  );
};
