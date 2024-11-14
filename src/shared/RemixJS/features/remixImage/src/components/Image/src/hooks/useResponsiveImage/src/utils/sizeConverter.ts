import { Responsive } from '../../../../../../../types/Responsive';

/**
 * Converts a responsive object into a CSS media query string.
 * @param {Responsive} responsive - The responsive object to convert.
 * @returns {string} The CSS media query string representing the responsive object.
 */
export const sizeConverter = (responsive: Responsive): string => {
  return responsive.maxWidth
    ? `(max-width: ${responsive.maxWidth}px) ${responsive.size.width}px`
    : `${responsive.size.width}px`;
};
