import { ThemeContext } from '../theme-store/ThemeStore';
import React from 'react';
import styles from './ThemeSwitcher.module.scss';

function ThemeSwitcher() {
    return (
        <ThemeContext.Consumer>
            {({ theme, onSwitchTheme }) => (
                <ul className="nav float-right">
                    {/*quick fix float-right*/}
                    <li className="nav-item">
                        <button
                            className={[
                                'btn btn-link nav-link',
                                theme === 'light'
                                    ? styles['ThemeSwitcher-active-button']
                                    : undefined,
                                styles['ThemeSwitcher-theme-button'],
                                styles['ThemeSwitcher-light-theme-button']
                            ].join(' ')}
                            onClick={() => onSwitchTheme('light')}
                        />
                    </li>
                    <li className="nav-item">
                        <button
                            className={[
                                'btn btn-link nav-link',
                                theme === 'dark'
                                    ? styles['ThemeSwitcher-active-button']
                                    : undefined,
                                styles['ThemeSwitcher-theme-button'],
                                styles['ThemeSwitcher-dark-theme-button']
                            ].join(' ')}
                            onClick={() => onSwitchTheme('dark')}
                        />
                    </li>
                </ul>
            )}
        </ThemeContext.Consumer>
    );
}

export default ThemeSwitcher;
