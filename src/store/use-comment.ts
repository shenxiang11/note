import {create} from "zustand/react";
import {Comment, Reply} from "@/__generated__/graphql.ts";
import {DeepPartial} from "@apollo/client/utilities";

interface CommentState {
  commentMode: boolean;
  toggleCommentMode: () => void;
  setCommentMode: (val: boolean) => void;
  replyComment: DeepPartial<Comment | Reply> | null;
  rootId: number | null;
  parentId: number | null;
  setReplyComment: (comment: DeepPartial<Comment | Reply> | null, rootId: number | null, parentId: number | null) => void;
  commentContent: string;
  setCommentContent: (val: string) => void;
  clearStore: () => void;
}

export const userCommentStore = create<CommentState>((set) => {
  return {
    commentMode: false,
    toggleCommentMode: () => set((state) => ({commentMode: !state.commentMode, commentContent: ""})),
    setCommentMode: (val) => set({commentMode: val}),
    replyComment: null,
    rootId: null,
    parentId: null,
    setReplyComment: (comment, rootId, parentId) => set({replyComment: comment, rootId, parentId }),
    commentContent: "",
    setCommentContent: val => set({commentContent: val}),
    clearStore: () => set({
      commentMode: false,
      replyComment: null,
      rootId: null,
      parentId: null,
      commentContent: "",
    }),
  };
});
