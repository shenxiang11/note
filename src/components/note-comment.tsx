import {CANCEL_LIKE_COMMENT, COMMENT_FRAGMENT, FETCH_REPLIES, LIKE_COMMENT} from "@/graphql";
import { useFragment } from "@apollo/client/react/hooks";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Heart, MessageCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {formatDateTime} from "@/lib/utils.ts";
import {userCommentStore} from "@/store/use-comment.ts";
import {NoteReply} from "@/components/note-reply.tsx";
import {useMutation, useQuery} from "@apollo/client";
import client from "@/apollo.ts";

export function NoteComment({ id, noteId }: { id: number, noteId: number }) {
  const { complete, data: comment } = useFragment({
    fragment: COMMENT_FRAGMENT,
    fragmentName: "CommentFragment",
    from: {
      __typename: "Comment",
      id,
      bizId: noteId,
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
          __typename: "Comment",
          id,
          bizId: noteId,
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
          __typename: "Comment",
          id,
          bizId: noteId,
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

  const { fetchMore: fetchMoreReplies } = useQuery(FETCH_REPLIES, {
    skip: true,
    variables: {
      noteId,
      minId: -1,
      limit: 10,
    },
  });

  return complete && (
    <div className="flex gap-2">
      <Avatar className="size-10">
        <AvatarImage src={comment?.user?.avatar}/>
        <AvatarFallback>{comment?.user?.fullname}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm text-slate-500">{comment?.user?.fullname}</h4>
        <p className="text-sm whitespace-pre-line break-all">{comment.content}</p>
        <p className="text-xs text-slate-500">{formatDateTime(comment?.createdAt ?? null)}</p>
        <div>
          <Button variant="ghost" onClick={() => {
            if (comment.liked) {
              cancelLikeComment();
            } else {
              likeComment();
            }
          }}>
            {
              comment.liked ? <Heart fill="red" stroke="red" /> : <Heart/>
            }
            <span className="text-slate-600">{comment.likedCount || "赞"}</span>
          </Button>
          <Button variant="ghost" onClick={() => {
            setReplyComment(comment, id, id);
            setCommentMode(true);
          }}>
            <MessageCircle/>
            <span className="text-slate-600">{comment.repliesCount || "回复"}</span>
          </Button>
        </div>

        {
          comment.replies?.map(reply => (
            <NoteReply key={reply!.id} id={reply!.id!} rootId={id} />
          ))
        }
        {
          (comment.replies?.length ?? 0) < (comment?.repliesCount ?? 0) && (
            <Button variant="link" onClick={() => {
              fetchMoreReplies({
                variables: {
                  minId: comment.replies.length ? comment.replies![comment.replies!.length - 1].id : id,
                },
              })
                .then(res => {
                  const replies = res.data.replies;
                  client.cache.modify({
                    id: client.cache.identify({
                      __typename: "Comment",
                      id,
                      bizId: noteId,
                    }),
                    fields: {
                      replies(existingReplies = [], { toReference }) {
                        const s = new Set();
                        const result = [...existingReplies];
                        for (const e of existingReplies) {
                          s.add(e.id);
                        }
                        for (const i of replies) {
                          if (!s.has(i.id)) {
                            result.push(toReference(i, true));
                          }
                        }
                        return result;
                      },
                    },
                  });
                });
            }}>加载更多回复</Button>
          )
        }
      </div>
    </div>
  );
}
