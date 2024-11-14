import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusMappingToLabels } from '../../constants/StatusMappingToLabels';
import { Branding } from '../../models/Branding';
import { SelectSingle, SelectSingleProps } from '~/shared/ReactJS';

interface Props {
  status?: Branding['status'];
  onChange?: SelectSingleProps<Branding['status']>['onChange'];
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
}

export const SelectStatus = ({ status, disabled, allowClear = true, onChange, className }: Props) => {
  const { t } = useTranslation(['common', 'branding']);

  const StatusMappingToLabels = useMemo(() => {
    return getStatusMappingToLabels(t);
  }, [t]);

  return (
    <SelectSingle
      allowClear={allowClear}
      disabled={disabled}
      className={classNames('w-full', className)}
      placeholder={t('branding:status')}
      value={status}
      onChange={onChange}
      options={[
        {
          label: StatusMappingToLabels['ACTIVE'],
          searchValue: StatusMappingToLabels['ACTIVE'],
          value: 'ACTIVE',
          rawData: undefined,
        },
        {
          label: StatusMappingToLabels['DEACTIVE'],
          searchValue: StatusMappingToLabels['DEACTIVE'],
          value: 'DEACTIVE',
          rawData: undefined,
        },
      ]}
    />
  );
};
