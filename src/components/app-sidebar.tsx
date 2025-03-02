import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AlignJustify, Github, House, Moon, Settings2, SquarePlus, Sun} from "lucide-react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM, useTheme} from "@/hooks/use-theme.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Dialog} from "@radix-ui/react-dialog";
import {DialogTrigger} from "@/components/ui/dialog.tsx";
import {LoginDialog} from "@/components/login-dialog.tsx";
import {userAuthStore} from "@/store/use-auth.ts";
import {useEffect} from "react";
import {NavLink} from "react-router";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export function AppSidebar() {
  const {
    theme,
    setTheme
  } = useTheme();

  const {
    profile,
    getProfile,
    loginDialogShow,
    showLoginDialog,
    hideLoginDialog,
  } = userAuthStore();

  useEffect(() => {
    if (localStorage.getItem("app_token")) {
      getProfile();
    }
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("app_token");
    window.location.reload();
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl subpixel-antialiased font-mono font-light">小笔记</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  <span className="size-6 flex justify-center items-center">
                    <House />
                  </span>
                  <span>发现</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <SidebarMenuButton asChild>
                          <div>
                            <span className="size-6 flex justify-center items-center">
                              <SquarePlus/>
                            </span>
                            <span>发布</span>
                          </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="whitespace-pre-line">{`
                      本网站目前仅为一个模仿小红书的演示项目，
                      旨在展示项目的部分功能，
                      尚未开放发帖功能，敬请知悉。
                      
                      `}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/">
                  <span className="size-6 flex justify-center items-center">
                    <Github />
                  </span>
                  <span>源代码</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {
          profile ? (
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink to={`/profile/${profile.id}`}>
                      <Avatar className="size-6">
                        <AvatarImage src={profile?.avatar} />
                        <AvatarFallback>{profile?.fullname}</AvatarFallback>
                      </Avatar>
                      <span>我</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          ) : (
            <SidebarGroup>
              <Dialog
                open={loginDialogShow}
                onOpenChange={(open) => {
                  if (open) {
                    showLoginDialog();
                  } else {
                    hideLoginDialog();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>登录</Button>
                </DialogTrigger>
                <LoginDialog />
              </Dialog>
            </SidebarGroup>
          )
        }
        <SidebarGroup/>
        <SidebarGroup/>
        <SidebarGroup/>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="justify-start">
                    <AlignJustify/>
                    更多
                  </Button>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-60"
                side="top"
              >
                <DropdownMenuLabel className="font-thin">设置</DropdownMenuLabel>
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span className="font-normal">深色模式</span>
                  <ToggleGroup
                    type="single"
                    value={theme}
                    onValueChange={(value) => setTheme(value)}
                  >
                    <ToggleGroupItem value={THEME_SYSTEM}>
                      <Settings2/>
                    </ToggleGroupItem>
                    <ToggleGroupItem value={THEME_LIGHT}>
                      <Sun/>
                    </ToggleGroupItem>
                    <ToggleGroupItem value={THEME_DARK}>
                      <Moon/>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </DropdownMenuLabel>
                {
                  profile && (
                    <DropdownMenuItem onClick={handleSignout}>
                      <span className="font-normal">退出登录</span>
                    </DropdownMenuItem>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
