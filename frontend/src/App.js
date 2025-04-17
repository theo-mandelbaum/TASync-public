import { AuthContextProvider } from "./auth";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
