import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./pages";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import { ConfirmationProvider } from "./utils/useConfirmation";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const queryClient = new QueryClient();

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
