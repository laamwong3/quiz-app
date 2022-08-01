import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface InputContextProps {
  children: React.ReactNode;
}

interface Input {
  player: string;
  category: number;
  difficulty: "easy" | "medium" | "hard";
}

interface StateTypes {
  input: Input;
  setInput: Dispatch<SetStateAction<Input>>;
}

const InputContextStore = createContext({} as StateTypes);
const InputContext = ({ children }: InputContextProps) => {
  const [input, setInput] = useState<Input>({
    player: "",
    category: 9,
    difficulty: "easy",
  });
  return (
    <>
      <InputContextStore.Provider value={{ input, setInput }}>
        {children}
      </InputContextStore.Provider>
    </>
  );
};

export default InputContext;
export const useInput = () => useContext(InputContextStore);
