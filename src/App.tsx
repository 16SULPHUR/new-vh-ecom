import { v4 as uuidv4 } from "uuid"; // Import uuid
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router";
import { ScrollArea } from "./components/ui/scroll-area";
import { Toaster } from "./components/ui/toaster";

// Utility function to create bag_id if it doesn't exist
function createBagId() {
    const existingBagId = localStorage.getItem("cartId");
    if (!existingBagId) {
        const newBagId = uuidv4(); // Generate unique id
        localStorage.setItem("cartId", newBagId);
        console.log(`New cartId created: ${newBagId}`);
    } else {
        console.log(`Existing cartId: ${existingBagId}`);
    }
}

export default function App() {
    // Create bag_id on app initialization
    createBagId();

    return (
        <ScrollArea>
            <RouterProvider router={router} />
            <Toaster />
        </ScrollArea>
    );
}
