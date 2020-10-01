import React, { useState } from 'react';
import './FundReturnsForm.css';

const fundReturnsFormData = [
  {
    displayName: 'scheme code',
    name: 'scheme-code',
    formControlName: 'schemeCode',
    placeholder: 'Enter Scheme Code',
  },
  {
    displayName: 'period of investment',
    name: 'poi',
    formControlName: 'poi',
    placeholder: 'Enter Period Of Investment',
  },
  {
    displayName: 'horizon',
    name: 'horizon',
    formControlName: 'horizon',
    placeholder: 'Enter Horizon',
  },
];

const FundReturnsForm = ({ onFindReturns }) => {
  const [fundData, setFundData] = useState({
    poi: '',
    schemeCode: 102885,
    horizon: '',
  });
  const [hasError, setError] = useState(false);

  const onSumit = (event) => {
    event.preventDefault();
    const { poi, schemeCode, horizon } = fundData;
    if (!(poi && schemeCode && horizon)) {
      setError(true);
      return;
    }
    onFindReturns(fundData);
  };

  const onFieldChange = (event, formControlName) => {
    setError(false);
    const formControlValue = event.target.value;
    setFundData((prevData) => ({
      ...prevData,
      [formControlName]: formControlValue,
    }));
  };

  return (
    <div className="form-container">
      {hasError && <p className="error-info">Please fill all the fields</p>}
      <form onSubmit={onSumit} className="form">
        {fundReturnsFormData.map(
          ({ name, displayName, formControlName, placeholder }) => (
            <div key={name} className="form-control">
              <label htmlFor={name}>{displayName}</label>
              <input
                name={name}
                placeholder={placeholder}
                value={fundData[formControlName]}
                onChange={(e) => onFieldChange(e, formControlName)}
                type="number"
              />
            </div>
          )
        )}
        <button type="submit">find returns</button>
      </form>
    </div>
  );
};

export default FundReturnsForm;
