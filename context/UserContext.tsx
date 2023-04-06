import { createContext, useState } from "react";
import { CreateUserTypes } from "../component/types/types";
import { CreateBusContextTypes } from "../component/types/interfaces";

const UserContext = createContext<CreateBusContextTypes>({
  user: { name: "", password: "", confirmpassword: "", admin: false },
  setUser: () => {},
  users: [
    {
      name: "",
      password: "",
      confirmpassword: "",
      admin: false,
    },
  ],
  setUsers: () => [{}],
  showUser: false,
  setShowUsers: () => {},
  handleOpenUsers: () => {},
  handleCloseUsers: () => {},
});

export default UserContext;

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<CreateUserTypes>({
    name: "",
    password: "",
    confirmpassword: "",
    admin: false,
  });
  const [users, setUsers] = useState<CreateUserTypes[]>([]);
  const [showUser, setShowUsers] = useState<boolean>(false);
  const handleOpenUsers = () => setShowUsers(true);
  const handleCloseUsers = () => setShowUsers(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        showUser,
        setShowUsers,
        handleCloseUsers,
        handleOpenUsers,
      }}>
      {children}
    </UserContext.Provider>
  );
};
