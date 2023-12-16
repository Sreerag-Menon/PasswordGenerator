import { useCallback, useEffect, useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isnumber, setIsNumber] = useState(false);
  const [isChar, setIsChar] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz";
    let num = "123456789";
    let chars = "[]{}@$/!%*()~`";

    if (isnumber) str += num;
    if (isChar) str += chars;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isnumber, isChar]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isnumber, isChar]);

  const getPasswordCopy = () => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center  my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
            onClick={getPasswordCopy}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              className="cursor-pointer"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: ({length})</label>
            <div className="flex items-center gap-x-1"></div>
            <input
              type="checkbox"
              defaultChecked={isnumber}
              onChange={() => setIsNumber((prev) => !prev)}
              id="numberInput"
            />
            <label htmlFor="numberInput">Number</label>
            <input
              type="checkbox"
              defaultChecked={isChar}
              onChange={() => setIsChar((prev) => !prev)}
              id="charInput"
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
