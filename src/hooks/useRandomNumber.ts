import { useState, useEffect } from "react";

const useRandomNumber = (pesertaLength: number, isSpinning: boolean) => {
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * pesertaLength);
        setRandomNumber(randomNumber);
      }, 75);

      return () => clearInterval(interval);
    }
  }, [isSpinning, pesertaLength]);

  return randomNumber;
};

export default useRandomNumber;
