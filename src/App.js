import Routings from "./components/Routings";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import UserContext from "./utils/UserContext";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <Provider store={AppStore}>
      <UserContext.Provider value={{ loggedInUser: loggedUser, setLoggedUser }}>
        <div className="App">
          <Navbar />
          <Routings />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
