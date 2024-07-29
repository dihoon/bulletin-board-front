import ClientProvider from '@/components/ClientProvider';
import Header from '@/components/Header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageLayout(props: Props) {
  return (
    <ClientProvider>
      <Header />
      {props.children}
    </ClientProvider>
  );
}
