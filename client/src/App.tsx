import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Metrics} from "./components/Metrics/Metrics.tsx";

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <div className={"container"}>
                <div className={"leftPanel"}></div>
                <div className={"rightPanel"}><Metrics/></div>
            </div>
        </QueryClientProvider>
    )
}

export default App
