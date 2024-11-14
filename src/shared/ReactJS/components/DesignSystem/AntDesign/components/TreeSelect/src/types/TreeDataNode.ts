import { BasicDataNode as AntBasicDataNode } from 'antd/es/tree';
import { ReactNode } from 'react';
import { Leaf } from './Leaf';

export type TreeDataNode = AntBasicDataNode & {
  rawData: Leaf<any>['rawData'];
  optionValue: string;
  optionLabel: ReactNode;
  children: TreeDataNode[];
  parent: string | null;
  hidden: false;
};
