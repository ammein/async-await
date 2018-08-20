// USD , CAD , 20 dollars
// 20 USD is worth 26 CAD. You can spend these in the following countries : Canada
// From HTTP API

// http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1

const getExchangeRate = (from , to) => {
    // We care where the currency come from and to
    axios.get('http://data.fixer.io/api/latest?access_key=2bc5fc5f310291aacd849b47e79ce158&format=1').then((response) =>{

    })
}