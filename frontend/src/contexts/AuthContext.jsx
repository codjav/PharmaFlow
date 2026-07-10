import {
    createContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Restore login after refresh
    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");

        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);

                if (parsed.user) {
                    setUser(parsed.user);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Invalid auth data", error);
                localStorage.removeItem("auth");
            }
        }

        setIsLoading(false);
    }, []);

    const login = ({ user }) => {
        setUser(user);
        setIsAuthenticated(true);

        localStorage.setItem(
            "auth",
            JSON.stringify({ user })
        );
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);

        localStorage.removeItem("auth");
    };

    const updateUser = (updatedUser) => {
        const newUser = {
            ...user,
            ...updatedUser,
        };

        setUser(newUser);

        localStorage.setItem(
            "auth",
            JSON.stringify({
                user: newUser,
            })
        );
    };

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
            updateUser,
        }),
        [user, isAuthenticated, isLoading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;