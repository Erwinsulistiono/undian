import Label from "./ui/Label";
import { Pemenang } from "../pages/DataContext";

type WinnerLabelProps = {
  pemenang: Pemenang[];
};

export const DoorprizeLabel = ({ pemenang }: WinnerLabelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(pemenang.length)].map(
        (_, rowIndex) =>
          pemenang[rowIndex] &&
          !pemenang[rowIndex].isGrandprize && (
            <Label
              key={rowIndex}
              label={`${pemenang[rowIndex].peserta} - ${pemenang[rowIndex].hadiah}`}
            />
          )
      )}
    </div>
  );
};

export const GrandPrizeLabel = ({ pemenang }: WinnerLabelProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(pemenang.length)].map(
        (_, rowIndex) =>
          pemenang[rowIndex] &&
          pemenang[rowIndex].isGrandprize && (
            <Label
              key={rowIndex}
              label={`${pemenang[rowIndex].peserta} - ${pemenang[rowIndex].hadiah}`}
            />
          )
      )}
    </div>
  );
};
