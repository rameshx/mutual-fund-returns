import React from 'react';
import './FundReturnsInfo.css';

const FundReturnsInfo = ({ fundReturnsData, isLoading }) => {
  if(isLoading) return <p className="info info-normal">Loading...</p>;
  if (!fundReturnsData) return null;
  return (
    <>
      {fundReturnsData.length ? (
        <div className="table-container">
          <table className="funds-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Returns</th>
                <th>Calculation</th>
              </tr>
            </thead>
            <tbody>
              {fundReturnsData.map((el) => (
                <tr key={el.formattedMonth}>
                  <td>{el.formattedMonth}</td>
                  <td>{`${el.returns}%`}</td>
                  <td>
                    <span>
                      {`Start nav(${el.startNav})`} &nbsp;
                      {el.formattedStartNavMonth}
                    </span>
                    <br />
                    <span>
                      {`Start nav(${el.endNav})`} &nbsp;
                      {el.formattedEndNavMonth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="info info-danger">No results Found</p>
      )}
    </>
  );
};

export default FundReturnsInfo;
