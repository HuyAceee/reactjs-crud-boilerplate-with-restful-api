import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { ListingSearchParams } from '../../types/ListingSearchParams';
import { lisitngUrlSearchParamsSchema } from '../../utils/listingUrlSearchParams';
import { SelectStatus } from '../SelectVariants/SelectStatus';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { useDeepCompareEffect, useIsMounted } from '~/shared/ReactJS';
import { Button, Input } from '~/shared/ReactJS';
import { FormQueryStateValues } from '~/shared/TypescriptUtilities';

export interface FormSearchNFilterValues extends FormQueryStateValues<ListingSearchParams, 'status' | 'search'> {}

interface Props {
  defaultValues: FormSearchNFilterValues;
  onReset?: () => void;
  onRefresh?: () => void;
  onChange?: (values: FormSearchNFilterValues) => void;
}

export const FormSearchNFilter = ({ onRefresh, onReset, onChange, defaultValues }: Props) => {
  const { t } = useTranslation(['branding']);
  const isMounted = useIsMounted();
  const { setValue, trigger, reset, watch } = useRemixForm<FormSearchNFilterValues>({
    defaultValues,
    resolver: zodResolver(lisitngUrlSearchParamsSchema),
  });

  const formValues = watch();

  useDeepCompareEffect(() => {
    if (isMounted) {
      onChange?.(formValues);
    }
  }, [formValues]);

  return (
    <div className="flex justify-between">
      <div className="flex flex-1 gap-2">
        <Input
          prefix={<SearchOutlined />}
          value={formValues.search}
          onChange={value => {
            setValue('search', value);
            trigger('search');
          }}
          className="!w-[240px]"
          placeholder={t('branding:search_placeholder')}
        />
        <SelectStatus className="!w-[180px]" status={formValues.status} onChange={value => setValue('status', value)} />
        <Button onClick={() => alert('Coming soon...')}>{t('branding:import_data')}</Button>
        <Button onClick={() => alert('Coming soon...')}>{t('branding:export_data')}</Button>
        <Button onClick={onRefresh} icon={<ReloadOutlined />}>
          {t('branding:refresh')}
        </Button>
      </div>

      <Button
        onClick={() => {
          reset({});
          onReset?.();
        }}
      >
        {t('branding:reset_filter')}
      </Button>
    </div>
  );
};
