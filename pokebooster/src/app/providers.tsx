"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

import enMessages from "./locales/en.json";
import frMessages from "./locales/fr.json";

// Map locales to their messages statically
const messagesMap: Record<string, Record<string, string>> = {
    en: enMessages as Record<string, string>,
    fr: frMessages as Record<string, string>,
};

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                <IntlProviderWrapper>{children}</IntlProviderWrapper>
            </ReduxProvider>
        </SessionProvider>
    );
}

function IntlProviderWrapper({ children }: { children: ReactNode }) {
    const locale = useSelector((state: RootState) => state.locale.locale);
    const messages = messagesMap[locale] || messagesMap["en"];

    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
            {children}
        </NextIntlClientProvider>
    );
}
