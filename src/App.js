import Routings from "./components/Partials/Routings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppStore, persistor } from "./utils/AppStore";
import Navbar from "./components/Partials/Navbar";
import Footer from "./components/Partials/Footer";

function App() {

  return (
    <Provider store={AppStore}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Navbar />
          <Routings />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
