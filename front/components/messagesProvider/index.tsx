/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { NextIntlClientProvider } from 'next-intl';

const MessagesProvider = ({ children, messages, locale }: { children: React.ReactNode; messages: any; locale: string }) => {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
};

export default MessagesProvider;
