"use-client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

type Theme = "dark" | "daylight";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
    mounted: boolean;
}

