import React, { useState } from "react";
import { Router, Link, Redirect } from "@reach/router";

const projects = [
  { id: 1, name: "Inbox" },
  { id: 2, name: "Shopping" },
  { id: 3, name: "Books" }
];

const Home = props => {
  if (!props.loggedIn) return <Redirect noThrow={true} to="/login" />;

  const projectId = projects[0].id;

  return <Redirect noThrow={true} to={`project/${projectId}`} />;
};

const Login = props => {
  if (props.loggedIn) return <Redirect noThrow={true} to="/" />;
  return <div>Login: {props.loggedIn ? "Logged In" : "Not logged in"}</div>;
};

const Project = props => {
  if (!props.loggedIn) return <Redirect noThrow={true} to="/" />;

  const project = projects.find(p => p.id === parseInt(props.id));

  if (!project) return <NotFound />;

  return (
    <AppContainer>
      Project:<strong>{project.name}</strong>
    </AppContainer>
  );
};

const Settings = props => {
  if (!props.loggedIn) return <Redirect noThrow={true} to="/" />;

  return <AppContainer>Settings</AppContainer>;
};

const NotFound = () => <div>404 | Page Not Found</div>;

const AppContainer = props => {
  return (
    <main>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
          </li>
        ))}
        <hr />
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      {props.children}
    </main>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn && <button onClick={() => setLoggedIn(false)}>Logout</button>}
      {!loggedIn && <button onClick={() => setLoggedIn(true)}>Log in</button>}
      <Router>
        <Redirect noThrow={true} from="project" to="/" />
        <Home path="/" loggedIn={loggedIn} />
        <Login path="login" loggedIn={loggedIn} />
        <Project path="project/:id" loggedIn={loggedIn} />
        <Settings path="settings" loggedIn={loggedIn} />
        <NotFound default />
      </Router>
    </div>
  );
};
export default App;
