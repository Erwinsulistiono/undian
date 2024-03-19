import Badge from "./ui/Badge";

interface UndianStatusBadgeProps {
  countPeserta: number | 0;
  countGrandprize: number | 0;
  countDoorprize: number | 0;
}

const UndianStatusBadge = ({
  countPeserta,
  countGrandprize,
  countDoorprize,
}: UndianStatusBadgeProps) => {
  return (
    <div className="absolute top-2 right-10 w-16 me-16 space-y-1">
      <Badge name="Peserta" count={countPeserta} />
      <Badge name="Grandprize" count={countGrandprize} />
      <Badge name="Doorprize" count={countDoorprize} />
    </div>
  );
};

export default UndianStatusBadge;
