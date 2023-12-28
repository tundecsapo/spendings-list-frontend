import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { Navigation } from "./components/Navigation";
import { SpendingsPage } from "./pages/spendings/SpendingsPage";
import { theme } from "./theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Navigation>
        <SpendingsPage />
      </Navigation>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
