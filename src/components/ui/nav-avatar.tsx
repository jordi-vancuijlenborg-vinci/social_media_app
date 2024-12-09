import {
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut, ChevronsUpDown, User, Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types";

export function NavAvatar({ 
    user, 
    handleSignOut, 
    handleRedirectToProfilePage 
}: { 
    user: IUser, 
    handleSignOut: () => Promise<void>, 
    handleRedirectToProfilePage: () => Promise<void> 
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:bg-black hover:border-white border-[1px] m-1 p-1 border-transparent">
                <SidebarMenuButton
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-7 w-7 rounded-lg mr-2">
                        <AvatarImage src={user.imageUrl} alt={user.name} />
                        <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight text-white">
                        <span className="truncate font-semibold">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-white" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-black text-white"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => handleRedirectToProfilePage()}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => handleSignOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

