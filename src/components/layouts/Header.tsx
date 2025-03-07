import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, MapPin, Heart, ShoppingBag, MoveRight, ArrowRight } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '../ui/sheet'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { getCategories } from '@/lib/fetchCategories'
import { toTitleCase } from '@/lib/fetchProducts'
import HeaderCart from '../header-cart'

const menuItems = [
    { title: 'Online Exclusive', href: '/exclusive' },
]

export function Header() {
    const [categories, setCategories] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsOpen(false); // Close the sheet
  };

    useEffect(() => {
        async function fetchCategories() {
            const categoryNames = await getCategories();
            setCategories(categoryNames);
        }
        fetchCategories();
    }, []);

    const allMenuItems = [
        // ...menuItems,
        ...categories.map(category => ({
            title: category,
            href: `/category/${category}`
        }))
    ];

    return (
        <header className="static top-0 z-50 w-screen border-b bg-black text-white">
            <div className="container flex h-16 items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='text-primary bg-inherit'>
                        <SheetHeader>
                            <Link to="/" className="mr-6 flex items-center space-x-2">
                                <img src="/logos/blk.svg" alt="LOGO" className='h-40' />
                            </Link>
                        </SheetHeader>
                        <nav className="flex flex-col gap-4">
                            {allMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="text-lg font-medium transition-colors hover:text-primary flex w-full justify-between items-center"
                                    onClick={handleMenuItemClick}
                                >
                                    {toTitleCase(item.title)}
                                    <ArrowRight size={20}/>
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                <Link to="/" className="mr-6 flex items-center space-x-2">
                    <img src="/logos/wht.svg" alt="LOGO" className='h-40' />
                </Link>

                <div className="hidden md:flex md:flex-1">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {allMenuItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <Link
                                        to={item.href}
                                        className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium"
                                    >
                                        {toTitleCase(item.title)}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <MapPin className="h-5 w-5" />
                    </Button>

                    <HeaderCart/>
                </div>
            </div>
        </header>
    )
}