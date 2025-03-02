import {useFragment} from "@apollo/client/react/hooks";
import {CANCEL_LIKE_COMMENT, LIKE_COMMENT, REPLY_FRAGMENT} from "@/graphql";
import {Heart, MessageCircle} from "lucide-react";
import {formatDateTime} from "@/lib/utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import {userCommentStore} from "@/store/use-comment.ts";
import {useMutation} from "@apollo/client";

export function NoteReply({id, rootId}: { id: number, rootId: number }) {
  const { data: reply } = useFragment({
    fragment: REPLY_FRAGMENT,
    fragmentName: "ReplyFragment",
    from: {
      __typename: "Reply",
      id,
    }
  });

  const {
    setCommentMode,
    setReplyComment,
  } = userCommentStore();

  const [likeComment] = useMutation(LIKE_COMMENT, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: "Reply",
          id,
        }),
        fields: {
          liked() {
            return true;
          },
          likedCount(prev) {
            return prev + 1;
          },
        },
      });
    },
  });
  const [cancelLikeComment] = useMutation(CANCEL_LIKE_COMMENT, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify({
          __typename: "Reply",
          id,
        }),
        fields: {
          liked() {
            return false;
          },
          likedCount(prev) {
            return prev - 1;
          },
        },
      });
    },
  });

  return (
    <div className="flex gap-2">
      <Avatar className="size-10">
        <AvatarImage src={reply.user?.avatar}/>
        <AvatarFallback>{reply.user?.fullname}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm text-slate-500">{reply.user?.fullname}</h4>
        <p className="text-sm whitespace-pre-line break-all">回复&nbsp;<span className="text-slate-500">{reply?.parent?.user?.fullname}</span>：{reply.content}</p>
        <p className="text-xs text-slate-500">{formatDateTime(reply.createdAt)}</p>
        <div>
          <Button variant="ghost" onClick={() => {
            if (reply.liked) {
              cancelLikeComment();
            } else {
              likeComment();
            }
          }}>
            { reply.liked ? <Heart fill="red" stroke="red" /> : <Heart />}
            <span className="text-slate-600">{reply.likedCount ||  "赞"}</span>
          </Button>
          <Button variant="ghost" onClick={() => {
            setReplyComment(reply, rootId, id);
            setCommentMode(true);
          }}>
            <MessageCircle/>
            <span className="text-slate-600">回复</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
