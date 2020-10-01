import React, { useState } from 'react';
import './App.css';
import FundReturnForm from './components/fund-returns-form/FundReturnsForm';
import FundReturnsInfo from './components/fund-returns-info/FundReturnsInfo';
import {
  getPreviousDayDate,
  getPreviousYearDate,
  getFundReturnsData
} from './util/funds-util';

function App() {

  const [fundReturnsData, setfundReturnsData] = useState();
  const [isLoading, setLoading] = useState(false);

  const onFindReturns = async ({ schemeCode, poi, horizon }) => {
    setLoading(true);
    const mutualFundApiResponse = await fetch(
      `https://api.mfapi.in/mf/${schemeCode}`
    ).then((res) => res.json());
    
    if (mutualFundApiResponse.data.length === 0) {
      setfundReturnsData([]);
      setLoading(false);
      return;
    }

    const fromYearDate = getPreviousYearDate(+horizon);
    const toYearDate = getPreviousDayDate(1);
    const allfundRelatedData = getFundReturnsData(fromYearDate, toYearDate, +poi, mutualFundApiResponse.data);
    setfundReturnsData(allfundRelatedData);
    setLoading(false);
  };

  return (
    <div>
      <header className="header">
        <h1 className="title">mutual fund returns</h1>
      </header>
      <main>
        <FundReturnForm onFindReturns={onFindReturns} />
        <FundReturnsInfo isLoading={isLoading} fundReturnsData={fundReturnsData} />
      </main>
    </div>
  );
}

export default App;
