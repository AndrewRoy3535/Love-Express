import { createContext, useState, useEffect } from "react";
import { CreateUserTypes, Users } from "../component/types/types";
import { CreateBusContextTypes } from "../component/types/interfaces";
import axios from "axios";
import { apiUri } from "../utils/utility";

const UserContext = createContext<CreateBusContextTypes>({
  user: { name: "", password: "", confirmpassword: "", admin: false },
  setUser: () => {},
  users: [],
  setUsers: () => [],
  showUser: false,
  setShowUsers: () => {},
  handleOpenUsers: () => {},
  handleCloseUsers: () => {},
  fetchDataUser: async () => {},
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

  const uri: string = `${apiUri}/api/users`;
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    },
  };

  async function fetchDataUser() {
    await axios
      .get(uri, options)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchDataUser();
  }, []);

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
        fetchDataUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
