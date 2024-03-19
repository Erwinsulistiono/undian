import Title from "../components/Title";
import { useData } from "./DataContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useState, ReactNode } from "react";
import { DoorprizeLabel } from "../components/DoorprizeLabel";
import UndianStatusBadge from "../components/UndianStatusBadges";
import { doorprizePerSpin, timeShuffle } from "../util/util";
import useShuffleArray from "../hooks/useShuffleArray";

const DoorPrize: React.FC = () => {
  const [isAnnouncingWinner, setIsAnnouncingWinner] = useState(false);
  const { pemenang, grandprize, setPeserta, setDoorprize, setPemenang } =
    useData();
  const navigate = useNavigate();
  const spin = doorprizePerSpin();
  const { doorprize, peserta, isSpinning, setIsSpinning } = useShuffleArray(
    timeShuffle()
  );

  const handleStopSpin = (): void => {
    setIsSpinning(!isSpinning);
    setIsAnnouncingWinner(true);
  };

  const handleNextSpin = (): void => {
    let numOfSlice: number = 0;
    const currPemenang = [...Array(spin)].map((_, rowIndex) => {
      if (doorprize[rowIndex] != undefined) numOfSlice++;
      return {
        peserta: peserta[rowIndex],
        hadiah: doorprize[rowIndex],
        isGrandprize: false,
      };
    });

    setPeserta(peserta.slice(numOfSlice));
    setDoorprize(doorprize.slice(numOfSlice));
    setPemenang([...pemenang, ...currPemenang]);
    if (
      peserta.slice(spin).length === 0 &&
      doorprize.slice(spin).length === 0
    ) {
      navigate("/winner");
    }
    setIsAnnouncingWinner(false);
  };

  const buttonGroup = (): ReactNode => {
    if (isSpinning) return <Button onClick={handleStopSpin}>Stop Spin</Button>;
    if (isAnnouncingWinner)
      return (
        <>
          <Button onClick={handleNextSpin}>Continue</Button>
          <Button onClick={() => setIsAnnouncingWinner(false)} outline={true}>
            Re-Spin
          </Button>
        </>
      );
    if (peserta.length === 0)
      return <Button onClick={() => navigate("/winner")}>List Winner</Button>;
    if (doorprize.length !== 0 && grandprize.length !== 0)
      return (
        <>
          <Button onClick={() => setIsSpinning(!isSpinning)}>Start Spin</Button>
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
          <Button onClick={() => setIsSpinning(!isSpinning)}>Start Spin</Button>
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
    <div className="bg-gray-200 w-full h-dvh pt-10">
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
