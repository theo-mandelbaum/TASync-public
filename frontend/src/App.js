import { AuthContextProvider } from "./auth";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "./components/ui/provider";
// import "./css/global.css";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-grids/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
