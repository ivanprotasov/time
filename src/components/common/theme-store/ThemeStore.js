import React, { PureComponent } from 'react';

export const ThemeContext = React.createContext('light');

class ThemeStore extends PureComponent {
    //component for testing React.createContext feature
    state = {
        theme: 'light'
    };

    switchTheme = color => {
        this.setState({
            theme: color
        });
    };

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    onSwitchTheme: this.switchTheme
                }}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeStore;
