import TextEditor from "./components/TextEditor";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${crypto.randomUUID()}`} />
        </Route>
        <Route path="/documents/:id">
          <TextEditor />;
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
