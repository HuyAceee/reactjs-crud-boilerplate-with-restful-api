import { QRCode as AntQrcode, QRCodeProps as AntQrcodeProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props extends Pick<AntQrcodeProps, 'className' | 'size' | 'value'> {
  /** URL of the image to display in the center of the QR code. */
  image?: string;
}

/**
 * Qrcode component that extends the functionality of the Ant Design QRCode component
 * by providing additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Qrcode component.
 * @param {string} [props.className] - Custom CSS class for styling the QR code.
 * @param {string} [props.image] - URL of the image to display in the center of the QR code.
 * @param {number} [props.size] - Size of the QR code.
 * @param {string} props.value - Value to encode in the QR code.
 * @returns {ReactNode} The rendered Qrcode component.
 */
export const Qrcode: FC<Props> = ({ className, image, size, value }) => {
  useInitializeContext();

  return <AntQrcode className={classNames('AntQrcode__container', className)} icon={image} value={value} size={size} />;
};
