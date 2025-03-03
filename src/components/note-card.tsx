import {Note, NoteType} from "@/__generated__/graphql.ts";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Eye, Heart, Play} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {DeepPartial} from "@apollo/client/utilities";
import {Dialog, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useSearchParams} from "react-router";
import {NoteDetail} from "@/components/note-detail.tsx";
import {useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import {CANCEL_LIKE_NOTE, LIKE_NOTE} from "@/graphql";

export function NoteCard({ note }: { note: DeepPartial<Note>}) {
  const [params, setParams] = useSearchParams();

  const [detailDialogShow, setDetailDialogShow] = useState(() => params.get("note_id") === note.id?.toString());

  const [likeNote] = useMutation(LIKE_NOTE, {
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
  const [cancelLikeNote] = useMutation(CANCEL_LIKE_NOTE, {
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

  const titleRef = useRef(document.title);

  return (
    <Dialog
      key={note.id}
      open={detailDialogShow}
      onOpenChange={(open) => {
        if (!open) {
          document.title = titleRef.current;
          setParams((prev) => {
            prev.delete("note_id");
            return prev;
          });
          setDetailDialogShow(false);
        } else {
          titleRef.current = document.title;
          document.title = note.title ?? "";
          setParams((prev) => {
            prev.set("note_id", note.id?.toString() ?? "");
            return prev;
          });
          setDetailDialogShow(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Card className="p-0 gap-2 overflow-hidden" >
          <CardContent className="p-0 min-h-[100px]">
            <div className="relative">
              <img
                className="w-full h-auto"
                src={note.images?.[0]}
                alt=""/>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-70"></div>
              {note.type === NoteType.Video && (
                <div
                  className="absolute top-2 right-2 flex items-center justify-center text-white rounded-full w-8 h-8 bg-[#40404040] backdrop-blur-sm backdrop-saturate-150">
                  <Play size={18}/>
                </div>
              )}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white">
                <Eye size={16}/>
                <span className="text-xs">{note.views}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start p-2 gap-2">
            <h3 className="text-sm font-medium">{note.title}</h3>
            <div className="w-full flex justify-between text-slate-500">
              <a href={`/profile/${note.user?.id}`} target="_blank" onClick={(e) => {e.stopPropagation()}} className="flex items-center gap-2">
                <Avatar className="size-4">
                  <AvatarImage src={note.user?.avatar} alt={note.user?.fullname}/>
                  <AvatarFallback>{note.user?.fullname}</AvatarFallback>
                </Avatar>
                <h6 className="text-xs">{note.user?.fullname}</h6>
              </a>
              <div className="flex items-center gap-1">
                {note.liked ? (
                  <Heart size={16} fill="red" stroke="red" onClick={(e) => {
                    e.stopPropagation();
                    cancelLikeNote({ variables: { id: note.id! } });
                  }}/>
                ) : (
                  <Heart size={16} onClick={(e) => {
                    e.stopPropagation();
                    likeNote({ variables: { id: note.id! } });
                  }}/>
                )}
                <span className="text-xs">{note.likedCount}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      {
        note.id && <NoteDetail id={note.id} />
      }
    </Dialog>
  );
}
