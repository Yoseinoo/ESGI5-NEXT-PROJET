import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_LOCALE, LocaleCode } from "../locales/locales";

interface LocaleState {
    locale: LocaleCode;
}

const initialState: LocaleState = {
    locale: DEFAULT_LOCALE, // default
};

const localeSlice = createSlice({
    name: "locale",
    initialState,
    reducers: {
        setLocale(state, action: PayloadAction<LocaleCode>) {
            state.locale = action.payload;
        },
    },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
