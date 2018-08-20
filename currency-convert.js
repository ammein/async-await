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
    // We care where the currency come from and to
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1');

    const euro = 1 / response.data.rates[from]; // get attr
    const rate = euro * response.data.rates[to];
    return rate;
}

const getCountries = async (currencyCode) => {
    const country = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return country.data.map((getCountry , index) => getCountry.name);
}

const convertCurrency = (from , to , amount) => {
    let convertedAmount;

    return getExchangeRate(from , to).then((rate)=> {
        // Make conversion
        convertedAmount = (amount * rate).toFixed(2); // Fixed to 2 decimal places
        console.log("Amount convert = ","$" + convertedAmount);
        // Return new promise to find getCountries
        return getCountries(to);
    }).then((countries)=> {
        console.log("List of countries : \n",countries);
        return `\n\n${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries : ${countries.join(',')}`;
    })
}

// getExchangeRate("USD" , "CAD").then((rate)=> console.log(rate));

// getCountries("USD").then((countries)=>{
//     console.log("Get countries : \n",countries);
// });

convertCurrency("USD" , "CAD" , 20).then((message)=>{
    console.log(message);
})