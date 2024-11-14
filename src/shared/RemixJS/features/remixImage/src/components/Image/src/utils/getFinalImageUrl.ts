import { TransformOptions } from '../../../../types/TransformOptions';
import { urlSearchParamsUtil } from '../../../../utils/urlSearchParamsUtil';

interface GetFinalImageUrl {
  /** The URL of the image loader. */
  loaderUrl: string;
  /** The source URL of the image. */
  src: string;
  /** The option configuration for the image. */
  transformOptions: Omit<TransformOptions, 'src' | 'origin'>;
}

/**
 * Generates the final URL for an image by combining the loader URL and the image options.
 * @param {GetFinalImageUrl} param - The parameters required to generate the final image URL.
 * @returns {string} The final URL for the image.
 */
export const getFinalImageUrl = ({ loaderUrl, src, transformOptions }: GetFinalImageUrl): string => {
  const searchParams = urlSearchParamsUtil.encrypt({
    ...transformOptions,
    src,
  });

  return loaderUrl + searchParams;
};
