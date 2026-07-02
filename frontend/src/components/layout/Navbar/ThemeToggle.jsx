import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if(theme === "light") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.add("light");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="rounded-xl border p-2 transition hover:bg-slate-100"
        >
            {
                theme === "light"
                    ? <Moon size={20}/>
                    : <Sun size={20}/>
            }
        </button>
    )
}

export default ThemeToggle;
