// DataContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface Pemenang {
  peserta: string;
  hadiah: string;
  isGrandprize?: boolean | undefined;
}

interface DataContextProps {
  peserta: string[];
  grandprize: string[];
  doorprize: string[];
  pemenang: Pemenang[];
  blacklist: string[];
  setPeserta: React.Dispatch<React.SetStateAction<string[]>>;
  setGrandprize: React.Dispatch<React.SetStateAction<string[]>>;
  setDoorprize: React.Dispatch<React.SetStateAction<string[]>>;
  setPemenang: React.Dispatch<React.SetStateAction<Pemenang[]>>;
  setBlacklist: React.Dispatch<React.SetStateAction<string[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [peserta, setPeserta] = useState<string[]>([]);
  const [grandprize, setGrandprize] = useState<string[]>([]);
  const [doorprize, setDoorprize] = useState<string[]>([]);
  const [pemenang, setPemenang] = useState<Pemenang[]>([]);
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [doorprizeLength, setDoorprizeLength] = useState<number>(0);
  const [stateUpdatesExecuted, setStateUpdatesExecuted] = useState(false);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setData: (data: string[]) => void
    ) => {
      try {
        const response = await fetch(url);
        const data = await response.text();

        setData(data.split("\r\n"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("./grandprize.txt", setGrandprize);
    fetchData("./peserta.txt", setPeserta);
    fetchData("./doorprize.txt", setDoorprize);
    fetchData("./blacklist.txt", setBlacklist);
  }, []);

  useEffect(() => {
    setDoorprizeLength(doorprize.length - blacklist.length);
    console.log(doorprizeLength);
    if (!stateUpdatesExecuted) {
      blacklist.forEach((pesertaBlacklist) => {
        setPemenang((prevPemenang) => [
          ...prevPemenang,
          {
            peserta: pesertaBlacklist,
            hadiah: doorprize[doorprize.length - 1],
            isGrandprize: false,
          },
        ]);

        setPeserta((prevPeserta) =>
          prevPeserta.filter((value) => value !== pesertaBlacklist)
        );

        setDoorprize(doorprize.slice(0, doorprizeLength));
      });
    } else {
      setStateUpdatesExecuted(true);
    }
  }, [blacklist]);

  return (
    <DataContext.Provider
      value={{
        peserta,
        setPeserta,
        grandprize,
        setGrandprize,
        doorprize,
        setDoorprize,
        pemenang,
        setPemenang,
        blacklist,
        setBlacklist,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
