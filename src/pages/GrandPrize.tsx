import { useState, ReactNode } from "react";
import Button from "../components/ui/Button";
import CardImage from "../components/CardImage";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import UndianStatusBadge from "../components/UndianStatusBadges";
import useRandomNumber from "../hooks/useRandomNumber";

const GrandPrize: React.FC = () => {
  const [isSpinning, setSpinning] = useState(false);
  const [isAnnouncingWinner, setIsAnnouncingWinner] = useState(false);
  const {
    pemenang,
    peserta,
    doorprize,
    grandprize,
    setPeserta,
    setGrandprize,
    setPemenang,
  } = useData();
  const randomNumber = useRandomNumber(peserta.length, isSpinning);
  const navigate = useNavigate();

  const handleStopSpin = (): void => {
    setSpinning(!isSpinning);
    setIsAnnouncingWinner(true);
  };

  const handleNextSpin = (): void => {
    const updateGrandprize = grandprize.slice(1);
    setPeserta(peserta.filter((item) => item !== peserta[randomNumber]));
    setPemenang([
      ...pemenang,
      {
        peserta: peserta[randomNumber],
        hadiah: grandprize[0],
        isGrandprize: true,
      },
    ]);

    setGrandprize(updateGrandprize);
    setIsAnnouncingWinner(false);
    if (grandprize.length == 1) {
      navigate("/doorprize");
      return;
    }
  };

  const handlePrevSpin = (): void => {
    setIsAnnouncingWinner(false);
    const updatedPemenang = pemenang.slice(0, -1);
    setPemenang(updatedPemenang);
  };

  const buttonGroup = (): ReactNode => {
    if (isSpinning) return <Button onClick={handleStopSpin}>Stop Spin</Button>;
    if (isAnnouncingWinner)
      return (
        <>
          <Button onClick={handleNextSpin}>Continue</Button>
          <Button onClick={handlePrevSpin} outline={true}>
            Re-Spin
          </Button>
        </>
      );

    return (
      <>
        <Button onClick={() => setSpinning(!isSpinning)}>Start Spin</Button>
        <Button onClick={() => navigate("/doorprize")} color="secondary">
          DoorPrize
        </Button>
        <Button
          onClick={() => navigate("/winner")}
          outline={true}
          color="secondary"
        >
          List Winner
        </Button>
      </>
    );
  };

  return (
    <div className="bg-gray-200 w-full px-16 md:px-0 h-dvh">
      <UndianStatusBadge
        countDoorprize={doorprize.length}
        countGrandprize={grandprize.length}
        countPeserta={peserta.length}
      />
      <div className="flex flex-col items-center py-10">
        <Title>Grandprize HUT Finnet 18th</Title>
        <div className="mx-auto space-x-3 my-10">{buttonGroup()}</div>
        <div className="mx-10">
          <CardImage
            imageUrl={"/images/" + grandprize[0] + ".png"}
            title={grandprize[0]}
            imageHeight="500px"
          />
        </div>
        <h1 className="text-5xl font-bold mt-20">
          {(isSpinning || isAnnouncingWinner) && peserta[randomNumber]}
        </h1>
      </div>
    </div>
  );
};

export default GrandPrize;
