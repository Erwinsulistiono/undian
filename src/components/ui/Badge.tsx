type BadgeProps = {
  name: string;
  count: number;
};

export default function Badge({ name, count }: BadgeProps) {
  return (
    <div className="w-40 bg-teal-500 hover:bg-blue-800 duration-300 py-2 px-4 text-gray-700 rounded font-bold">
      {name}
      <span className="bg-blue-700 text-blue-100 px-2 py-1 ml-2 rounded text-xs font-bold">
        {count}
      </span>
    </div>
  );
}
