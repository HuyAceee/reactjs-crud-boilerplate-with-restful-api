import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { useInitializeContext } from '../../../base';

export interface Props
  extends Pick<AntAvatarProps, 'className' | 'size' | 'gap' | 'shape' | 'icon' | 'src' | 'srcSet'> {}

/**
 * Avatar component that extends the Ant Design Avatar component.
 * It provides additional customization and support for stricter type safety.
 *
 * @param {Props} props - The properties for the Avatar component.
 * @param {string} [props.className] - Custom CSS class for styling the avatar.
 * @param {number} [props.gap] - The gap between the avatar and its text.
 * @param {ReactNode} [props.icon] - The icon to be displayed inside the avatar.
 * @param {string} [props.shape] - The shape of the avatar, can be 'circle' or 'square'.
 * @param {number|string} [props.size] - The size of the avatar.
 * @param {string} [props.src] - The source of the avatar image.
 * @param {string} [props.srcSet] - The source set for the avatar image.
 * @returns {ReactNode} The rendered Avatar component.
 */
export const Avatar: FC<Props> = ({ className, gap, icon, shape, size, src, srcSet }) => {
  useInitializeContext();

  return (
    <AntAvatar
      className={classNames('AntAvatar__container', className)}
      gap={gap}
      icon={icon}
      shape={shape}
      size={size}
      src={src}
      srcSet={srcSet}
    />
  );
};
