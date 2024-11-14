import { ShouldRevalidateFunction } from '~/overrides/remix';

const paths: string[] = [];

export const preventRevalidateOnEditPage: ShouldRevalidateFunction = ({ currentUrl }) => {
  if (paths.find(item => item === currentUrl.pathname)) {
    return true;
  }
  return false;
};
