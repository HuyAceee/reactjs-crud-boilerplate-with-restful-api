import { defer as deferReactRouterDom } from 'react-router-dom';
import { DeferFunction } from './types';

export const defer = deferReactRouterDom as unknown as DeferFunction;
