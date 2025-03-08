import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog.tsx";
import {gql} from "@/__generated__";
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel.tsx";
import {NoteType} from "@/__generated__/graphql.ts";
import VideoPlayer from "@/components/video-player.tsx";
import { AspectRatio } from "./ui/aspect-ratio";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {CircleUserRound, Heart, Loader2, MessageCircle, Star} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {userAuthStore} from "@/store/use-auth.ts";
import {formatDateTime} from "@/lib/utils.ts";
import {userCommentStore} from "@/store/use-comment.ts";
import { Textarea } from "@/components/ui/textarea";
import {useHover} from "@uidotdev/usehooks";
import {
  CANCEL_LIKE_NOTE, CREATE_NOTE_COMMENT, CREATE_REPLY,
  FETCH_NOTE_COMMENTS,
  FOLLOW_USER,
  LIKE_NOTE,
  UNFOLLOW_USER
} from "@/graphql";
import {LoadMore} from "@/components/load-more.tsx";
import {NoteComment} from "@/components/note-comment.tsx";
import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router";
import {noteDetailStore} from "@/store/use-note-detail.ts";

const NOTE_DETAIL = gql(/* GraphQL */`
    query Note($id: Int!) {
        publishedNote(id: $id) {
            id
            title
            content
            type
            images
            video
            views
            createdAt
            updatedAt
            userId
            user {
                id
                fullname
                avatar
                isFollowed
            }
            likedCount
            commentsCount
            collectedCount
            liked
            collected
        }
    }
`);

const COLLECT_NOTE = gql(/* GraphQL */`
    mutation CollectNote($id: Int!) {
        collectNote(id: $id)
    }`
);

const CANCEL_COLLECT_NOTE = gql(/* GraphQL */`
    mutation CancelCollectNote($id: Int!) {
        cancelCollectNote(id: $id)
    }
`);

export function NoteDetail({ id }: { id: number }) {
  const { data } = useQuery(NOTE_DETAIL, {
    variables: {
      id,
    },
  });

  const [fetchComments, { data: commentData, fetchMore: fetchMoreComments }] = useLazyQuery(FETCH_NOTE_COMMENTS, {
    variables: {
      noteId: id,
      limit: 10,
    },
  });

  const loadMore = async () => {
    if (!commentData?.comments) {
      return fetchComments();
    } else {
      return fetchMoreComments({
        variables: {
          minId: commentData.comments[commentData.comments.length - 1].id,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            comments: [...prev.comments, ...fetchMoreResult.comments],
          };
        }
      });
    }
  }

  const [createNoteComment, { loading: commentCreating }] = useMutation(CREATE_NOTE_COMMENT, {
    update: (cache, {data}) => {
      if (data?.createNoteComment) {
        cache.modify({
          fields: {
            comments(prev, { toReference }) {
              return [toReference(data.createNoteComment), ...prev];
            },
          },
        });
      }
      cache.modify({
        id: cache.identify(note!),
        fields: {
          commentsCount(prev) {
            return prev + 1;
          },
        },
      });
    },
  });

  const note = data?.publishedNote;
  const comments = commentData?.comments;

  const [createReply, { loading: replyCreating }] = useMutation(CREATE_REPLY, {
    update: (cache, {data}) => {
      if (data?.createReply) {
        // if () {
        //   cache.modify({
        //     id: cache.identify({
        //       __typename: "Comment",
        //       id: rootId,
        //       bizId: data.createReply.bizId,
        //     }),
        //     fields: {
        //       replies(prev, { toReference }) {
        //         return [...prev, toReference(data.createReply)];
        //       },
        //     },
        //   }
        // });
      }
      cache.modify({
        id:cache.identify({
          __typename: "Comment",
          id: data?.createReply.rootId,
          bizId: data?.createReply.bizId,
        }),
        fields: {
          repliesCount(prev) {
            return prev + 1;
          },
        },
      });
    },
  });

  const {
    profile: authProfile,
    showLoginDialog,
  } = userAuthStore();

  const [likeNote, { loading: likeNoteLoading }] = useMutation(LIKE_NOTE, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!),
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
  const [cancelLikeNote, { loading: cancelLikeNoteLoading }] = useMutation(CANCEL_LIKE_NOTE, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!),
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

  const [collectNote, { loading: collectNoteLoading }] = useMutation(COLLECT_NOTE, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!),
        fields: {
          collected() {
            return true;
          },
          collectedCount(prev) {
            return prev + 1;
          },
        },
      });
    },
  });
  const [cancelCollectNote, { loading: cancelCollectNoteLoading }] = useMutation(CANCEL_COLLECT_NOTE, {
    variables: {
      id
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!),
        fields: {
          collected() {
            return false;
          },
          collectedCount(prev) {
            return prev - 1;
          },
        },
      });
    },
  });

  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {
      userId: note?.userId ?? 0,
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!.user!),
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
      userId: note?.userId ?? 0,
    },
    update: (cache) => {
      cache.modify({
        id: cache.identify(note!.user!),
        fields: {
          isFollowed() {
            return false;
          },
        },
      });
    }
  });

  const [followingRef, followingHovering] = useHover();

  const {
    commentMode,
    setCommentMode,
    replyComment,
    commentContent,
    rootId,
    parentId,
    setCommentContent,
    clearStore: clearCommentStore,
  } = userCommentStore();

  const closeCommentInput = () => {
    setCommentMode(false);
    clearCommentStore();
  }

  const [params, setParams] = useSearchParams();

  const titleRef = useRef(document.title);

  const { id: detailId, open, close } = noteDetailStore();

  useEffect(() => {
    const queryIdStr = params.get("note_id");
    const queryId = queryIdStr ? parseInt(queryIdStr, 10) : null;
    console.log("query id: ", queryId);
    if (queryId) {
      open(queryId);
    } else {
      close();
    }
  }, []);

  useEffect(() => {
    if (detailId && note) {
      titleRef.current = document.title;
      document.title = note?.title ?? "";
      setParams((prev) => {
        prev.set("note_id", note?.id?.toString() ?? "");
        return prev;
      });
    }
  }, [detailId, note]);

  return (
    <Dialog
      open={!!detailId}
      onOpenChange={(show) => {
        if (!show) {
          close();
          document.title = titleRef.current;
          setParams((prev) => {
            prev.delete("note_id");
            return prev;
          });
        } else {
          open(id!);
        }
      }}
    >
      <DialogContent className="w-6xl p-0 overflow-hidden border-0" hideClose>
        <DialogTitle hidden />
        <DialogDescription hidden />
        <div>
          <div className="flex flex-cols-2">
            <div className="relative bg-black w-0 grow-7">
              {
                note?.type === NoteType.Video ? (
                  <AspectRatio ratio={11/16}>
                    <VideoPlayer
                      src={note.video}
                    />
                  </AspectRatio>
                ) : (
                  <Carousel>
                    <CarouselContent>
                      {
                        note?.images?.map((image) => (
                          <CarouselItem key={image}>
                            <AspectRatio ratio={11/16}>
                              <img className="h-full w-full object-contain" src={image} alt=""/>
                            </AspectRatio>
                          </CarouselItem>
                        ))
                      }
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                    <CarouselDots/>
                  </Carousel>
                )
              }
            </div>
            <div className="flex flex-col w-0 grow-5">
              <div className="flex justify-between items-center px-8 py-4 shrink-0 border-b">
                <a href={`/profile/${note?.userId}`} target="_blank" className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage src={note?.user?.avatar} />
                    <AvatarFallback>{note?.user?.fullname}</AvatarFallback>
                  </Avatar>
                  <h4 className="text-base text-[#333]/80">{note?.user?.fullname}</h4>
                </a>
                <div>
                  {
                    note?.user?.isFollowed ? (
                      <Button
                        ref={followingRef}
                        onClick={() => unfollowUser()} variant="outline">
                        {followingHovering ? "取消关注" : "正在关注"}
                      </Button>
                    ) : (
                      <Button onClick={() => followUser()}>关注</Button>
                    )
                  }
                </div>
              </div>
              <div className="h-0 grow">
                <ScrollArea className="w-full h-full text-primary">
                  <div className="px-8 pt-4 flex flex-col gap-2">
                    <h4 className="text-lg font-semibold">{note?.title}</h4>
                    <p className="text-base whitespace-pre-line">{note?.content}</p>
                    <p className="text-sm text-slate-500">{formatDateTime(note?.createdAt ?? null)}</p>
                  </div>
                  <Separator className="my-4" />
                  <div className="px-8 space-y-5">
                    <p className="text-sm text-slate-500">共&nbsp;{note?.commentsCount}&nbsp;条评论</p>
                    <LoadMore fetchMore={loadMore}>
                      {
                        comments?.map(comment => (
                          <NoteComment key={comment.id} noteId={id} id={comment.id} />
                        ))
                      }
                    </LoadMore>
                  </div>
                </ScrollArea>
              </div>
              <div className="w-full shrink-0 p-2 flex gap-2 border-t">
                {
                  commentMode ? (
                    <div className="w-full">
                      {
                        replyComment && (
                          <div className="px-8 pt-2 space-y-2">
                            <p className="text-primary/60 text-sm">回复&nbsp;{replyComment?.user?.fullname}</p>
                            <p className="text-primary/80 text-sm">{replyComment?.content}</p>
                          </div>
                        )
                      }
                      <div className="p-4">
                        <Textarea
                          className="resize-none w-full max-h-40"
                          autoFocus
                          value={commentContent}
                          onChange={(e) => setCommentContent(e.target.value)}
                        />
                      </div>
                      <div className="w-full flex justify-end gap-2">
                        <Button
                          disabled={commentCreating || replyCreating}
                          onClick={() => {
                            if (replyComment) {
                              createReply({
                                variables: {
                                  noteId: id,
                                  content: commentContent,
                                  rootId: rootId || replyComment.id!,
                                  commentId: parentId || replyComment.id!,
                                },
                              })
                                .finally(() => {
                                  closeCommentInput();
                                })
                            } else {
                              createNoteComment({
                                variables: {
                                  noteId: id,
                                  content: commentContent,
                                },
                              })
                                .finally(() => {
                                  closeCommentInput();
                                });
                            }
                        }}>
                          {
                            commentCreating && (
                              <Loader2 className="animate-spin" />
                            )
                          }
                          发送
                        </Button>
                        <Button variant="outline" onClick={() => closeCommentInput()}>取消</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {
                        authProfile ? (
                          <div className="flex gap-2 p-2 rounded-full bg-slate-200 grow dark:bg-slate-800" onClick={() => {
                            setCommentMode(true)
                          }}>
                            <Avatar className="size-6">
                              <AvatarImage src={authProfile.avatar} />
                              <AvatarFallback>{authProfile.fullname}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-slate-600 whitespace-nowrap text-ellipsis">说点什么...</span>
                            <div className="w-2" />
                          </div>
                        ) : (
                          <div className="flex gap-2 p-2 rounded-full bg-slate-200 grow dark:bg-slate-800" onClick={() => showLoginDialog()}>
                            <div className="size-6">
                              <CircleUserRound />
                            </div>
                            <span className="text-sm text-slate-600 whitespace-nowrap text-ellipsis">登录后评论</span>
                            <div className="w-2" />
                          </div>
                        )
                      }
                      <div className="grow" />
                      <Button disabled={likeNoteLoading || cancelLikeNoteLoading} variant="ghost" onClick={() => {
                        if (note?.liked) {
                          cancelLikeNote();
                        } else {
                          likeNote();
                        }
                      }}>
                        {
                          note?.liked ? (
                            <Heart fill="red" stroke="red" />
                          ) : (
                            <Heart />
                          )
                        }
                        <span className="text-slate-600">{note?.likedCount}</span>
                      </Button>
                      <Button disabled={collectNoteLoading || cancelCollectNoteLoading} variant="ghost" onClick={() => {
                        if (note?.collected) {
                          cancelCollectNote();
                        } else {
                          collectNote();
                        }
                      }}>
                        {
                          note?.collected ? (
                            <Star stroke="orange" fill="orange" />
                          ) : (
                            <Star />
                          )
                        }
                        <span className="text-slate-600">{note?.collectedCount}</span>
                      </Button>
                      <Button variant="ghost" onClick={() => {
                        if (authProfile) {
                          setCommentMode(true)
                        } else {
                          showLoginDialog();
                        }
                      }}>
                        <MessageCircle />
                        <span className="text-slate-600">{note?.commentsCount}</span>
                      </Button>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
