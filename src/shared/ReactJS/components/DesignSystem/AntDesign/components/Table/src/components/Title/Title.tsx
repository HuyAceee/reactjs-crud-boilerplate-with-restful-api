import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Button } from '../../../../Button';
import { Checkbox } from '../../../../Checkbox';
import { Popover } from '../../../../Popover';
import { IdOfAntTableIndexColumn } from '../../constants/IdOfAntTableIndexColumn';
import { AntColumnProp } from '../../types/AntColumnProp';
import { Cog } from './icons/Cog';
import './styles.css';
import { Refresh } from './icons/Refresh';

interface Props {
  columns: AntColumnProp;
  defaultVisibleColumns: string[];
  visibleColumns: string[];
  setVisibleColumns: Dispatch<SetStateAction<string[]>>;
  title: ReactNode;
  Left: ReactNode;
}

export const Title: FC<Props> = ({
  columns,
  visibleColumns,
  setVisibleColumns,
  defaultVisibleColumns,
  title,
  Left,
}) => {
  const renderContent = (): ReactNode => {
    return (
      <div className="AntTableTitle__settingsViewContent">
        <div className="AntTableTitle__settingsViewContentHeader">
          <div>{title}</div>
          <Button size="small" icon={<Refresh />} onClick={() => setVisibleColumns(defaultVisibleColumns)} />
        </div>
        <div className="AntTableTitle__listColumns">
          {columns.map(column => {
            if (column.uid === IdOfAntTableIndexColumn) {
              return null;
            }
            return (
              <div key={column.uid}>
                <Checkbox
                  onChange={checked => {
                    const nextState = checked
                      ? visibleColumns.concat(column.uid)
                      : visibleColumns.filter(item => item !== column.uid);
                    setVisibleColumns(nextState);
                  }}
                  checked={visibleColumns.includes(column.uid)}
                  valueVariant="controlled-state"
                >
                  {column.title}
                </Checkbox>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="AntTableTitle__container">
      <div>{Left}</div>
      <Popover
        overlayClassName="AntTableTitle__popover"
        placement="topRight"
        content={renderContent()}
        trigger={['click']}
      >
        <div className="AntTableTitle__settingsViewTrigger">
          <Cog />
        </div>
      </Popover>
    </div>
  );
};
