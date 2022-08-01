import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface NotificationContextProps {
  children: React.ReactNode;
}

interface Notification {
  type: "error" | "warning" | "info" | "success";
  message: string;
  open: boolean;
}

interface StateTypes {
  notification: Notification;
  setNotification: Dispatch<SetStateAction<Notification>>;
}

const NotificationContextStore = createContext({} as StateTypes);
const NotificationContext = ({ children }: NotificationContextProps) => {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    message: "",
    type: "success",
  });

  return (
    <>
      <NotificationContextStore.Provider
        value={{ notification, setNotification }}
      >
        {children}
      </NotificationContextStore.Provider>
    </>
  );
};

export default NotificationContext;
export const useNotification = () => useContext(NotificationContextStore);
