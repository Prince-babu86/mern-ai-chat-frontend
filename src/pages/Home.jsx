import HomeContainer from "../components/HomeContainer";
import { useAuth } from "../context/Authcontext";

import NewChatWelcome from "./chat/NewChat";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full">
      {isAuthenticated ? <NewChatWelcome /> : <HomeContainer />}
    </div>
  );
};

export default Home;
