import { createContext } from 'react';

export const themes = {
    light: {
        backgroundColor: '#f8f8f8',
        color: '#000',
    },
    black: {
        backgroundColor: '#000',
        color: '#fff',
    },
};

export const ThemeContext = createContext({
    theme: themes.light,
    toggleTheme: () => {},
});

export interface Theme {
    color: string;
    backgroundColor: string;
}

export interface ContextTheme {
    theme: Theme;
    toggleTheme: Function;
}
