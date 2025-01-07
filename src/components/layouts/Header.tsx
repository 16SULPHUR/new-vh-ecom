import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, MapPin, Heart, ShoppingBag } from 'lucide-react'
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

const menuItems = [
    { title: 'New In', href: '/new-in' },
    { title: 'Sets', href: '/sets' },
    { title: 'Sarees', href: '/sarees' },
    { title: 'Blouses', href: '/blouses' },
    { title: 'Dupattas & More', href: '/dupattas' },
    { title: 'Collections', href: '/collections' },
    { title: 'Online Exclusive', href: '/exclusive' },
]

export function Header() {
    return (
        <header className="static top-0 z-50 w-screen border-b bg-black text-white">
            <div className="container flex h-16 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='bg-black text-white'>
                    <SheetHeader>
                        <Link to="/" className="mr-6 flex items-center space-x-2">
                            <img src="/logos/wht.svg" alt="LOGO" className='h-40' />
                        </Link>
                    </SheetHeader>
                        <nav className="flex flex-col gap-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="text-lg font-medium transition-colors hover:text-primary"
                                >
                                    {item.title}
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
                            {menuItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <Link
                                        to={item.href}
                                        className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium"
                                    >
                                        {item.title}
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

                    <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon" className='relative'>
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-white">0
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}

