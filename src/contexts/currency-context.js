import { createContext, useState, useContext } from 'react';


export const currencyContext = createContext();

export const {Provider} = currencyContext;

export const currenciesMap = {
  USD: {label: 'usd', rate: 1, sing: '$',},
  KZT: {label: 'kzt', rate: 450, sing: '₸',},
  EUR: {label: 'euro', rate: 0.9, sing: '€',}
};
  
const currenciesMapArr = Object.entries(currenciesMap);

const currencies = currenciesMapArr.map(([key, {label}]) => (
  {
    key,
    label}
));

export function CurrencyProvider({children}) {
  const [currency, setCurrency] = useState('USD');
  const {rate, sing} = currenciesMap[currency];
  const convert = (amount) => `${(rate * amount).toFixed(2)} ${sing}`;
  
  return (
    <Provider value={{currencies, currency, setCurrency, convert}}>
      {children}
    </Provider>
  );
}

export function Convert({value}) {
  const {convert} = useContext(currencyContext);
  return convert(value);
}

export default currencyContext;



