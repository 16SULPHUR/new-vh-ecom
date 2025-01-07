import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { ScrollArea } from "./components/ui/scroll-area";

export default function App() {
    return (
        <ScrollArea>
            <RouterProvider router={router} />
        </ScrollArea>
    )
}
