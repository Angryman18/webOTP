import { useEffect, useLayoutEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [otp, setOtp] = useState("");
  const inputRef = useRef(null);
  const ac = useRef(new AbortController());

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOtp = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    if ("OTPCredential" in window) {
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
        })
        .then((otp) => {
          console.log("GOT Code ", otp);
          setOtp(otp.code);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = async () => {};

  // SMS should be in format and last line @domain_name #OTP
  // like this
  // Your OTP is: 123456
  //
  // @test.junior-dev.com #123456
  // smss

  return (
    <div>
      <input
        style={{ padding: 10 }}
        value={otp}
        onChange={handleOtp}
        type='text'
        id='otp'
        autoComplete='one-time-code'
      />
      <br />
      <br />
      <button type='submit' onClick={handleSubmit}>
        Submit OTP
      </button>
    </div>
  );
}

export default App;
