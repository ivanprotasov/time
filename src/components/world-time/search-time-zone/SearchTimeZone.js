import React, { PureComponent, Fragment } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import { addTimeZone } from '../../../redux/actions';

class SearchTimeZone extends PureComponent {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            selectedZone: {
                zoneName: '',
                gmtOffset: 0
            }
        };
    }

    handleSelect = zoneName => {
        this.setState((state, props) => ({
            selectedZone: props.allTimeZones.find(
                zone => zone.zoneName === zoneName
            ),
            inputValue: zoneName
        }));
    };

    handleChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleClick = () => {
        if (
            this.props.selectedTimeZones.find(
                zone =>
                    zone.content.zoneName === this.state.selectedZone.zoneName
            ) ||
            !this.state.inputValue
        )
            return;

        this.props.addTimeZone(this.state.selectedZone);
        this.setState({ inputValue: '' });
    };

    render() {
        const { t, allTimeZones } = this.props,
            { inputValue } = this.state;
        return (
            <Fragment>
                <ReactAutocomplete
                    items={allTimeZones}
                    shouldItemRender={(item, value) =>
                        item.zoneName
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) > -1
                    }
                    getItemValue={item => item.zoneName}
                    renderItem={(item, highlighted) => (
                        <div
                            key={item.zoneName}
                            style={{
                                backgroundColor: highlighted
                                    ? '#eee'
                                    : 'transparent'
                            }}>
                            {item.zoneName}
                        </div>
                    )}
                    value={inputValue}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    inputProps={{
                        className: 'custom-select',
                        placeholder: t('Please, add region...')
                    }}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.handleClick}>
                        {t('Add region')}
                    </button>
                </div>
            </Fragment>
        );
    }
}

export default withNamespaces()(
    connect(
        null,
        {
            addTimeZone: addTimeZone
        }
    )(SearchTimeZone)
);
