interface LabelProps {
  label: string;
}

export default function Label({ label }: LabelProps) {
  return (
    <div className="flex justify-center text-5xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
      <p className="text-base">{label}</p>
    </div>
  );
}
