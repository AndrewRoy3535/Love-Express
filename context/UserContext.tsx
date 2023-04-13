import { createContext, useState, useEffect } from "react";
import { CreateUserTypes, Users } from "../component/types/types";
import { CreateBusContextTypes } from "../component/types/interfaces";
import axios from "axios";

const UserContext = createContext<CreateBusContextTypes>({
  user: { name: "", password: "", confirmpassword: "", admin: false },
  setUser: () => {},
  users: [],
  setUsers: () => [],
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
  const [users, setUsers] = useState<Users[]>([]);

  const [showUser, setShowUsers] = useState<boolean>(false);
  const handleOpenUsers = () => setShowUsers(true);
  const handleCloseUsers = () => setShowUsers(false);
  const uri: string = "http://localhost:3000/api/users";

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(uri)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((e) => console.log(e));
    }
    fetchData();
  }, []);

  console.log(users);

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
