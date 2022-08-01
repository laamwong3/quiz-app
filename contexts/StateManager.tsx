import { Children } from "react";
import { Notification } from "../components";
import InputContext from "./InputContext";
import NotificationContext from "./NotificationContext";

interface StateManageProps {
  children: React.ReactNode;
}

const StateManager = ({ children }: StateManageProps) => {
  return (
    <>
      <InputContext>
        <NotificationContext>
          <Notification />
          {children}
        </NotificationContext>
      </InputContext>
    </>
  );
};

export default StateManager;
