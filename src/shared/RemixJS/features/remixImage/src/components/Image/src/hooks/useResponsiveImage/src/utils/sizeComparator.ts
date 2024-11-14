import { Responsive } from '../../../../../../../types/Responsive';

/**
 * Compares two responsive objects based on their maxWidth property.
 * @param {Responsive} responsive1 - The first responsive object to compare.
 * @param {Responsive} responsive2 - The second responsive object to compare.
 * @returns {number} A positive number if responsive1 has a greater maxWidth than responsive2,
 *                   a negative number if responsive2 has a greater maxWidth than responsive1,
 *                   or 0 if they have equal maxWidth or maxWidth is not defined for either.
 */
export const sizeComparator = (responsive1: Responsive, responsive2: Responsive): number => {
  return (responsive1.maxWidth || Infinity) - (responsive2.maxWidth || Infinity);
};
