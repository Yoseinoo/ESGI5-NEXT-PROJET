"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setLocale } from "../store/localeSlice";
import { LANGUAGES } from "../locales/locales";

export default function LanguageSwitcher() {
    const locale = useSelector((state: RootState) => state.locale.locale);
    const dispatch = useDispatch();

    const currentLanguage = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.label}</span>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10 focus:outline-none">
                {LANGUAGES.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        as="button"
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left ${
                            lang.code === locale
                                ? "bg-gray-200 cursor-default"
                                : "hover:bg-gray-100"
                        }`}
                        onClick={() =>
                            dispatch(setLocale(lang.code as "en" | "fr"))
                        }
                        disabled={lang.code === locale}
                    >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
