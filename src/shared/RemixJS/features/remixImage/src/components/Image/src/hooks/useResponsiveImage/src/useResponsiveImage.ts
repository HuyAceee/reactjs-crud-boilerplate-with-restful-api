import { useMemo } from 'react';
import { Responsive } from '../../../../../../types/Responsive';
import { TransformOptions } from '../../../../../../types/TransformOptions';
import { getFinalImageUrl } from '../../../utils/getFinalImageUrl';
import { sizeComparator } from './utils/sizeComparator';
import { sizeConverter } from './utils/sizeConverter';

interface UseResponsiveImage {
  /** The source URL of the image. */
  src: string;
  /** An array of responsive configurations for the image. */
  responsives: Responsive[];
  /** Optional device pixel ratio (DPR) variants for the image. */
  dprVariants?: number | number[];
  /** The option configuration for the image. */
  transformOptions: Omit<TransformOptions, 'src'>;
  /** The URL of the image loader. */
  loaderUrl: string;
}

/**
 * Generates responsive attributes for an image element based on the provided configuration.
 * @param {UseResponsiveImage} options - The configuration options for generating the responsive attributes.
 * @returns {{
 *   src: string;
 *   srcSet?: string;
 *   sizes?: string;
 * }} The responsive attributes including src, srcSet, and sizes.
 */
export const useResponsiveImage = ({
  dprVariants = [1],
  responsives,
  src,
  loaderUrl,
  transformOptions,
}: UseResponsiveImage): {
  src: string;
  srcSet?: string;
  sizes?: string;
} => {
  return useMemo(() => {
    let smallestSrc = src;
    let smallestWidth = Number.MAX_SAFE_INTEGER;
    const srcSet: string[] = [];
    const multipliers = Array.from(
      new Set<number>([1, ...(typeof dprVariants === 'number' ? [dprVariants] : dprVariants)]),
    ).sort();

    for (const multiplier of multipliers) {
      for (const responsive of responsives) {
        const { size } = responsive;
        const srcSetUrl = getFinalImageUrl({
          loaderUrl,
          src,
          transformOptions: {
            ...transformOptions,
            width: typeof size.width === 'number' ? size.width * multiplier : size.width,
            height: typeof size.height === 'number' ? size.height * multiplier : size.height,
          },
        });

        srcSet.push(srcSetUrl + ` ${size.width * multiplier}w`);

        if (multiplier === 1 && size.width < smallestWidth) {
          smallestWidth = size.width;
          smallestSrc = srcSetUrl;
        }
      }
    }

    const sizes = [...responsives].sort(sizeComparator).map(sizeConverter);
    if (responsives.length === 1 && responsives[0].maxWidth != null) {
      sizes.push(`${responsives[0].size.width}px`);
    }
    return {
      ...(srcSet.length > 0 && {
        srcSet: srcSet.join(', '),
        sizes: sizes.join(', '),
      }),
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by  That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      src: smallestSrc,
    };
  }, [src, dprVariants, responsives, transformOptions, loaderUrl]);
};
