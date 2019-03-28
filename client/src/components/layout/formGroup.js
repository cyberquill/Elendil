import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const formGroup = ({ name, value, thumb, placeholder, type, onChange, error, others }) => {
    return (
        <div className={others}>
            <div className="form__group">
                <i className={`form__group__thumb fa-2x ${thumb}`} />
                <input
                    type={type}
                    name={name}
                    className={classnames('form__group__input', {
                        'form__invalid': error,
                    })}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                />
            <span className="rule"></span>
            </div>
            {error && <div className="form__invalid--msg">{error}</div>}
        </div>
    );
};

formGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    others: PropTypes.string
};

formGroup.defaultProps = {
    type: 'text',
};

export default formGroup;
