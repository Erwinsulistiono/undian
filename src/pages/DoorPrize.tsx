import Title from "../components/Title";
import { useData } from "./DataContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useState, useEffect, ReactNode } from "react";
import { DoorprizeLabel } from "../components/DoorprizeLabel";
import UndianStatusBadge from "../components/UndianStatusBadges";
import { doorprizePerSpin } from "../util/util";

const DoorPrize: React.FC = () => {
  const [isSpinning, setSpinning] = useState(false);
  const [isAnnouncingWinner, setIsAnnouncingWinner] = useState(false);
  const {
    pemenang,
    peserta,
    doorprize,
    grandprize,
    setPeserta,
    setDoorprize,
    setPemenang,
  } = useData();
  const navigate = useNavigate();
  const spin = doorprizePerSpin();

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        shuffleArrays();
      }, 60);
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

  const stopSpin = (): void => {
    setSpinning(!isSpinning);
    setIsAnnouncingWinner(true);
  };

  const nextSpin = (): void => {
    const currPemenang = [...Array(spin)].map((_, rowIndex) => {
      return {
        peserta: peserta[rowIndex],
        hadiah: doorprize[rowIndex],
        isGrandprize: false,
      };
    });

    setPeserta(peserta.slice(spin));
    setDoorprize(doorprize.slice(spin));
    setPemenang([...pemenang, ...currPemenang]);
    if (
      peserta.slice(spin).length === 0 &&
      doorprize.slice(spin).length === 0
    ) {
      navigate("/winner");
    }
    setIsAnnouncingWinner(false);
  };

  const prevSpin = (): void => {
    setIsAnnouncingWinner(false);
    const updatedPemenang = pemenang.slice(0, -1);
    setPemenang(updatedPemenang);
  };

  const buttonGroup = (): ReactNode => {
    if (isSpinning) return <Button onClick={stopSpin}>Stop Spin</Button>;
    if (isAnnouncingWinner)
      return (
        <>
          <Button onClick={nextSpin}>Continue</Button>
          <Button onClick={prevSpin} outline={true}>
            Re-Spin
          </Button>
        </>
      );
    if (peserta.length === 0)
      return <Button onClick={() => navigate("/winner")}>List Winner</Button>;
    if (doorprize.length !== 0 && grandprize.length !== 0)
      return (
        <>
          <Button onClick={() => setSpinning(!isSpinning)}>Start Spin</Button>
          <Button
            onClick={() => navigate("/winner")}
            color="secondary"
            outline={true}
          >
            List Winner
          </Button>
          <Button onClick={() => navigate("/grandprize")} color="secondary">
            GrandPrize
          </Button>
        </>
      );
    if (doorprize.length === 0 && grandprize.length > 0)
      return (
        <>
          <Button onClick={() => navigate("/winner")}>List Winner</Button>
          <Button onClick={() => navigate("/grandprize")} color="secondary">
            GrandPrize
          </Button>
        </>
      );

    if (doorprize.length !== 0 && grandprize.length === 0)
      return (
        <>
          <Button onClick={() => setSpinning(!isSpinning)}>Start Spin</Button>
          <Button
            onClick={() => navigate("/winner")}
            color="secondary"
            outline={true}
          >
            List Winner
          </Button>
        </>
      );
  };

  return (
    <div className="bg-gray-200 w-full h-full pt-10">
      <UndianStatusBadge
        countDoorprize={doorprize.length}
        countGrandprize={grandprize.length}
        countPeserta={peserta.length}
      />
      <div className="flex flex-col items-center space-y-10 w-4/5 mx-auto">
        <Title>Doorprize HUT Finnet 18th</Title>
        <div className="mx-auto space-x-3">{buttonGroup()}</div>
        <div className="flex mx-auto my-4">
          {doorprize.length ? (
            <DoorprizeLabel
              prize={doorprize}
              peserta={isAnnouncingWinner || isSpinning ? peserta : []}
            />
          ) : (
            <p className="text-xl mx-auto">Tidak ada Doorprize</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoorPrize;
