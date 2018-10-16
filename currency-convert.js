// USD , CAD , 20 dollars
// 20 USD is worth 26 CAD. You can spend these in the following countries : Canada
// From HTTP API

// http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1
const axios = require('axios');

// Normal function with Promise

// const getExchangeRate = (from , to) => {
//     // We care where the currency come from and to
//     return axios.get('http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1').then((response) =>{
//         const euro = 1/response.data.rates[from]; // get attr
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// }


// Async Function

const getExchangeRate = async (from, to) => {
    try {
        // We care where the currency come from and to
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1');
        const euro = 1 / response.data.rates[from]; // get attr
        const rate = euro * response.data.rates[to];

        // if rate is undefined or NAN
        if (isNaN(rate)) {
            // throw error
            throw new Error(); // this will continue on catch
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    }
}

const getCountries = async (currencyCode) => {
    try {
        const country = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return country.data.map((getCountry, index) => getCountry.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}.`)
    }
}

// const convertCurrency = (from , to , amount) => {
//     let convertedAmount;

//     return getExchangeRate(from , to).then((rate)=> {
//         // Make conversion
//         convertedAmount = (amount * rate).toFixed(2); // Fixed to 2 decimal places
//         console.log("Amount convert = ","$" + convertedAmount);
//         // Return new promise to find getCountries
//         return getCountries(to);
//     }).then((countries)=> {
//         console.log("List of countries : \n",countries);
//         return `\n\n${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries : ${countries.join(',')}`;
//     })
// }

// Shortcut Async Await
const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to)
    const countries = await getCountries(to)
    const convertedAmount = (amount * rate).toFixed(2);

    return `\n${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries : ${countries.join(',')}`;
    //     })
}

convertCurrency("USD" , "QQ" , 20).then((message)=>{
    console.log(message);
}).catch((e) =>{
    // Why e.message ? because we are going to fetch message output on then only , if not. It will return a code too
    console.log(e.message);
});


