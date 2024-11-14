import { Props } from '../Table';
import { AnyRecord } from '~/shared/TypescriptUtilities';

interface IsRecordSelected<RecordType extends AnyRecord> {
  /** The current state of selected rows in the table. */
  selectedRowsState: Props<RecordType>['dataSource'];
  /** The record to check if it is selected or not. */
  record: RecordType;
  /** A function that takes a record and returns its unique key. */
  rowKey: Props<RecordType>['rowKey'];
}

/**
 * Determines if a given record is currently selected in the table.
 *
 * @template RecordType - The type of the record being checked.
 * @param {IsRecordSelected<RecordType>} params - The parameters for the function.
 * @param {Props<RecordType>['dataSource']} params.selectedRowsState - The current state of selected rows.
 * @param {RecordType} params.record - The record to check for selection.
 * @param {Props<RecordType>['rowKey']} params.rowKey - A function that returns the unique key for a record.
 * @returns {boolean} - Returns `true` if the record is selected, `false` otherwise.
 */
export const isRecordSelected = <RecordType extends AnyRecord>({
  selectedRowsState = [],
  record,
  rowKey,
}: IsRecordSelected<RecordType>): boolean => {
  return !!selectedRowsState.find(itemState => rowKey(itemState) === rowKey(record));
};
