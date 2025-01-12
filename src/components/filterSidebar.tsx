import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Menu, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const sizes = [
    "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL",
];

export const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState([695, 4995]);
    const [inStock, setInStock] = useState(false);
    const [readyToShip, setReadyToShip] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleMenuItemClick = () => {
        setIsOpen(false); // Close the sheet
    };

    const SidebarContent = () => (
        <div className="my-5 overflow-auto h-full">
            {/* Price Range */}
            <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                    defaultValue={[695, 4995]}
                    max={4995}
                    min={695}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                />
                <div className="flex justify-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                </div>
            </div>

            {/* Availability */}
            <div>
                <h3 className="font-medium mb-4">Availability</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="in-stock"
                            checked={inStock}
                        //   onCheckedChange={setInStock}
                        />
                        <label htmlFor="in-stock">Display In-stock Product</label>
                    </div>
                </div>
            </div>

            {/* Delivery */}
            <div>
                <h3 className="font-medium mb-4">Delivery</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="ready-to-ship"
                            checked={readyToShip}
                        //   onCheckedChange={setReadyToShip}
                        />
                        <label htmlFor="ready-to-ship">Ready to Ship</label>
                    </div>
                </div>
            </div>

            {/* Size */}
            <div>
                <h3 className="font-medium mb-4">Size</h3>
                <div className="space-y-2">
                    {sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                                id={`size-${size}`}
                                checked={selectedSizes.includes(size)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedSizes([...selectedSizes, size]);
                                    } else {
                                        setSelectedSizes(selectedSizes.filter((s) => s !== size));
                                    }
                                }}
                            />
                            <label htmlFor={`size-${size}`}>{size}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-96">
            <div className="md:hidden px-5">
                <div className="flex justify-between gap-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full gap-2 px-4 py-2.5 text-base font-normal text-neutral-900 hover:bg-white rounded-none border-black"
                            >
                                Filters <SlidersHorizontal size={18} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="text-primary bg-inherit h-screen overflow-auto">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                    <div className="flex-grow">
                        <SortByButton />
                    </div>
                </div>
            </div>
            <div className="md:flex hidden">
                <SidebarContent />
            </div>
        </div>
    );
};

export const SortByButton = () => {
    return (
        <div className="w-full">
            <Select>
                <SelectTrigger className="w-full px-4 py-2.5 text-base font-normal text-neutral-900 hover:bg-white rounded-none border-black">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
