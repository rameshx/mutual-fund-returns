const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getPreviousYearDate = (years) => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - years));
};

export const getPreviousMonthDate = (months) => {
  return new Date(new Date().setMonth(new Date().getMonth() - months));
};

export const getPreviousDayDate = (days) => {
  return new Date(new Date().setDate(new Date().getDate() - days));
};

export const getNextDayDateForAGivenDate = (days, date) => {
  return new Date(date.setDate(date.getDate() + days));
};

export const formatDate = (date) => {
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('-');
};

export const getNavValue = (date, mfApiData, originalMonth) => {
  if (date.getMonth() !== originalMonth) {
    return undefined;
  }
  const navObj = mfApiData.find((el) => {
    return el.date === formatDate(date);
  });
  if (!navObj) {
    return getNavValue(
      getNextDayDateForAGivenDate(1, date),
      mfApiData,
      originalMonth
    );
  }
  return navObj;
};

const roundToTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2');
};

const calcReturns = (startNav, endNav, poi) => {
  if (startNav === 0 || endNav === 0) {
    return 0;
  }
  return roundToTwo((Math.pow(endNav / startNav, 1 / poi) - 1) * 100);
};

const convertDDMMYYYToDDMMMYYYY = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${day}-${monthNames[month - 1].slice(0,3)}-${year}`;
};

export const getFundReturnsData = (fromDate, toDate, poi, mfApiData) => {
  const fromYear = fromDate.getFullYear();
  const fromMonth = fromDate.getMonth();
  const toYear = toDate.getFullYear();
  const toMonth = toDate.getMonth();
  const funReturnsData = [];
  for (let year = fromYear; year <= toYear; year++) {
    let month = year === fromYear ? fromMonth : 0;
    const monthLimit = year === toYear ? toMonth : 11;
    for (; month <= monthLimit; month++) {
      const topValue = `${
        month + 1 < 10 ? `0${month + 1}` : `${month + 1}`
      }-${toDate.getDate()}-${year - poi}`;
      const bottomValue = `${
        month + 1 < 10 ? `0${month + 1}` : `${month + 1}`
      }-${toDate.getDate()}-${year}`;
      const endNavValue = getNavValue(
        new Date(topValue),
        mfApiData,
        new Date(topValue).getMonth()
      );
      const startNavValue = getNavValue(
        new Date(bottomValue),
        mfApiData,
        new Date(topValue).getMonth()
      );
      funReturnsData.push({
        year,
        month,
        date: toDate.getDate(),
        formattedStartNavMonth: startNavValue
          ? convertDDMMYYYToDDMMMYYYY(startNavValue.date)
          : `${toDate.getDate()}-${monthNames[month].slice(0, 3)}-${(year - poi)
              .toString()
              .slice(-2)}`,
        formattedEndNavMonth: endNavValue
          ? convertDDMMYYYToDDMMMYYYY(endNavValue.date)
          : `${toDate.getDate()}-${monthNames[month].slice(
              0,
              3
            )}-${year.toString().slice(-2)}`,
        formattedMonth: `${monthNames[month].slice(
          0,
          3
        )}-${year.toString().slice(-2)}`,
        returns: calcReturns(
          startNavValue ? startNavValue.nav : 0,
          endNavValue ? endNavValue.nav : 0,
          poi
        ),
        startNav: startNavValue ? startNavValue.nav : 0,
        endNav: endNavValue ? endNavValue.nav : 0,
      });
    }
  }
  return funReturnsData;
};
