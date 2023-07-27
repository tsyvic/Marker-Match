import { CSSProperties, ReactNode } from 'react';

export type NavigationLinkComponentProps = {
  children?: ReactNode;
  to: string;
  style?: CSSProperties;
};
