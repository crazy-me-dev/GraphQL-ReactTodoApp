import RedirectAfterUnauth from "../components/login/RedirectAfterUnauth";
import Logout from "../components/login/Logout";
import Me, { IMeQueryResult } from "../components/login/Me";
import { ME_QUERY } from "../components/login/Me";
import { Box, Container } from "../components/common";
import { TopPanel } from "../components/menu";

function App() {
  return (
    <RedirectAfterUnauth to="/login">
      <Me>
        {({ data, loading, error }: IMeQueryResult) => {
          if (loading) return "...";
          if (!data || !data.me) return "...";
          if (error) return "Error";
          return (
            <>
              <TopPanel align="right">
                <Logout refetchQueries={[{ query: ME_QUERY }]}>
                  {(logout: Function) => (
                    <a onClick={() => logout()}>Kirjaudu ulos</a>
                  )}
                </Logout>
              </TopPanel>
              <Container>
                <Box>
                  <div>
                    <p>Heya, {data.me.name}!</p>
                  </div>
                </Box>
              </Container>
            </>
          );
        }}
      </Me>
    </RedirectAfterUnauth>
  );
}

export default App;
