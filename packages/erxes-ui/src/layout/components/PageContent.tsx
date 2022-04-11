import React from 'react';
import { ContenFooter, ContentBox, MainContent } from '../styles';

type Props = {
  actionBar?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  transparent: boolean;
  center?: boolean;
  subHeader?: React.ReactNode;
  leftSpacing?: boolean;
  initialOverflow?: boolean;
};

function PageContent({
  actionBar,
  footer,
  children,
  transparent,
  center,
  subHeader,
  leftSpacing,
  initialOverflow
}: Props) {
  return (
    <MainContent transparent={transparent} center={center} leftSpacing={leftSpacing}>
      {subHeader}{actionBar}
      <ContentBox transparent={transparent} initialOverflow={initialOverflow}>{children}</ContentBox>
      {footer && <ContenFooter>{footer}</ContenFooter>}
    </MainContent>
  );
}

export default PageContent;
