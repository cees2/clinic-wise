import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./pages";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { ConfirmationProvider } from "./utils/useConfirmation";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DEFAULT_DATA_STALE_TIME } from "./utils/constants";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: DEFAULT_DATA_STALE_TIME } } });

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ConfirmationProvider>
                    <ToastContainer />
                    <ReactQueryDevtools initialIsOpen={false} />
                    <GlobalStyles />
                    <MainLayout />
                </ConfirmationProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
