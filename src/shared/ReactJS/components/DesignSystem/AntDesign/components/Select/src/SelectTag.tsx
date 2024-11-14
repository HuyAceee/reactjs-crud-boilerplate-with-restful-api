import { SelectProps as AntSelectProps, Select } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { FC, MouseEvent, useMemo, useState } from 'react';
import { useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { Loading } from '../../../../../UI';
import { useInitializeContext } from '../../../base';
import './css/SelectTag.css';

export interface Props
  extends Pick<
    AntSelectProps,
    | 'className'
    | 'allowClear'
    | 'loading'
    | 'notFoundContent'
    | 'placeholder'
    | 'disabled'
    | 'autoClearSearchValue'
    | 'direction'
    | 'open'
    | 'onDropdownVisibleChange'
    | 'size'
  > {
  /** The current value(s) of the SelectTag component. */
  value?: string[];
  /** Callback function invoked when the value(s) of the SelectTag component change. */
  onChange?: (value: string[] | undefined) => void;
  /** If true, the select is read-only and cannot be changed by the user. */
  readOnly?: boolean;
  /** Determines if the select is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * SelectTag component that extends the functionality of the Ant Design Select component
 * by providing support for selecting tag while ensuring type safety. It enforces
 * stricter type checks compared to the standard Ant Design Select component.
 *
 * @template string[] - The type of the values, extending from OptionValueType[].
 * @template RawData - The raw data type for each option.
 *
 * @param {Props<string[], RawData>} props - The properties for the SelectTag component.
 * @param {string[]} [props.value] - The current value(s) of the SelectTag component.
 * @param {(value: string[] | undefined) => void} [props.onChange] - Callback function invoked when the value(s) of the SelectTag component change.
 * @param {boolean} [props.loading] - Whether the component is in a loading state.
 * @param {ReactNode} [props.notFoundContent] - Content to display when nothing match the input.
 * @param {boolean} [props.allowClear] - Whether to show a clear button allowing the user to clear the input.
 * @param {string} [props.placeholder] - Placeholder text to display when the input is empty.
 * @param {boolean} [props.disabled] - Whether the SelectTag component is disabled.
 * @param {boolean} [props.autoClearSearchValue=true] - Whether to clear the search input when an option is selected.
 * @param {string} [props.className] - Custom CSS class for styling the component.
 * @param {string} [props.direction] - The direction of the dropdown menu ('ltr' or 'rtl').
 * @param {boolean} props.readOnly - If true, the select is read-only and cannot be changed by the user.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the select is controlled or uncontrolled state.
 * @param {boolean} [props.open] - Whether the dropdown menu is open.
 * @param {Function} [props.onDropdownVisibleChange] - Callback function that is triggered when the dropdown visibility changes.
 * @param {string} [props.size] - The size of input.

 * @returns {ReactNode} The rendered SelectTag component.
 */
export const SelectTag: FC<Props> = ({
  value = [],
  onChange,
  loading,
  notFoundContent,
  allowClear = true,
  placeholder,
  disabled,
  autoClearSearchValue = true,
  className,
  direction,
  onDropdownVisibleChange,
  open,
  readOnly = false,
  valueVariant = 'uncontrolled-state',
  size,
}) => {
  useInitializeContext();
  const [valueState, setValueState] = useState(value);
  const isMounted = useIsMounted();

  const handleChange: Props['onChange'] = value => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(value) || null;
    const value_ = isUndefined ? undefined : value;
    setValueState(value_ ?? []);
    onChange?.(value_);
  };

  const handleClick = (event: MouseEvent): void => {
    event.stopPropagation();
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  const renderLoadingAtDropdown: FC = () => {
    return (
      <div className="AntSelectTag__loading">
        <Loading size={60} />
      </div>
    );
  };

  const mergedValueState = useDeepCompareMemo(() => {
    if (!isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);
  const mergedOpenState = useMemo(() => {
    if (!isMounted) {
      return false;
    }
    return open;
  }, [isMounted, open]);

  return (
    <Select
      mode="tags"
      popupMatchSelectWidth
      size={size}
      direction={direction}
      autoClearSearchValue={autoClearSearchValue}
      disabled={disabled}
      placeholder={placeholder}
      onClick={handleClick}
      notFoundContent={loading ? renderLoadingAtDropdown({}) : notFoundContent}
      allowClear={loading ? false : allowClear}
      className={classNames('AntSelectTag__container', readOnly ? 'AntSelectTag__readOnly' : '', className)}
      onDropdownVisibleChange={onDropdownVisibleChange}
      open={mergedOpenState}
      loading={loading}
      tabIndex={readOnly ? -1 : undefined}
      onChange={handleChange as AntSelectProps<string[]>['onChange']}
      value={mergedValueState}
    />
  );
};
