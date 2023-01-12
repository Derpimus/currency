const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('.amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');
const downloadBtn = document.querySelector('#download')

const calculate = () => {

    fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
        .then(res => res.json())
        .then(data => {
            currencyData = data[0].rates;
            const currency1Name = currencyOne.value;
            const currency2Name = currencyTwo.value;
            let rate1 = 1;
            let rate2 = 1;

            currencyData.forEach(data => {
                if (data.code === currency1Name) {
                    rate1 = data.mid;
                }
                if (data.code === currency2Name) {
                    rate2 = data.mid;
                }
            });
            rateInfo.innerHTML = 'rate info: ' + (rate2 / rate1).toFixed(4);
            amountTwo.value = (amountOne.value * rate2 / rate1).toFixed(2)

        })
}

const swap = () => {
    const oldValue = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = oldValue;
    calculate();
}

const download = () => {
    fetch(`https://api.nbp.pl/api/exchangerates/tables/A/`)
        .then(res => res.json())
        .then(data => {
            let yourDate = new Date();
            yourDate = yourDate.toISOString().split('T')[0];
            const a = document.createElement("a");
            const file = new Blob([JSON.stringify(data, null, 4)], {
                type: 'application/json'
            });
            a.href = URL.createObjectURL(file);
            a.download = 'currency data ' + yourDate;
            a.click();

        });
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap)
downloadBtn.addEventListener('click', download)


calculate();