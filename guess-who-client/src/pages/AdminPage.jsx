import { Icon } from "@iconify/react";
import { loadAllCharacters, loadAllUsers } from "../api/routes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  const goToProfile = (user) => {
    navigate("/profile");
  };

  const goToUsersPage = () => {
    navigate("/admin/users");
  };
  const goToBlockedUsersPage = () => {
    navigate("/admin/users");
  };

  const goToActivePlayersPage = () => {
    navigate("/notfound");
  };

  const goToCharactersPage = () => {
    navigate("/admin/characters");
  };
  const getAllUsers = async () => {
    try {
      const response = await loadAllUsers();
      console.log(response, "response");
      setUsers(response.users);
    } catch (error) {
      console.error("Error while fetching users:", error);
      return error;
    }
  };

  const getAllCharacters = async () => {
    try {
      const response = await loadAllCharacters();
      console.log(response, "response");
      setCharacters(response.characters);
    } catch (error) {
      console.error("Error while fetching users:", error);
      return error;
    }
  };

  const filterBlockedUsers = users.filter((user) => user.blocked === true);

  const filterPlayers = users.filter((user) => user.playerId !== null);
  console.log(filterBlockedUsers, "blocked users");
  console.log(filterPlayers, "active players");
  useEffect(() => {
    getAllUsers();
    getAllCharacters();
  }, []);
  return (
    <section className="section">
      <div className="container_title">
        <h1 className="w-full">Admin</h1>
        <span
          onClick={goToProfile}
          className="cursor-pointer p-2 border-2 border-accent4 text-white bg-accent4 rounded-full hover:bg-accent4-light hover:border-accent4 hover:text-accent4"
        >
          <Icon icon={"iconamoon:profile"} width={50} />
        </span>
      </div>
      <div className="container_cards gap-y-8 gap-x-12">
        <div onClick={goToUsersPage} className="admin-card bg-primary">
          <span className="admin-card-info">
            <Icon icon={"ph:users-thin"} width={100} />
            <h2 className="text-2xl">Users</h2>
          </span>
          <span className="admin-card-counter border border-primary">
            <h2 className="text-primary  text-7xl">
              {" "}
              {users.length > 0 ? users.length : 0}{" "}
            </h2>
          </span>
        </div>
        <div onClick={goToBlockedUsersPage} className="admin-card bg-accent1">
          <span className="admin-card-info">
            <Icon icon={"material-symbols-light:block"} width={100} />
            <h2 className="text-4xl">Blocked Users</h2>
          </span>
          <span className="admin-card-counter border border-accent1">
            <h2 className="text-accent1 text-7xl">
              {" "}
              {filterBlockedUsers.length > 0
                ? filterBlockedUsers.length
                : 0}{" "}
            </h2>
          </span>
        </div>
        <div onClick={goToActivePlayersPage} className="admin-card bg-accent2">
          <span className="admin-card-info">
            <Icon icon={"codicon:game"} width={100} />
            <h2 className="text-4xl">Active Players</h2>
          </span>
          <span className="admin-card-counter border border-accent2">
            <h2 className="text-accent2 text-7xl">
              {" "}
              {filterPlayers.length > 0 ? filterPlayers.length : 0}{" "}
            </h2>
          </span>
        </div>
        <div onClick={goToCharactersPage} className="admin-card bg-accent4">
          <span className="admin-card-info">
            <Icon icon={"ph:smiley-thin"} width={100} />
            <h2 className="text-4xl">Characters</h2>
          </span>
          <span className="admin-card-counter border border-accent4">
            <h2 className="text-accent4 text-7xl">
              {" "}
              {characters.length > 0 ? characters.length : 0}{" "}
            </h2>
            {/* <h1 className="testt">rrr</h1> */}
          </span>
        </div>
      </div>
    </section>
  );
}
