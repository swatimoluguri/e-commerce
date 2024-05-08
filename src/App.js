import Routings from "./components/Routings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, persistor } from "./utils/AppStore"; // Import the updated AppStore and persistor
import UserContext from "./utils/UserContext";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
