import classNames from 'classnames';
import { CSSProperties, ComponentPropsWithRef, forwardRef, useCallback, useMemo } from 'react';
import { Responsive } from '../../../types/Responsive';
import { TransformOptions } from '../../../types/TransformOptions';
import { useResponsiveImage } from './hooks/useResponsiveImage';
import { getFinalImageUrl } from './utils/getFinalImageUrl';

export interface Props extends Omit<ComponentPropsWithRef<'img'>, 'width' | 'height'> {
  /** The source URL of the image. */
  src: string;
  /** Width of the image. */
  width: number;
  /** Height of the image. */
  height: number;
  /** The URL of the image loader. */
  loaderUrl: string;
  /** An array of responsive configurations for the image. */
  responsives?: Responsive[];
  /** The option configuration for the image. */
  transformOptions?: Omit<TransformOptions, 'src' | 'origin'>;
  /** Optional device pixel ratio (DPR) variants for the image. */
  dprVariants?: number | number[];
  /** A function to be called when image loading is complete. */
  onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
  /** The placeholder URL for the image. */
  placeholder?: string;
  /** The fallback URL for the image. */
  fallback?: string;
}

/**
 The Image component renders an image element with responsive attributes based on the provided configuration.
  - Resize images to the minimum size needed for faster page loading
  - Convert images to more efficient file types for faster page loader
  - Apply transformations to images such as `resize`, `crop`, `rotate`, `blur`, and `flip`
 */
export const Image = forwardRef<HTMLImageElement, Props>((props_, ref) => {
  const {
    transformOptions = {},
    src,
    responsives = [],
    dprVariants,
    onLoadingComplete,
    placeholder: blurDataURL,
    style,
    className,
    loaderUrl,
    fallback,
    loading = 'lazy',
    alt = '',
    ...props
  } = props_;

  const responsiveProps = useResponsiveImage({
    src,
    responsives,
    dprVariants,
    transformOptions,
    loaderUrl,
  });

  const finalBlurDataURL = useMemo(() => {
    if (blurDataURL) {
      return blurDataURL;
    }
    return getFinalImageUrl({
      loaderUrl,
      src,
      transformOptions: {
        width: 15,
        height: 15,
      },
    });
  }, [blurDataURL, loaderUrl, src]);

  const imageStyle = useMemo<CSSProperties>(() => {
    return {
      ...style,
      backgroundSize: transformOptions?.fit || 'cover',
      backgroundPosition: 'center',
      ...(finalBlurDataURL && {
        backgroundImage: `url("${finalBlurDataURL}")`,
      }),
    };
  }, [finalBlurDataURL, transformOptions?.fit, style]);

  const handleLoadImage = useCallback(
    (image: HTMLImageElement | null): void => {
      let dataLoadedSrc = image?.getAttribute('data-loaded-src');
      if (!image || dataLoadedSrc === src) {
        return;
      }

      dataLoadedSrc = src;
      const p = 'decode' in image ? image.decode() : Promise.resolve();
      p.catch(console.log).then(() => {
        if (!image.parentNode) {
          return;
        }
        image.style.animationDuration = '0.125s';
        image.classList.remove('blur');

        const { naturalWidth, naturalHeight } = image;
        onLoadingComplete?.({ naturalWidth, naturalHeight });
      });
    },
    [onLoadingComplete, src],
  );

  const handleRef = useCallback(
    (image: HTMLImageElement | null) => {
      if (!blurDataURL) {
        image?.classList.add('blur');
      }
      if (image?.complete) {
        handleLoadImage(image);
      }
      if (ref) {
        if (typeof ref === 'function') {
          ref(image);
        } else {
          ref.current = image;
        }
      }
    },
    [blurDataURL, handleLoadImage, ref],
  );

  return (
    <img
      {...props}
      {...responsiveProps}
      alt={alt}
      loading={loading}
      ref={handleRef}
      className={classNames('Image__container', className, {
        'blur-in': !blurDataURL,
      })}
      style={imageStyle}
      onLoad={event => {
        props.onLoad?.(event);
        handleLoadImage(event.currentTarget);
      }}
      onError={event => {
        props.onError?.(event);
        if (fallback) {
          event.currentTarget.src = fallback;
        }
      }}
    />
  );
});

Image.displayName = 'Image';
