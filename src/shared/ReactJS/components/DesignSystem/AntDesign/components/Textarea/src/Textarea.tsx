import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'ramda';
import { ComponentProps, FC, useEffect, useState } from 'react';
import { useDebouncedValue, useDeepCompareEffect, useDeepCompareMemo, useIsMounted } from '../../../../../../hooks';
import { useInitializeContext } from '../../../base';
import './styles.css';

type AntInputProps = ComponentProps<typeof AntInput.TextArea>;

export interface Props
  extends Pick<
    AntInputProps,
    'className' | 'disabled' | 'maxLength' | 'placeholder' | 'prefix' | 'showCount' | 'rows' | 'readOnly'
  > {
  /** The value of the input. */
  value?: string;
  /** Callback function triggered when the input value changes.
   * @param {string} value - The new value of the input.
   */
  /** Callback function triggered when the input value changes. */
  onChange?: (value: string | undefined) => void;
  /** Callback function that is triggered when the input value changes, but only after a debounce delay. */
  onDebounceChange?: (value: string | undefined) => void;
  /** Determines if the input is controlled or uncontrolled state. */
  valueVariant?: 'controlled-state' | 'uncontrolled-state';
}

/**
 * Textarea component that extends the functionality of the Ant Design TextArea component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Textarea component.
 * @param {string} [props.className] - Custom CSS class for styling the text area.
 * @param {boolean} [props.disabled=false] - Whether the text area is disabled.
 * @param {number} [props.maxLength] - The maximum length of the input.
 * @param {string} [props.placeholder] - Placeholder text for the text area.
 * @param {ReactNode} [props.prefix] - Prefix element for the text area.
 * @param {boolean} [props.showCount=true] - Whether to display the character count.
 * @param {number} [props.rows=6] - Number of rows in the text area.
 * @param {boolean} [props.readOnly=false] - Whether the input is read-only.
 * @param {string} [props.value] - The value of the text area.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {Function} [props.onDebounceChange] - Callback function that is triggered when the input value changes, but only after a debounce delay.
 * @param {'controlled-state' | 'uncontrolled-state'} [props.valueVariant] - Determines if the input is controlled or uncontrolled state.
 * @returns {ReactNode} The rendered Textarea component.
 */
export const Textarea: FC<Props> = ({
  className,
  disabled = false,
  maxLength,
  onChange,
  placeholder,
  prefix,
  value = '',
  showCount = true,
  rows = 6,
  readOnly = false,
  onDebounceChange,
  valueVariant = 'uncontrolled-state',
}) => {
  useInitializeContext();
  const isMounted = useIsMounted();
  const [valueState, setValueState] = useState(value);
  const { value: valueStateDebounced, clearTimeout } = useDebouncedValue(valueState, { timeoutMs: 300 });

  const handleChange: AntInputProps['onChange'] = event => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    setValueState(value ?? '');
    onChange?.(value);
  };

  const handleBlur: AntInputProps['onBlur'] = event => {
    if (readOnly) {
      return;
    }
    const isUndefined = isEmpty(event.target.value) || null;
    const value = isUndefined ? undefined : event.target.value;
    clearTimeout();
    setValueState(value ?? '');
    onDebounceChange?.(value);
  };

  useDeepCompareEffect(() => {
    setValueState(value);
  }, [value]);

  useEffect(() => {
    if (isMounted) {
      onDebounceChange?.(valueStateDebounced);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueStateDebounced]);

  const mergedValueState = useDeepCompareMemo(() => {
    if (!isMounted) {
      return undefined;
    }
    return valueVariant === 'controlled-state' ? value : valueState;
  }, [value, valueState, isMounted, valueVariant]);

  return (
    <AntInput.TextArea
      readOnly={readOnly}
      className={classNames('AntTextarea__container', readOnly ? 'AntTextarea__readOnly' : '', className)}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={handleBlur}
      placeholder={placeholder}
      prefix={prefix}
      showCount={!!maxLength && showCount}
      rows={rows}
      onChange={handleChange}
      value={mergedValueState}
    />
  );
};
