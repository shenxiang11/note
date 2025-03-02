/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  bizId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  liked: Scalars['Boolean']['output'];
  likedCount: Scalars['Int']['output'];
  parentId?: Maybe<Scalars['Int']['output']>;
  replies: Array<Reply>;
  repliesCount: Scalars['Int']['output'];
  rootId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type EditNoteInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  directPublish: Scalars['Boolean']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  video?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  cancelCollectNote: Scalars['String']['output'];
  collectNote: Scalars['String']['output'];
  createNote: Scalars['String']['output'];
  createNoteComment: Comment;
  createReply: Reply;
  editNote: Scalars['String']['output'];
  follow: Scalars['String']['output'];
  likeComment: Scalars['String']['output'];
  likeNote: Scalars['String']['output'];
  profile: Scalars['String']['output'];
  sendRegisterEmailCode: Scalars['String']['output'];
  signin: User;
  signup: User;
  unfollow: Scalars['String']['output'];
  unlikeComment: Scalars['String']['output'];
  unlikeNote: Scalars['String']['output'];
};


export type MutationRootCancelCollectNoteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootCollectNoteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootCreateNoteArgs = {
  input: EditNoteInput;
};


export type MutationRootCreateNoteCommentArgs = {
  content: Scalars['String']['input'];
  noteId: Scalars['Int']['input'];
};


export type MutationRootCreateReplyArgs = {
  commentId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  noteId: Scalars['Int']['input'];
  rootId: Scalars['Int']['input'];
};


export type MutationRootEditNoteArgs = {
  input: EditNoteInput;
  noteId: Scalars['Int']['input'];
};


export type MutationRootFollowArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationRootLikeCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootLikeNoteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootProfileArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRootSendRegisterEmailCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationRootSigninArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRootSignupArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRootUnfollowArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationRootUnlikeCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRootUnlikeNoteArgs = {
  id: Scalars['Int']['input'];
};

export type Note = {
  __typename?: 'Note';
  collected: Scalars['Boolean']['output'];
  collectedCount: Scalars['Int']['output'];
  commentsCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  liked: Scalars['Boolean']['output'];
  likedCount: Scalars['Int']['output'];
  status: NoteStatus;
  title: Scalars['String']['output'];
  type: NoteType;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
  video: Scalars['String']['output'];
  views: Scalars['Int']['output'];
};

export enum NoteStatus {
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  Published = 'PUBLISHED'
}

export enum NoteType {
  Normal = 'NORMAL',
  Video = 'VIDEO'
}

export type QueryRoot = {
  __typename?: 'QueryRoot';
  collectedNotes: Array<Note>;
  comment: Comment;
  comments: Array<Comment>;
  likedNotes: Array<Note>;
  profile: User;
  profileByAuth: User;
  publishedNote: Note;
  publishedNotes: Array<Note>;
  replies: Array<Reply>;
  userNotes: Array<Note>;
};


export type QueryRootCollectedNotesArgs = {
  cursorId?: InputMaybe<Scalars['Int']['input']>;
  pageSize: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type QueryRootCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCommentsArgs = {
  limit: Scalars['Int']['input'];
  minId?: InputMaybe<Scalars['Int']['input']>;
  noteId: Scalars['Int']['input'];
};


export type QueryRootLikedNotesArgs = {
  cursorId?: InputMaybe<Scalars['Int']['input']>;
  pageSize: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type QueryRootProfileArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryRootPublishedNoteArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootPublishedNotesArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  pageSize: Scalars['Int']['input'];
};


export type QueryRootRepliesArgs = {
  limit: Scalars['Int']['input'];
  minId?: InputMaybe<Scalars['Int']['input']>;
  noteId: Scalars['Int']['input'];
};


export type QueryRootUserNotesArgs = {
  cursorId?: InputMaybe<Scalars['Int']['input']>;
  pageSize: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type Reply = {
  __typename?: 'Reply';
  bizId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  liked: Scalars['Boolean']['output'];
  likedCount: Scalars['Int']['output'];
  parent?: Maybe<Reply>;
  parentId?: Maybe<Scalars['Int']['output']>;
  rootId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  collectedCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fansCount: Scalars['Int']['output'];
  followsCount: Scalars['Int']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isFollowed: Scalars['Boolean']['output'];
  isSelf: Scalars['Boolean']['output'];
  likedCount: Scalars['Int']['output'];
  serialNumber: Scalars['String']['output'];
};

export type SigninMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SigninMutation = { __typename?: 'MutationRoot', signin: { __typename?: 'User', id: number, fullname: string, avatar: string } };

export type NoteQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type NoteQuery = { __typename?: 'QueryRoot', publishedNote: { __typename?: 'Note', id: number, title: string, content: string, type: NoteType, images: Array<string>, video: string, views: number, createdAt: any, updatedAt: any, userId: number, likedCount: number, commentsCount: number, collectedCount: number, liked: boolean, collected: boolean, user?: { __typename?: 'User', id: number, fullname: string, avatar: string, isFollowed: boolean } | null } };

export type CollectNoteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CollectNoteMutation = { __typename?: 'MutationRoot', collectNote: string };

export type CancelCollectNoteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CancelCollectNoteMutation = { __typename?: 'MutationRoot', cancelCollectNote: string };

export type FollowMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type FollowMutation = { __typename?: 'MutationRoot', follow: string };

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UnfollowMutation = { __typename?: 'MutationRoot', unfollow: string };

export type LikeNoteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LikeNoteMutation = { __typename?: 'MutationRoot', likeNote: string };

export type CancelLikeNoteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CancelLikeNoteMutation = { __typename?: 'MutationRoot', unlikeNote: string };

export type LikeCommentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LikeCommentMutation = { __typename?: 'MutationRoot', likeComment: string };

export type CancelLikeCommentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CancelLikeCommentMutation = { __typename?: 'MutationRoot', unlikeComment: string };

export type ReplyFragmentFragment = { __typename?: 'Reply', userId: number, content: string, createdAt: any, updatedAt: any, likedCount: number, liked: boolean, parentId?: number | null, rootId?: number | null, bizId: number, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null, parent?: { __typename?: 'Reply', id: number, content: string, user?: { __typename?: 'User', id: number, fullname: string } | null } | null } & { ' $fragmentName'?: 'ReplyFragmentFragment' };

export type CommentFragmentFragment = { __typename?: 'Comment', userId: number, content: string, createdAt: any, updatedAt: any, repliesCount: number, likedCount: number, liked: boolean, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null, replies: Array<(
    { __typename?: 'Reply', id: number }
    & { ' $fragmentRefs'?: { 'ReplyFragmentFragment': ReplyFragmentFragment } }
  )> } & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type GetNoteCommentsQueryVariables = Exact<{
  noteId: Scalars['Int']['input'];
  minId?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
}>;


export type GetNoteCommentsQuery = { __typename?: 'QueryRoot', comments: Array<(
    { __typename?: 'Comment', id: number, bizId: number }
    & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
  )> };

export type FetchRepliesQueryVariables = Exact<{
  noteId: Scalars['Int']['input'];
  minId?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
}>;


export type FetchRepliesQuery = { __typename?: 'QueryRoot', replies: Array<(
    { __typename?: 'Reply', id: number }
    & { ' $fragmentRefs'?: { 'ReplyFragmentFragment': ReplyFragmentFragment } }
  )> };

export type ReplyMutationVariables = Exact<{
  noteId: Scalars['Int']['input'];
  rootId: Scalars['Int']['input'];
  commentId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type ReplyMutation = { __typename?: 'MutationRoot', createReply: (
    { __typename?: 'Reply', id: number }
    & { ' $fragmentRefs'?: { 'ReplyFragmentFragment': ReplyFragmentFragment } }
  ) };

export type NoteCommentMutationVariables = Exact<{
  noteId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type NoteCommentMutation = { __typename?: 'MutationRoot', createNoteComment: (
    { __typename?: 'Comment', id: number, bizId: number }
    & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
  ) };

export type PublishedNotesQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PublishedNotesQuery = { __typename?: 'QueryRoot', publishedNotes: Array<{ __typename?: 'Note', id: number, title: string, content: string, images: Array<string>, video: string, type: NoteType, liked: boolean, likedCount: number, views: number, collected: boolean, collectedCount: number, commentsCount: number, createdAt: any, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null }> };

export type CollectedNotesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  cursorId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollectedNotesQuery = { __typename?: 'QueryRoot', collectedNotes: Array<{ __typename?: 'Note', id: number, title: string, content: string, images: Array<string>, video: string, type: NoteType, liked: boolean, likedCount: number, views: number, collected: boolean, collectedCount: number, commentsCount: number, createdAt: any, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null }> };

export type ProfileDetailQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type ProfileDetailQuery = { __typename?: 'QueryRoot', profile: { __typename?: 'User', id: number, serialNumber: string, email: string, fullname: string, avatar: string, bio: string, createdAt: any, followsCount: number, fansCount: number, likedCount: number, collectedCount: number, isSelf: boolean, isFollowed: boolean } };

export type LikedNotesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  cursorId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LikedNotesQuery = { __typename?: 'QueryRoot', likedNotes: Array<{ __typename?: 'Note', id: number, title: string, content: string, images: Array<string>, video: string, type: NoteType, liked: boolean, likedCount: number, views: number, collected: boolean, collectedCount: number, commentsCount: number, createdAt: any, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null }> };

export type UserNotesQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  cursorId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UserNotesQuery = { __typename?: 'QueryRoot', userNotes: Array<{ __typename?: 'Note', id: number, title: string, content: string, images: Array<string>, video: string, type: NoteType, liked: boolean, likedCount: number, views: number, collected: boolean, collectedCount: number, commentsCount: number, createdAt: any, user?: { __typename?: 'User', id: number, fullname: string, avatar: string } | null }> };

export type ProfileByAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileByAuthQuery = { __typename?: 'QueryRoot', profileByAuth: { __typename?: 'User', id: number, fullname: string, avatar: string } };

export const ReplyFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<ReplyFragmentFragment, unknown>;
export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const NoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Note"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishedNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"collected"}}]}}]}}]} as unknown as DocumentNode<NoteQuery, NoteQueryVariables>;
export const CollectNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CollectNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CollectNoteMutation, CollectNoteMutationVariables>;
export const CancelCollectNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelCollectNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelCollectNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelCollectNoteMutation, CancelCollectNoteMutationVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const UnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<UnfollowMutation, UnfollowMutationVariables>;
export const LikeNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LikeNoteMutation, LikeNoteMutationVariables>;
export const CancelLikeNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelLikeNote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelLikeNoteMutation, CancelLikeNoteMutationVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LikeCommentMutation, LikeCommentMutationVariables>;
export const CancelLikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelLikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelLikeCommentMutation, CancelLikeCommentMutationVariables>;
export const GetNoteCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNoteComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"noteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"minId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}}]} as unknown as DocumentNode<GetNoteCommentsQuery, GetNoteCommentsQueryVariables>;
export const FetchRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"replies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"noteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"minId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<FetchRepliesQuery, FetchRepliesQueryVariables>;
export const ReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Reply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rootId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"noteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rootId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rootId"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}}]} as unknown as DocumentNode<ReplyMutation, ReplyMutationVariables>;
export const NoteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NoteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNoteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"noteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReplyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Reply"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"rootId"}},{"kind":"Field","name":{"kind":"Name","value":"bizId"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReplyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}}]}}]} as unknown as DocumentNode<NoteCommentMutation, NoteCommentMutationVariables>;
export const PublishedNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"publishedNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishedNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"collected"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PublishedNotesQuery, PublishedNotesQueryVariables>;
export const CollectedNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"collectedNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectedNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"collected"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CollectedNotesQuery, CollectedNotesQueryVariables>;
export const ProfileDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"serialNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"followsCount"}},{"kind":"Field","name":{"kind":"Name","value":"fansCount"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isSelf"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowed"}}]}}]}}]} as unknown as DocumentNode<ProfileDetailQuery, ProfileDetailQueryVariables>;
export const LikedNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"likedNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"collected"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<LikedNotesQuery, LikedNotesQueryVariables>;
export const UserNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"video"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"collected"}},{"kind":"Field","name":{"kind":"Name","value":"collectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UserNotesQuery, UserNotesQueryVariables>;
export const ProfileByAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfileByAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileByAuth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<ProfileByAuthQuery, ProfileByAuthQueryVariables>;