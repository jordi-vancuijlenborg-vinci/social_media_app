import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, Image, User, Bookmark, PlusSquare, Settings } from 'lucide-react';
import { NavAvatar } from "../ui/nav-avatar";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async () => {
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const handleRedirectToProfilePage = async () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <Sidebar className="w-[250px] hidden md:block">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="pl-3 flex flex-col justify-between flex-grow">
        <div>
          <SidebarMenu>
            {sidebarLinks.map((link: INavLink) => {
              const isActive = pathname === link.route;
              let Icon;
              switch (link.label) {
                case "Home":
                  Icon = Home;
                  break;
                case "Explore":
                  Icon = Image;
                  break;
                case "People":
                  Icon = User;
                  break;
                case "Saved":
                  Icon = Bookmark;
                  break;
                case "Create Post":
                  Icon = PlusSquare;
                  break;
                default:
                  Icon = Settings;
              }

              return (
                <SidebarMenuItem key={link.label}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <NavLink
                      to={link.route}
                      className="flex gap-4 items-center p-2">
                      <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                      <p className={`${isActive ? "text-white" : "text-gray-500"}`}>{link.label}</p>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-4">
      {isLoading || !user.email ? (
            <div className="h-14 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <NavAvatar 
                user={user} 
                handleSignOut={handleSignOut} 
                handleRedirectToProfilePage={handleRedirectToProfilePage} 
            />
          )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default LeftSidebar;

