import { PlusOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';
import { FC, ReactNode } from 'react';
import { Button } from '~/shared/ReactJS';

export interface HeaderListingProps {
  title: ReactNode;
  exportBtn: ReactNode;
  importBtn: ReactNode;
  createBtn: ReactNode;
  creatable?: boolean;
  exportable?: boolean;
  importable?: boolean;
  onExport?: () => void;
  onImport?: () => void;
  onCreate?: () => void;
  isExporting?: boolean;
}

export const HeaderListing: FC<HeaderListingProps> = ({
  title,
  exportBtn,
  exportable = true,
  importBtn,
  importable = true,
  createBtn,
  creatable = true,
  onCreate,
  onExport,
  onImport,
  isExporting,
}) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-1">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="flex items-center gap-2">
        {exportable && (
          <Button loading={isExporting} onClick={onExport} icon={<ExportOutlined />}>
            {exportBtn}
          </Button>
        )}
        {importable && (
          <Button onClick={onImport} className="hidden sm:flex" icon={<ImportOutlined />}>
            {importBtn}
          </Button>
        )}
        {creatable && (
          <Button onClick={onCreate} icon={<PlusOutlined />} color="primary">
            {createBtn}
          </Button>
        )}
      </div>
    </div>
  );
};
