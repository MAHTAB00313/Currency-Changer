import React,{useState} from 'react';
import InputBox from './components/InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'


function App(props) {
    
    // const bgI = "https://img.freepik.com/free-vector/indian-rupee-currency-exchange_23-2147994090.jpg?size=626&ext=jpg&ga=GA1.1.238745110.1707314362&semt=ais"
    const bgI = "https://img.freepik.com/free-vector/flat-people-holding-euro-dollar-coins-currency-exchange_88138-568.jpg?size=626&ext=jpg&ga=GA1.1.238745110.1707314362&semt=ais"

    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");

    // using useCurrencyInfo 
    const currInfo = useCurrencyInfo(from);

    // converting currInfo to for the options
    const options = Object.keys(currInfo);

    // swap functionality

    const swap = () => {
        setFrom(to);
        setTo(from);
        setAmount(convertedAmount);
        setConvertedAmount(amount);
    }

    // conveting the value
    const convert = () => {
        setConvertedAmount( amount * currInfo[to])
    };


    return (
        <div className='w-full  h-screen grid grid-cols-2'>
            <div className="img">
                <h1 className='leftH'>Currency Convertor</h1>
            </div>

            <div className="right h-screen">
            <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundColor: `#2f2f2f`,
            }}
        >
            <div className="w-full">
                    <h1 className='text-center text-white text-4xl font-semibold mb-10 '>Currency Convertor</h1>
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                selectCurrency={from}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                onClick={swap}
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-500  hover:rotate-45 focus:rotate-180"
                                
                            >
                                {/* <i class="bi bi-arrow-repeat"></i> */}
                                <i class="bi bi-arrow-down-up text-bolder" ></i>
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                selectCurrency={to}
                                onAmountChange={(amount) => setConvertedAmount(amount)}
                                onCurrencyChange={(currency) => setTo(currency)}
                                amountDisable
                                
                            />
                        </div>
                        <button
                        type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
}

export default App;