import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import "bootstrap";
import "./index.css";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
    const { token, login, logout, userId } = useAuth;

    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider
            value={{ token, login, logout, userId, isAuthenticated }}>
            <BrowserRouter>
                <Navbar />
                {routes}
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
