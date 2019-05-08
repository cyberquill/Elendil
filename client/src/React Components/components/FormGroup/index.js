import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const formGroup = ({ name, value, thumb, placeholder, type, onChange, error, others }) => {
    return (
        <div className={others}>
            <div className="form-group">
                <i className={`form-group__thumb ${thumb}`} />
                <input
                    type={type}
                    name={name}
                    className={classnames('form-group__input', {
                        'form-invalid': error,
                    })}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <div className="form-group__rule"></div>
            </div>
            {error && <div className="form-invalid--msg">{error}</div>}
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
