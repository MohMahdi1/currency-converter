import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setconverted] = useState("");
  const [Loading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const host = "api.frankfurter.app";
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${fromCur}&${toCur}`
        );
        const data = await res.json();
        setconverted(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setconverted(amount);
      convert();
    },
    [fromCur, toCur, amount]
  );

  return (
    <div>
      <input
        type="text"
        placeholder="enter a Number..."
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={Loading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={Loading}
      >
        {/* first part */}
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {/* second part */}
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={Loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {converted}
        {toCur}
      </p>
    </div>
  );
}

export default App;
