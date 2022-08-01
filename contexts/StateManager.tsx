import { Children } from "react";
import { Notification } from "../components";
import NotificationContext from "./NotificationContext";

interface StateManageProps {
  children: React.ReactNode;
}

const StateManager = ({ children }: StateManageProps) => {
  return (
    <>
      <NotificationContext>
        <Notification />
        {children}
      </NotificationContext>
    </>
  );
};

export default StateManager;
