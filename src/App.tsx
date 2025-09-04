import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./pages";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContextProvider } from "./utils/contexts/AuthContext";
import { ConfirmationProvider } from "./utils/contexts/ConfirmationContext.tsx";
import { DarkModeProvider } from "./utils/contexts/DarkModeContext.tsx";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 0 } } });

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <DarkModeProvider>
                    <ConfirmationProvider>
                        <GlobalStyles />
                        <AuthContextProvider>
                            <ToastContainer />
                            <ReactQueryDevtools initialIsOpen={false} />
                            <MainLayout />
                        </AuthContextProvider>
                    </ConfirmationProvider>
                </DarkModeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
