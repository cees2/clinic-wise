import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./pages";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <MainLayout />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
