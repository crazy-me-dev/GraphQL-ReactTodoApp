import RedirectAfterUnauth from "../components/login/RedirectAfterUnauth";
import Logout from "../components/login/Logout";
import Me from "../components/login/Me";
import { ME_QUERY } from "../components/login/Me";
import { Box } from "../components/common";

function App() {
  return (
    <RedirectAfterUnauth to="/login">
      <Box>
        <Me>
          {({ data, loading, error }) => {
            if (loading) return "...";
            if (!data.me) return "...";
            if (error) return "Error";
            return (
              <div>
                <p>
                  <Logout refetchQueries={[{ query: ME_QUERY }]} />
                </p>
                <p>Hey, {data.me.name}!</p>
              </div>
            );
          }}
        </Me>
      </Box>
    </RedirectAfterUnauth>
  );
}

export default App;
