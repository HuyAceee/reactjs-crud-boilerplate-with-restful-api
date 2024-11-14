import { ArrowLeftOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

interface Props {
  onBack?: () => void;
  title: ReactNode;
}

export const MutationHeader = ({ title, onBack }: Props) => {
  return (
    <div className="FormMutation__Header">
      <ArrowLeftOutlined className="FormMutation__Back" onClick={onBack} />
      {title}
    </div>
  );
};
