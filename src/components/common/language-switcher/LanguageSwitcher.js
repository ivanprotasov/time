import React, { PureComponent } from 'react';
import styles from './LanguageSwitcher.module.scss';
import i18n from '../../../i18n/i18n';

class LanguageSwitcher extends PureComponent {
    constructor() {
        super();
        this.state = {
            lang: 'ru'
        };
    }

    changeLanguage = lng => {
        i18n.changeLanguage(lng);
        this.setState({
            lang: lng
        });
    };

    render() {
        return (
            <ul className="nav">
                <li className="nav-item">
                    <button
                        className={[
                            'btn btn-link nav-link',
                            this.state.lang === 'ru'
                                ? styles['LanguageSwitcher-active-button']
                                : undefined
                        ].join(' ')}
                        onClick={() => this.changeLanguage('ru')}>
                        ru
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={[
                            'btn btn-link nav-link',
                            this.state.lang === 'en'
                                ? styles['LanguageSwitcher-active-button']
                                : undefined
                        ].join(' ')}
                        onClick={() => this.changeLanguage('en')}>
                        en
                    </button>
                </li>
            </ul>
        );
    }
}

export default LanguageSwitcher;
