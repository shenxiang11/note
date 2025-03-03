import {useParams} from "react-router";
import {gql} from "@/__generated__";
import {useMutation, useQuery} from "@apollo/client";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Notes} from "@/pages/profile/notes.tsx";
import {Likes} from "@/pages/profile/likes.tsx";
import {Collects} from "@/pages/profile/collects.tsx";
import { Button } from "@/components/ui/button";
import {useDocumentTitle, useHover} from "@uidotdev/usehooks";
import {FOLLOW_USER, UNFOLLOW_USER} from "@/graphql";

const PROFILE = gql(/* GraphQL */`
    query ProfileDetail($userId: Int!) {
        profile(userId: $userId) {
            id
            serialNumber
            email
            fullname
            avatar
            bio
            createdAt
            followsCount
            fansCount
            likedCount
            collectedCount
            isSelf
            isFollowed
        }
    }
`);

export function Profile() {
  const params = useParams();
  const userId = parseInt(params.id!);

  const {data} = useQuery(PROFILE, {
    variables: {
      userId,
    }
  });

  const profile = data?.profile;

  useDocumentTitle(`${profile?.fullname}的主页`);

  const [followingRef, followingHovering] = useHover();

  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {
      userId,
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(profile!),
        fields: {
          isFollowed() {
            return true;
          },
        },
      });
    }
  });

  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {
      userId,
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(profile!),
        fields: {
          isFollowed() {
            return false;
          },
        },
      });
    }
  });

  return (
    <div className="px-8 py-8 min-h-screen">
      <div className="flex items-center justify-center gap-16">
        <Avatar className="w-40 h-40">
          <AvatarImage src={profile?.avatar} alt={profile?.fullname} />
          <AvatarFallback>{profile?.fullname}</AvatarFallback>
        </Avatar>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">{profile?.fullname}</h4>
          <p className="text-xs text-zinc-500">小笔记号：{profile?.serialNumber}</p>
          <p className="whitespace-pre-line text-sm">{profile?.bio}</p>
          <div className="flex gap-4 text-sm font-thin text-zinc-500">
            <div><span className="font-medium text-primary">{profile?.followsCount ?? 0}</span>&nbsp;&nbsp;关注</div>
            <div><span className="font-medium text-primary">{profile?.fansCount ?? 0}</span>&nbsp;&nbsp;粉丝</div>
            <div><span className="font-medium text-primary">{(profile?.collectedCount ?? 0) + (profile?.likedCount ?? 0)}</span>&nbsp;&nbsp;获赞与收藏</div>
          </div>
        </div>
        <div className="self-start w-40">
          {
            !profile?.isSelf && (
              <>
                {
                  profile?.isFollowed ? (
                    <Button
                      ref={followingRef}
                      onClick={() => unfollowUser()}
                      variant="outline">
                      {followingHovering ? "取消关注" : "正在关注"}
                    </Button>
                  ) : (
                    <Button onClick={() => followUser()}>关注</Button>
                  )
                }
              </>
            )
          }
        </div>
      </div>

      <Tabs defaultValue="notes">
        <div className="h-20 sticky w-full top-0 flex items-center justify-center bg-[var(--color-background)] z-10">
          <TabsList className="sticky top-0 grid grid-cols-3 w-[600px]">
            <TabsTrigger value="notes">笔记</TabsTrigger>
            <TabsTrigger value="collects">收藏</TabsTrigger>
            <TabsTrigger value="likes">点赞</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="notes">
          <Notes />
        </TabsContent>
        <TabsContent value="collects">
          <Collects />
        </TabsContent>
        <TabsContent value="likes">
          <Likes />
        </TabsContent>
      </Tabs>
    </div>
  );
}
