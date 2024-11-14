import { PaginationProps as AntPaginationProps, Table as AntTable, TableProps as AntTableProps } from 'antd';
import classNames from 'classnames';
import { Key, ReactNode, useEffect, useMemo, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useInitializeContext } from '../../../base';
import { Checkbox } from '../../Checkbox';
import { SortIcon } from './components/SortIcon/SortIcon';
import './styles.css';
import { StickyAction } from './components/StickyAction/StickyAction';
import { Title } from './components/Title/Title';
import { IdOfAntTableIndexColumn } from './constants/IdOfAntTableIndexColumn';
import { AntColumnProp } from './types/AntColumnProp';
import { ColumnType } from './types/ColumnType';
import { SortOrder, SortValues } from './types/Sorter';
import { isRecordSelected } from './utils/isRecordSelected';
import { AnyRecord } from '~/shared/TypescriptUtilities';
import { pluralize, toArray } from '~/shared/Utilities';

export interface Props<RecordType extends AnyRecord, ActionKey extends string = string>
  extends Pick<
    AntTableProps<RecordType>,
    'className' | 'dataSource' | 'expandable' | 'direction' | 'indentSize' | 'loading' | 'size' | 'tableLayout'
  > {
  /** The current page number.  */
  currentPage: number | undefined;
  /** The number of items to display per page. */
  pageSize: number;
  /** The total number of records in the data source. */
  totalRecords: number | undefined;
  /** Function to generate a plural label for the total count, based on the visible range. */
  plural?: (params: { from: number; to: number }) => string;
  /** Function to generate a singular label for the total count, based on the visible range. */
  singular?: (params: { from: number; to: number }) => string;
  /** The pagination mode. Defaults to 'sticky'. */
  paginationMode?: 'sticky' | 'none';
  /** An array of columns to be displayed in the table. */
  columns?: ColumnType<RecordType, ActionKey>[];
  /** Whether to disable pagination entirely. */
  nonePagination?: boolean;
  /** Whether to display a size changer in the pagination controls. */
  showSizeChanger?: boolean;
  /** Custom CSS class for the pagination controls. */
  paginationClassName?: string;
  /** Locale settings for the pagination controls. */
  locale?: AntPaginationProps['locale'];
  /** Options for the number of items per page in the size changer dropdown. */
  sizeChangerOptions?: number[];
  /** Callback function triggered when the page or pageSize changes. */
  onPaginationChange?: (params: { page: number; pageSize: number }) => void;
  /** Callback function triggered when the sort values change. */
  onSortChange?: (sortValues: SortValues<ActionKey>) => void;
  /** Function to render a custom sort icon based on the current sort order. */
  sortIcon?: (order: SortOrder) => ReactNode;
  /** Current sort values for the columns. */
  sortValues?: SortValues<ActionKey>;
  /** Offset value for the sticky header, in pixels. */
  offsetHeader?: number;
  /** Fixed height for the table in pixels, used to make the table scrollable. */
  tableHeight?: number;
  /** Automatically add row indices as the first column of the table. Defaults to false. */
  autoIndex?: boolean;
  /** Function to render a custom sticky action element, based on the selected rows. */
  renderStickyAction?: (params: { selectedRows: RecordType[]; clear: () => void }) => ReactNode;
  /** Function to generate a unique key for each row in the table. */
  rowKey: (record: RecordType) => Key;
  /** Mode for handling row selection when paginating. Defaults to 'autoClear'. */
  checkMode?: 'autoClear' | 'keepPagination';
  /** The title to be displayed above the table. */
  title?: ReactNode;
  /** Configuration for enabling and customizing the display of columns. */
  displayColumnsConfigable?: {
    enable: true;
    texts: {
      title: ReactNode;
    };
  };
}

/**
 * Table component extends the functionality of the Ant Design Table component.
 * It ensures that all props are type-checked more rigorously compared to the standard Ant Design Table component.
 *
 * @template RecordType - The type of the data record.
 * @template ActionKey - The type of keys for actions, defaults to string.
 *
 * @param {string} [className] - Custom CSS class for the table.
 * @param {Array<RecordType>} [dataSource] - Data source array for the table.
 * @param {Object} [expandable] - Configuration for expandable rows.
 * @param {('ltr' | 'rtl')} [direction] - Table layout direction ('ltr' or 'rtl').
 * @param {number} [indentSize] - Size of the indent for tree data.
 * @param {boolean} [loading] - Whether the table is in a loading state.
 * @param {string | Function} [rowKey] - Unique key for each row.
 * @param {('small' | 'middle' | 'large')} [size] - Size of the table.
 * @param {number} [currentPage=1] - The current page number.
 * @param {number} pageSize - The number of items per page.
 * @param {number} [totalRecords=0] - The total number of records in the data source.
 * @param {Function} [plural] - Function to generate a plural label for the total count, based on the visible range.
 * @param {Function} [singular] - Function to generate a singular label for the total count, based on the visible range.
 * @param {('sticky' | 'none')} [paginationMode='sticky'] - The pagination mode.
 * @param {Array} [columns=[]] - An array of columns to be displayed in the table.
 * @param {boolean} [nonePagination=false] - Whether to disable pagination entirely.
 * @param {boolean} [showSizeChanger=false] - Whether to display a size changer dropdown in the pagination controls.
 * @param {string} [paginationClassName] - Custom CSS class for the pagination controls.
 * @param {Object} [locale] - Locale settings for the pagination controls.
 * @param {Array} [sizeChangerOptions=[]] - Options for the number of items per page in the size changer dropdown.
 * @param {Function} [onPaginationChange] - Callback function triggered when the page or pageSize changes.
 * @param {Function} [onSortChange] - Callback function triggered when the sort values change.
 * @param {Function} [sortIcon] - Function to render a custom sort icon based on the current sort order.
 * @param {Object} [sortValues] - Current sort values for the columns.
 * @param {number} [offsetHeader] - Offset value for the sticky header, in pixels.
 * @param {number} [tableHeight] - Fixed height for the table in pixels, used to make the table scrollable.
 * @param {boolean} [autoIndex=false] - Automatically add row indices as the first column of the table.
 * @param {Function} [renderStickyAction] - Function to render a custom sticky action element based on the selected rows.
 * @param {Function} [rowKey] - Function to generate a unique key for each row in the table.
 * @param {('autoClear' | 'keepPagination')} [checkMode='autoClear'] - Mode for handling row selection when paginating.
 * @param {ReactNode} [title] - The title to be displayed above the table.
 * @param {Object} [displayColumnsConfigable] - Configuration for enabling and customizing the display of columns.
 * @returns {ReactNode} The rendered Table component.
 */
export const Table = <RecordType extends AnyRecord, ActionKey extends string = string>({
  currentPage = 1,
  pageSize,
  totalRecords = 0,
  plural = (): string => '',
  singular = (): string => '',
  paginationMode = 'sticky',
  columns = [],
  nonePagination,
  className,
  dataSource = [],
  expandable,
  direction,
  indentSize,
  loading,
  rowKey,
  size,
  showSizeChanger = false,
  paginationClassName,
  locale,
  sizeChangerOptions = [],
  onPaginationChange,
  sortIcon,
  sortValues,
  onSortChange,
  offsetHeader,
  tableHeight,
  autoIndex = true,
  renderStickyAction,
  checkMode = 'keepPagination',
  displayColumnsConfigable,
  title,
  tableLayout = 'auto',
}: Props<RecordType, ActionKey>): ReactNode => {
  useInitializeContext();

  //#region Select records
  const [selectedRowsState, setSelectedRowsState] = useState<RecordType[]>([]);

  const dataInPage = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataSource.slice(startIndex, endIndex);
  }, [dataSource, pageSize, currentPage]);

  const isCheckedAll = useMemo(() => {
    return !!dataInPage.length && dataInPage.every(record => isRecordSelected({ record, rowKey, selectedRowsState }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataInPage, selectedRowsState]);
  //#endregion

  //#region Config view columns
  const defaultVisibleColumns = useMemo(() => {
    return columns.reduce<string[]>((result, column) => {
      if (column.hidden) {
        return result;
      }
      return result.concat(column.uid);
    }, []);
  }, [columns]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultVisibleColumns);

  useEffect(() => {
    setVisibleColumns(defaultVisibleColumns);
  }, [defaultVisibleColumns]);

  //#endregion

  //#region Transform to ant table props
  const {
    columns_,
    tableWidth,
  }: {
    columns_: AntColumnProp;
    tableWidth: number;
  } = useMemo(() => {
    let tableWidth = 0;
    const columns_ = columns.reduce<AntColumnProp>((result, column) => {
      if (column.hidden || !visibleColumns.includes(column.uid)) {
        return result;
      }
      tableWidth += column.width;
      const columnActionKey = 'actions' in column ? column.actions?.key : undefined;
      const sortValue = sortValues && columnActionKey ? sortValues[columnActionKey] : undefined;

      return result.concat({
        ...column,
        uid: column.uid,
        onCell: (record, index) => {
          const isSelected = isRecordSelected({ record, rowKey, selectedRowsState });
          const onCellData = column.onCell?.(record, index);
          return {
            ...onCellData,
            className: classNames(onCellData?.className, isSelected ? 'AntCell__selected' : ''),
          };
        },
        render: (_, record, index) => {
          return column.render(record, index);
        },
        // Sorter
        key: columnActionKey,
        sorter:
          'actions' in column && column.actions?.key
            ? {
                compare: column.actions.sortStatic ? column.actions.sortStatic : (): number => 0,
                multiple: column.actions.sortPriority,
              }
            : false,
        sortOrder: sortValue?.order,
        showSorterTooltip: false,
        sortIcon: ({ sortOrder }) => {
          const sortOrder_ = sortOrder ?? undefined;
          if (sortIcon) {
            return sortIcon(sortOrder_);
          }
          return <SortIcon order={sortOrder_} />;
        },
      });
    }, []);

    if (autoIndex) {
      if (renderStickyAction) {
        columns_.unshift({
          uid: IdOfAntTableIndexColumn,
          width: 70,
          align: 'center',
          onCell: record => {
            const isSelected = isRecordSelected({ record, rowKey, selectedRowsState });
            return {
              className: classNames(isSelected ? 'AntCell__selected' : ''),
            };
          },
          title: (
            <div className="AntCell__hasCheckbox">
              <Checkbox
                valueVariant="controlled-state"
                checked={isCheckedAll}
                onChange={checked => {
                  let nextState = selectedRowsState;
                  if (checkMode === 'autoClear') {
                    nextState = checked ? (dataInPage as RecordType[]) : [];
                  }
                  if (checkMode === 'keepPagination') {
                    nextState = checked
                      ? selectedRowsState.concat(...dataInPage)
                      : selectedRowsState.filter(record => !isRecordSelected({ record, rowKey, selectedRowsState }));
                  }
                  setSelectedRowsState(nextState);
                }}
              >
                #
              </Checkbox>
            </div>
          ),
          render: (_value, record, index) => {
            return (
              <div className="AntCell__hasCheckbox">
                <Checkbox
                  valueVariant="controlled-state"
                  checked={!!isRecordSelected({ record, rowKey, selectedRowsState })}
                  onChange={checked => {
                    const nextState = checked
                      ? selectedRowsState.concat(record)
                      : selectedRowsState.filter(item => rowKey(item) !== rowKey(record));
                    setSelectedRowsState(nextState);
                  }}
                >
                  {pageSize * (currentPage - 1) + index + 1}
                </Checkbox>
              </div>
            );
          },
        });
      } else {
        columns_.unshift({
          uid: IdOfAntTableIndexColumn,
          title: '#',
          width: 48,
          align: 'center',
          onCell: record => {
            const isSelected = isRecordSelected({ record, rowKey, selectedRowsState });
            return {
              className: classNames(isSelected ? 'AntCell__selected' : ''),
            };
          },
          render: (_value, _record, index) => pageSize * (currentPage - 1) + index + 1,
        });
      }
    }

    return {
      columns_,
      tableWidth,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    autoIndex,
    checkMode,
    columns,
    currentPage,
    dataInPage,
    isCheckedAll,
    pageSize,
    selectedRowsState,
    sortValues,
    visibleColumns,
  ]);

  const from = Math.max((currentPage - 1) * pageSize, 0) + 1;
  const to = Math.min(currentPage * pageSize, totalRecords);

  const TitleOfAntTable = useMemo(() => {
    if (!displayColumnsConfigable?.enable) {
      return undefined;
    }
    return (
      <Title
        Left={title}
        defaultVisibleColumns={defaultVisibleColumns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        columns={columns}
        title={displayColumnsConfigable?.texts.title}
      />
    );
  }, [columns, defaultVisibleColumns, displayColumnsConfigable, title, visibleColumns]);
  //#endregion

  return (
    <>
      <AntTable
        bordered
        tableLayout={tableLayout}
        title={() => TitleOfAntTable}
        sticky={offsetHeader === undefined ? undefined : { offsetHeader }}
        size={size}
        rowKey={rowKey}
        loading={loading}
        indentSize={indentSize}
        direction={direction}
        dataSource={dataSource}
        expandable={expandable}
        columns={columns_ as AntTableProps['columns']}
        className={classNames(
          'AntTable__container',
          paginationMode === 'sticky' ? 'AntTable--paginationSticky' : 'AntTable--paginationNone',
          className,
        )}
        scroll={{
          x: tableWidth,
          y: tableHeight,
          scrollToFirstRowOnChange: true,
        }}
        onChange={(_pagination, _filter, sorter, extra) => {
          if (extra.action === 'sort') {
            const nextSortValues = toArray(sorter).reduce<SortValues<ActionKey>>((result, item) => {
              if (typeof item.columnKey === 'string') {
                return {
                  ...result,
                  [item.columnKey as ActionKey]: {
                    order: item.order,
                    priority:
                      typeof item.column?.sorter === 'object' && 'multiple' in item.column.sorter
                        ? item.column?.sorter.multiple ?? 0
                        : 0,
                  },
                };
              }
              return result;
            }, {} as SortValues<ActionKey>);
            onSortChange?.(nextSortValues);
          }
        }}
        pagination={
          nonePagination
            ? false
            : {
                simple: false,
                showLessItems: true,
                hideOnSinglePage: false,
                className: classNames('AntTable__pagination', paginationClassName),
                showSizeChanger,
                total: totalRecords,
                current: currentPage,
                pageSizeOptions: sizeChangerOptions,
                locale,
                pageSize,
                onChange: (page, pageSize) => onPaginationChange?.({ page, pageSize }),
                showTotal: (total): ReactNode => {
                  if (!total) {
                    return null;
                  }
                  return (
                    <Highlighter
                      highlightClassName="AntTable__text-range--highlight"
                      searchWords={[/\d+/g]}
                      textToHighlight={pluralize({
                        count: totalRecords,
                        singular: singular({ from, to }),
                        plural: plural({ from, to }),
                      })}
                    />
                  );
                },
              }
        }
      />
      {renderStickyAction && (
        <StickyAction isVisible={!!selectedRowsState.length}>
          {renderStickyAction({
            selectedRows: selectedRowsState,
            clear: () => setSelectedRowsState([]),
          })}
        </StickyAction>
      )}
    </>
  );
};
