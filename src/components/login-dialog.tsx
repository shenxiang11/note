import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {gql} from "@/__generated__";
import {useMutation} from "@apollo/client";
import {useState} from "react";

const SIGNIN = gql(/* GraphQL */`
    mutation Signin($email: String!, $password: String!) {
      signin(email: $email, password: $password) {
          id
          fullname
          avatar
      }
    }
`);

export function LoginDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signin] = useMutation(SIGNIN, {
    variables: {
      email,
      password,
    },
  });

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>登录</DialogTitle>
        <DialogDescription>请使用邮箱密码登录，或者点击下方的体验账号快速体验</DialogDescription>
      </DialogHeader>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={(e) => {
            e.preventDefault();
            signin()
              .then(() => {
                window.location.reload();
              });
          }}>
            登录
          </Button>
        </div>
      </form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          或使用体验账号
        </span>
      </div>
      <div className="grid grid-cols-8 gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar onClick={() => {
              setEmail("zero_huzhiwei@xhs.com");
              setPassword("123456");
            }}>
              <AvatarImage src="https://mollybox.oss-cn-shanghai.aliyuncs.com/mixedFile/1741357437906-1040g2jo316md2qklje605plhqd02uba8dul518o.webp" alt="@shadcn"/>
              <AvatarFallback>胡致炜</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>胡致炜</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar onClick={() => {
              setEmail("newstarsca@xhs.com");
              setPassword("123456");
            }}>
              <AvatarImage src="https://mollybox.oss-cn-shanghai.aliyuncs.com/mixedFile/1741258633581-656fca8eeaa963f881794291.webp" alt="@shadcn"/>
              <AvatarFallback>NewStars🆕💫</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>NewStars🆕💫</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar onClick={() => {
              setEmail("in247224955@xhs.com");
              setPassword("123456");
            }}>
              <AvatarImage src="https://mollybox.oss-cn-shanghai.aliyuncs.com/mixedFile/1741228729560-668a95b21e655fdaf04c66f9.webp" alt="@shadcn"/>
              <AvatarFallback>依依学金融</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>依依学金融</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </DialogContent>
  );
}
