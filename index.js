require("es6-promise").polyfill();
require("isomorphic-fetch");

function getData(ticker) {
  let url = `https://sandbox.iexapis.com/stable/stock/${ticker}/book?token=Tsk_75f8a00ef1ce400a9de5671974e6f490`;
  return fetch(url)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function main(i) {
  let arrTicker = [];
  let tickers = ["AAPL", "F", "T", "DIS", "FB", "LB", "LCN", "GPRO"];

  function doSetTimeout(i) {
    setTimeout(async function() {
      let data = await getData(tickers[i]);
      arrTicker.push(data);
      console.log(data);

      if (i <= 0) return;
      doSetTimeout(i - 1);
    }, 1000);
  }

  doSetTimeout(tickers.length - 1);
}

main();

