import React, { useState } from 'react';
import { Photo } from './component';

import { themes, ThemeContext, Theme } from './theme';
import './App.css';

const App = () => {
    const [theme = themes.light, setTheme] = useState<Theme>();

    const toggleTheme = () => {
        setTheme(themes.light === theme ? themes.black : themes.light);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Photo />
        </ThemeContext.Provider>
    );
};

export default App;
