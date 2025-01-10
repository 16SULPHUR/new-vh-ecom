import React from 'react'
import { Button } from './ui/button'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const HeaderCart = () => {
    return (
        <div>
            <Link to={"/cart"}>
                <Button variant="ghost" size="icon" className='relative'>
                    <ShoppingBag className="h-5 w-5" />
                    {/* <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-xs text-white">0
                    </span> */}
                </Button>
            </Link>
        </div>
    )
}

export default HeaderCart