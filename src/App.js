import "./App.css";
import Navigations from "./Components/Navbar/navbar";
import Cronometro from "./Components/Cronometro/cronometro";
import ContoRovescia from "./Components/ContoAllaRovescia/counter";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Impostazione from "./Components/PomodoroTimer/impostazioneIniziale";
function App() {
  return (
    <>
      <Router>
        <Navigations />
        <Switch>
          <Route path="/cronometro">
            <Cronometro />
          </Route>
          <Route exact path="/">
            <ContoRovescia />
          </Route>
          <Route path="/pomodoroTimerImpostazione">
            <Impostazione />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
