type TitleProps = {
  children?: string;
};

export default function Title({ children = "Spin Hadiah" }: TitleProps) {
  return <h1 className="text-5xl font-semibold">{children}</h1>;
}
