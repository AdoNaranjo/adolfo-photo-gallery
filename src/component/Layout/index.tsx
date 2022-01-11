import React, { FC } from 'react';
import { ThemeContext, themes } from '../../theme';
import './style.css';

const Layout: FC = (props) => {
    return (
        <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <div className="layoutScreen" style={{ backgroundColor: theme.backgroundColor }}>
                    <div className="header" style={{ backgroundColor: theme.backgroundColor }}>
                        <div
                            className="toggleTheme"
                            style={{
                                backgroundColor:
                                    theme.backgroundColor === themes.black.backgroundColor
                                        ? '#fff'
                                        : themes.black.backgroundColor,
                            }}
                            onClick={toggleTheme}
                        >
                            <div
                                className="toggleBall"
                                style={{
                                    backgroundColor: theme.backgroundColor,
                                    float: theme.backgroundColor === themes.black.backgroundColor ? 'right' : 'left',
                                }}
                            ></div>
                        </div>
                    </div>
                    {props.children}
                </div>
            )}
        </ThemeContext.Consumer>
    );
};

export default Layout;
