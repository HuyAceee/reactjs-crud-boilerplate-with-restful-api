import { useLoaderData as useLoaderDataReactRouterDom } from 'react-router-dom';
import { AppData, SerializeFrom } from './types';

export const useLoaderData = <T = AppData>() => {
  return useLoaderDataReactRouterDom() as SerializeFrom<T>;
};
