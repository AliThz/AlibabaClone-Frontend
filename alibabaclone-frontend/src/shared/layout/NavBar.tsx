import { Link } from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export default function NavBar() {
    return (
        <div className='px-5'>
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Left side - Site name */}
                <Link to="/" className="text-xl font-bold">
                    AlibabaClone
                </Link>

                {/* Right side - Navigation links */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link to="/flights" className={navigationMenuTriggerStyle()}>
                                Flights
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/hotels" className={navigationMenuTriggerStyle()}>
                                Hotels
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/trains" className={navigationMenuTriggerStyle()}>
                                Trains
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}
