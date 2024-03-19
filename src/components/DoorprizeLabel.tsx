import Label from "./ui/Label";
import { doorprizePerSpin } from "../util/util";

type PrizeLabelProps = {
  prize: string[];
  peserta?: string[];
};

export const DoorprizeLabel = ({ prize, peserta = [] }: PrizeLabelProps) => {
  const spin = doorprizePerSpin();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(spin)].map(
        (_, rowIndex) =>
          prize[rowIndex] && (
            <Label
              key={rowIndex}
              label={
                peserta[rowIndex]
                  ? `${peserta[rowIndex]} - ${prize[rowIndex]}`
                  : prize[rowIndex]
              }
            />
          )
      )}
    </div>
  );
};
