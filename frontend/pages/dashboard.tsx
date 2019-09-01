import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";

import Logout from "../components/login/Logout";
import useMeQuery from "../components/login/useMeQuery";
import { MainContainer, Sidebar, Main } from "../components/common";
import {
  ProjectOverview,
  ProjectList,
  ProjectListItem
} from "../components/project";
import { TopPanel } from "../components/menu";
import { ME_QUERY } from "../components/login/Me";
import { ADD_PROJECT_MUTATION } from "../components/project/AddProject";
import { DELETE_PROJECT_MUTATION } from "../components/project/DeleteProject";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [addProject] = useMutation(ADD_PROJECT_MUTATION);
  const [deleteProject] = useMutation(DELETE_PROJECT_MUTATION);
  const [projectName, setProjectName] = useState("");
  const { loading, error, data } = useMeQuery();

  if (loading) return "...";
  if (!data || !data.me) return "...";
  if (error) {
    Router.push("/login");
    return null;
  }

  return (
    <>
      <TopPanel align="right">
        <Logout refetchQueries={[{ query: ME_QUERY }]}>
          {(logout: Function) => <a onClick={() => logout()}>Kirjaudu ulos</a>}
        </Logout>
      </TopPanel>

      <MainContainer flex>
        <Sidebar>
          <div>
            <ProjectList>
              {data.me.projects.map(
                p =>
                  p.tasks && (
                    <ProjectListItem key={p.id}>
                      <span onClick={() => setSelectedProject(p.id)}>
                        {p.name}
                      </span>{" "}
                      <span className="text-small text-light">
                        {p.tasks.length}
                      </span>
                      <button
                        onClick={() => {
                          deleteProject({
                            variables: { id: p.id },
                            refetchQueries: [{ query: ME_QUERY }]
                          });
                        }}
                      >
                        &times;
                      </button>
                    </ProjectListItem>
                  )
              )}
            </ProjectList>
            <hr />
            <form
              onSubmit={e => {
                e.preventDefault();
                addProject({
                  variables: { name: projectName },
                  refetchQueries: [{ query: ME_QUERY }]
                });
                setProjectName("");
              }}
            >
              <h3>Create a project</h3>
              <input
                type="text"
                placeholder="Buy a car"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
              <button>Create</button>
            </form>
          </div>
        </Sidebar>
        <Main>
          {selectedProject && (
            <ProjectOverview
              project={data.me.projects.find(p => p.id === selectedProject)}
            />
          )}
        </Main>
      </MainContainer>
    </>
  );
}

export default App;
