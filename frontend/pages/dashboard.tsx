import RedirectAfterUnauth from "../components/login/RedirectAfterUnauth";
import Logout from "../components/login/Logout";
import Me, { IMe } from "../components/login/Me";
import { ME_QUERY } from "../components/login/Me";
import { Box } from "../components/common";

function App() {
  return (
    <RedirectAfterUnauth to="/login">
      <Box>
        <Me>
          {({ data, loading, error }) => {
            const me: IMe = data.me;
            if (loading) return "...";
            if (!me) return "...";
            if (error) return "Error";
            return (
              <div>
                <p>
                  <Logout refetchQueries={[{ query: ME_QUERY }]} />
                </p>
                <p>Heya, {me.name}!</p>
              </div>
            );
          }}
        </Me>
      </Box>
    </RedirectAfterUnauth>
  );
}

export default App;
