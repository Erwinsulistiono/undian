import { useEffect, useState } from "react";
import { useData } from "../pages/DataContext";

export default function useShuffleArray(time: number) {
  const [isSpinning, setIsSpinning] = useState(false);
  const { peserta, doorprize, setPeserta, setDoorprize } = useData();

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        shuffleArrays();
      }, time);
      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleArrays = (): void => {
    const shuffledPesertaSubset = shuffleArray(peserta);
    const shuffledDoorprizeSubset = shuffleArray(doorprize);

    setPeserta([...shuffledPesertaSubset]);
    setDoorprize([...shuffledDoorprizeSubset]);
  };

  return { peserta, doorprize, isSpinning, setIsSpinning };
}
