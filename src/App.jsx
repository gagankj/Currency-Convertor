import React, { useState } from 'react'
import { useEffect } from 'react'

const App = () => {

  const [currencies,setCurrencies]=useState([])
  const [fromcurr,setfrom]=useState("usd")
  const [tocurr,setto]=useState("inr")
  const [fromCurrency,setFromCurrency]=useState(0)
  const [toCurrency,setToCurrency]=useState(0)

  const [fromCurrencyName,setFromCurrencyName]=useState("US Dollar")
  const [toCurrencyName,setToCurrencyName]=useState("Indian Rupees")

  useEffect(()=>{
    async function fetchData(){
      const response= await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
      const data= await response.json()
      setCurrencies(Object.keys(data));
      setFromCurrencyName(data[fromcurr]);
      setToCurrencyName(data[tocurr])



    }
    fetchData()
    async function fetchRate(){
      const response2=await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcurr}.json`)
      const data2=await response2.json();
      const array=data2[fromcurr]
      // console.log(array)
      const array2=array[tocurr]
      // console.log(array2)
      let total=fromCurrency*array2
      setToCurrency(total)
      // console.log(Object.values(array2))



    }
    fetchRate()
  },[fromcurr,tocurr,fromCurrency])
  return (
    <div className="h-screen pt-10 flex justify-center items-center flex-col w-screen">
      <h1 className='mb-10'>Currency Convertor</h1>
      
      <div className="h-2/6 p-6 w-2/5 mb-10 flex flex-col rounded-2xl  bg-slate-600">
      <div className="flex justify-center mb-10">
        
      <label className='text-3xl mr-10' htmlFor="">From</label>
      <select onChange={(e)=>setfrom(e.target.value)} className='bg-black p-2 rounded-md text-blue-600 text-xl' >
        {currencies.map((item)=>(<option selected={item === "usd"} value={item}>{item}</option>))}
      </select>
      </div>
      <label className='text-2xl text-center mb-5' htmlFor="">{fromCurrencyName}</label>
      <div className="flex justify-center items-center">

      <input min={0} value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)} defaultValue={0} className='w-1/2 text-center h-24 bg-black rounded-lg text-blue-700 text-4xl p-5' type="number" />
      </div>
      </div>
  
      <div className="h-2/6 p-6 w-2/5 rounded-xl bg-slate-600">
      <div className="flex justify-center items-center mb-10">

      <label className='text-3xl mr-10' htmlFor="to">To</label>
      <select onChange={(e)=>setto(e.target.value)} className='bg-black p-2 rounded-md text-blue-600 text-xl' >
        {currencies.map((item)=>(<option selected={item === "inr"} value={item}>{item}</option>))}
      </select>
      </div>
      <h1 className='text-center text-2xl mb-5' htmlFor="">{toCurrencyName}</h1>
      <div className="flex justify-center items-center">

      <input defaultValue="0" value={toCurrency.toFixed(3)} className='w-1/2 text-center h-24 bg-black rounded-lg text-blue-700 text-4xl p-5' type="number" />
      </div>
      </div>
    
    </div>
  )
}

export default App