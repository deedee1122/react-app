import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import DetailPage from "./DetailPage";

const listOfCurrency = [
  { id: 0, currency: "USD" },
  { id: 1, currency: "JPY" },
  { id: 2, currency: "EUR" },
  { id: 3, currency: "GBP" },
];

const SelectCurrency = () => {
  const [currencyList, setcurrencyList] = useState([]);
  const [currency, setcurrency] = useState("USD");

  useEffect(() => {
    fetch(
      `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${currency}&api_key=a8bd4eed1d7daafd77e45d1813e2f091b4817c38c0026172f96452f9dab2cc00`
    )
      .then((res) => res.json())
      .then((data) => {
        setcurrencyList(data.Data);
      });
  }, [currency]);

  const mylist = currencyList.map((s, id) => (
    <div key={s.CoinInfo.Id.toString()} className="rows">
      <Link to={`/detail/${id}`}>
        <div>{id + " " + s.CoinInfo.FullName}</div>
        <div>{s.DISPLAY[currency].PRICE}</div>
        <div>{s.DISPLAY[currency].MKTCAP}</div>
        <div>
          {((Number(s.DISPLAY[currency].PRICE.toString().slice("2")) -
            Number(s.DISPLAY[currency].CHANGE24HOUR.toString().slice("2"))) /
            Number(s.DISPLAY[currency].CHANGE24HOUR.toString().slice("2"))) *
            Number(100)}
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="header">
        <h1 className="logo">VFCrypto</h1>
        <div className="select-currency">
          <form>
            <select
              onChange={(e) => {
                setcurrencyList([]);
                setcurrency(e.target.value);
              }}
            >
              {listOfCurrency.map((currency, id) => (
                <option value={currency.currency} key={id}>
                  {currency.currency}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <div className="display-data">
        <div className="table-header">
          <div>CRYPTOCURRENCY</div>
          <div>PRICE</div>
          <div>MARKET CAP</div>
          <div>24H CHANGE</div>
        </div>
        <div className={`table-rows`}>{mylist}</div>
        <Redirect path="/detail/:id" component={DetailPage} />
      </div>
    </>
  );
};

export default SelectCurrency;
