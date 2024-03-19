import React from "react";
import { useData } from "./DataContext";
import Title from "../components/Title";
import { exportToPDFUtil as exportToPDF } from "../util/util";
import Button from "../components/ui/Button";
import { GrandPrizeLabel, DoorprizeLabel } from "../components/WinnerLabel";

const Winner: React.FC = () => {
  const { pemenang } = useData();

  return (
    <div className="flex flex-col items-center space-y-10 mt-10 w-4/5 mx-auto">
      <Title>Winner HUT Finnet 18th</Title>
      <Button onClick={exportToPDF}>Export to PDF</Button>
      <div className="flex mx-auto my-4">
        <GrandPrizeLabel pemenang={pemenang} />
      </div>
      <div className="flex mx-auto my-4">
        <DoorprizeLabel pemenang={pemenang} />
      </div>
    </div>
  );
};

export default Winner;
