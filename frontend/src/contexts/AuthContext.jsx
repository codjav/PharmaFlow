import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Future:
        // Restore session from Electron Store / SQLite if needed.
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUser = (updatedUser) => {
        setUser((previousUser) => ({
            ...previousUser,
            ...updatedUser,
        }));
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

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used inside AuthProvider."
        );
    }

    return context;
};