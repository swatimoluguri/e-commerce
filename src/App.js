import Routings from "./components/Partials/Routings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, persistor } from "./utils/AppStore";
import UserContext from "./utils/UserContext";
import { useState } from "react";
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";

function App() {
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
        <UserContext.Provider value={{ loggedInUser: loggedUser, setLoggedUser }}>
          <div className="App">
            <Navbar />
            <Routings />
            <Footer />
          </div>
        </UserContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;
