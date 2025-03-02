/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    mutation Signin($email: String!, $password: String!) {\n      signin(email: $email, password: $password) {\n          id\n          fullname\n          avatar\n      }\n    }\n": typeof types.SigninDocument,
    "\n    query Note($id: Int!) {\n        publishedNote(id: $id) {\n            id\n            title\n            content\n            type\n            images\n            video\n            views\n            createdAt\n            updatedAt\n            userId\n            user {\n                id\n                fullname\n                avatar\n                isFollowed\n            }\n            likedCount\n            commentsCount\n            collectedCount\n            liked\n            collected\n        }\n    }\n": typeof types.NoteDocument,
    "\n    mutation CollectNote($id: Int!) {\n        collectNote(id: $id)\n    }": typeof types.CollectNoteDocument,
    "\n    mutation CancelCollectNote($id: Int!) {\n        cancelCollectNote(id: $id)\n    }\n": typeof types.CancelCollectNoteDocument,
    "\n    mutation Follow($userId: Int!) {\n        follow(userId: $userId)\n    }\n": typeof types.FollowDocument,
    "\n    mutation Unfollow($userId: Int!) {\n        unfollow(userId: $userId)\n    }\n": typeof types.UnfollowDocument,
    "\n    mutation LikeNote($id: Int!) {\n        likeNote(id: $id)\n    }\n": typeof types.LikeNoteDocument,
    "\n    mutation CancelLikeNote($id: Int!) {\n        unlikeNote(id: $id)\n    }\n": typeof types.CancelLikeNoteDocument,
    "\n    mutation LikeComment($id: Int!) {\n        likeComment(id: $id)\n    }\n": typeof types.LikeCommentDocument,
    "\n    mutation CancelLikeComment($id: Int!) {\n        unlikeComment(id: $id)\n    }\n": typeof types.CancelLikeCommentDocument,
    "\n    fragment ReplyFragment on Reply {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        likedCount\n        liked\n        parentId\n        rootId\n        bizId\n        parent {\n            id\n            content\n            user {\n                id\n                fullname\n            }\n        }\n    }\n": typeof types.ReplyFragmentFragmentDoc,
    "\n    fragment CommentFragment on Comment {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        replies {\n            id\n            ...ReplyFragment\n        }\n        repliesCount\n        likedCount\n        liked\n    }\n": typeof types.CommentFragmentFragmentDoc,
    "\n    query GetNoteComments($noteId: Int!, $minId: Int, $limit: Int!) {\n        comments(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }\n": typeof types.GetNoteCommentsDocument,
    "\n    query FetchReplies($noteId: Int!, $minId: Int, $limit: Int!) {\n        replies(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            ...ReplyFragment\n        }\n    }\n": typeof types.FetchRepliesDocument,
    "\n    mutation Reply($noteId: Int!, $rootId: Int!, $commentId: Int!, $content: String!) {\n        createReply(noteId: $noteId, rootId: $rootId, commentId: $commentId, content: $content) {\n            id\n            ...ReplyFragment\n        }\n    }\n": typeof types.ReplyDocument,
    "\n    mutation NoteComment($noteId: Int!, $content: String!) {\n        createNoteComment(noteId: $noteId, content: $content) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }": typeof types.NoteCommentDocument,
    "\n    query publishedNotes($pageSize: Int!, $cursor: Int) {\n        publishedNotes(pageSize: $pageSize, cursor: $cursor) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": typeof types.PublishedNotesDocument,
    "\n    query collectedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        collectedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": typeof types.CollectedNotesDocument,
    "\n    query ProfileDetail($userId: Int!) {\n        profile(userId: $userId) {\n            id\n            serialNumber\n            email\n            fullname\n            avatar\n            bio\n            createdAt\n            followsCount\n            fansCount\n            likedCount\n            collectedCount\n            isSelf\n            isFollowed\n        }\n    }\n": typeof types.ProfileDetailDocument,
    "\n    query likedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        likedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": typeof types.LikedNotesDocument,
    "\n    query userNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        userNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": typeof types.UserNotesDocument,
    "\n    query ProfileByAuth {\n        profileByAuth {\n            id\n            fullname\n            avatar\n        }\n    }\n": typeof types.ProfileByAuthDocument,
};
const documents: Documents = {
    "\n    mutation Signin($email: String!, $password: String!) {\n      signin(email: $email, password: $password) {\n          id\n          fullname\n          avatar\n      }\n    }\n": types.SigninDocument,
    "\n    query Note($id: Int!) {\n        publishedNote(id: $id) {\n            id\n            title\n            content\n            type\n            images\n            video\n            views\n            createdAt\n            updatedAt\n            userId\n            user {\n                id\n                fullname\n                avatar\n                isFollowed\n            }\n            likedCount\n            commentsCount\n            collectedCount\n            liked\n            collected\n        }\n    }\n": types.NoteDocument,
    "\n    mutation CollectNote($id: Int!) {\n        collectNote(id: $id)\n    }": types.CollectNoteDocument,
    "\n    mutation CancelCollectNote($id: Int!) {\n        cancelCollectNote(id: $id)\n    }\n": types.CancelCollectNoteDocument,
    "\n    mutation Follow($userId: Int!) {\n        follow(userId: $userId)\n    }\n": types.FollowDocument,
    "\n    mutation Unfollow($userId: Int!) {\n        unfollow(userId: $userId)\n    }\n": types.UnfollowDocument,
    "\n    mutation LikeNote($id: Int!) {\n        likeNote(id: $id)\n    }\n": types.LikeNoteDocument,
    "\n    mutation CancelLikeNote($id: Int!) {\n        unlikeNote(id: $id)\n    }\n": types.CancelLikeNoteDocument,
    "\n    mutation LikeComment($id: Int!) {\n        likeComment(id: $id)\n    }\n": types.LikeCommentDocument,
    "\n    mutation CancelLikeComment($id: Int!) {\n        unlikeComment(id: $id)\n    }\n": types.CancelLikeCommentDocument,
    "\n    fragment ReplyFragment on Reply {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        likedCount\n        liked\n        parentId\n        rootId\n        bizId\n        parent {\n            id\n            content\n            user {\n                id\n                fullname\n            }\n        }\n    }\n": types.ReplyFragmentFragmentDoc,
    "\n    fragment CommentFragment on Comment {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        replies {\n            id\n            ...ReplyFragment\n        }\n        repliesCount\n        likedCount\n        liked\n    }\n": types.CommentFragmentFragmentDoc,
    "\n    query GetNoteComments($noteId: Int!, $minId: Int, $limit: Int!) {\n        comments(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }\n": types.GetNoteCommentsDocument,
    "\n    query FetchReplies($noteId: Int!, $minId: Int, $limit: Int!) {\n        replies(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            ...ReplyFragment\n        }\n    }\n": types.FetchRepliesDocument,
    "\n    mutation Reply($noteId: Int!, $rootId: Int!, $commentId: Int!, $content: String!) {\n        createReply(noteId: $noteId, rootId: $rootId, commentId: $commentId, content: $content) {\n            id\n            ...ReplyFragment\n        }\n    }\n": types.ReplyDocument,
    "\n    mutation NoteComment($noteId: Int!, $content: String!) {\n        createNoteComment(noteId: $noteId, content: $content) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }": types.NoteCommentDocument,
    "\n    query publishedNotes($pageSize: Int!, $cursor: Int) {\n        publishedNotes(pageSize: $pageSize, cursor: $cursor) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": types.PublishedNotesDocument,
    "\n    query collectedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        collectedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": types.CollectedNotesDocument,
    "\n    query ProfileDetail($userId: Int!) {\n        profile(userId: $userId) {\n            id\n            serialNumber\n            email\n            fullname\n            avatar\n            bio\n            createdAt\n            followsCount\n            fansCount\n            likedCount\n            collectedCount\n            isSelf\n            isFollowed\n        }\n    }\n": types.ProfileDetailDocument,
    "\n    query likedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        likedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": types.LikedNotesDocument,
    "\n    query userNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        userNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n": types.UserNotesDocument,
    "\n    query ProfileByAuth {\n        profileByAuth {\n            id\n            fullname\n            avatar\n        }\n    }\n": types.ProfileByAuthDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Signin($email: String!, $password: String!) {\n      signin(email: $email, password: $password) {\n          id\n          fullname\n          avatar\n      }\n    }\n"): (typeof documents)["\n    mutation Signin($email: String!, $password: String!) {\n      signin(email: $email, password: $password) {\n          id\n          fullname\n          avatar\n      }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Note($id: Int!) {\n        publishedNote(id: $id) {\n            id\n            title\n            content\n            type\n            images\n            video\n            views\n            createdAt\n            updatedAt\n            userId\n            user {\n                id\n                fullname\n                avatar\n                isFollowed\n            }\n            likedCount\n            commentsCount\n            collectedCount\n            liked\n            collected\n        }\n    }\n"): (typeof documents)["\n    query Note($id: Int!) {\n        publishedNote(id: $id) {\n            id\n            title\n            content\n            type\n            images\n            video\n            views\n            createdAt\n            updatedAt\n            userId\n            user {\n                id\n                fullname\n                avatar\n                isFollowed\n            }\n            likedCount\n            commentsCount\n            collectedCount\n            liked\n            collected\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CollectNote($id: Int!) {\n        collectNote(id: $id)\n    }"): (typeof documents)["\n    mutation CollectNote($id: Int!) {\n        collectNote(id: $id)\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CancelCollectNote($id: Int!) {\n        cancelCollectNote(id: $id)\n    }\n"): (typeof documents)["\n    mutation CancelCollectNote($id: Int!) {\n        cancelCollectNote(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Follow($userId: Int!) {\n        follow(userId: $userId)\n    }\n"): (typeof documents)["\n    mutation Follow($userId: Int!) {\n        follow(userId: $userId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Unfollow($userId: Int!) {\n        unfollow(userId: $userId)\n    }\n"): (typeof documents)["\n    mutation Unfollow($userId: Int!) {\n        unfollow(userId: $userId)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LikeNote($id: Int!) {\n        likeNote(id: $id)\n    }\n"): (typeof documents)["\n    mutation LikeNote($id: Int!) {\n        likeNote(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CancelLikeNote($id: Int!) {\n        unlikeNote(id: $id)\n    }\n"): (typeof documents)["\n    mutation CancelLikeNote($id: Int!) {\n        unlikeNote(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation LikeComment($id: Int!) {\n        likeComment(id: $id)\n    }\n"): (typeof documents)["\n    mutation LikeComment($id: Int!) {\n        likeComment(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation CancelLikeComment($id: Int!) {\n        unlikeComment(id: $id)\n    }\n"): (typeof documents)["\n    mutation CancelLikeComment($id: Int!) {\n        unlikeComment(id: $id)\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ReplyFragment on Reply {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        likedCount\n        liked\n        parentId\n        rootId\n        bizId\n        parent {\n            id\n            content\n            user {\n                id\n                fullname\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment ReplyFragment on Reply {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        likedCount\n        liked\n        parentId\n        rootId\n        bizId\n        parent {\n            id\n            content\n            user {\n                id\n                fullname\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment CommentFragment on Comment {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        replies {\n            id\n            ...ReplyFragment\n        }\n        repliesCount\n        likedCount\n        liked\n    }\n"): (typeof documents)["\n    fragment CommentFragment on Comment {\n        userId\n        content\n        createdAt\n        updatedAt\n        user {\n            id\n            fullname\n            avatar\n        }\n        replies {\n            id\n            ...ReplyFragment\n        }\n        repliesCount\n        likedCount\n        liked\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNoteComments($noteId: Int!, $minId: Int, $limit: Int!) {\n        comments(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }\n"): (typeof documents)["\n    query GetNoteComments($noteId: Int!, $minId: Int, $limit: Int!) {\n        comments(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query FetchReplies($noteId: Int!, $minId: Int, $limit: Int!) {\n        replies(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            ...ReplyFragment\n        }\n    }\n"): (typeof documents)["\n    query FetchReplies($noteId: Int!, $minId: Int, $limit: Int!) {\n        replies(noteId: $noteId, minId: $minId, limit: $limit) {\n            id\n            ...ReplyFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation Reply($noteId: Int!, $rootId: Int!, $commentId: Int!, $content: String!) {\n        createReply(noteId: $noteId, rootId: $rootId, commentId: $commentId, content: $content) {\n            id\n            ...ReplyFragment\n        }\n    }\n"): (typeof documents)["\n    mutation Reply($noteId: Int!, $rootId: Int!, $commentId: Int!, $content: String!) {\n        createReply(noteId: $noteId, rootId: $rootId, commentId: $commentId, content: $content) {\n            id\n            ...ReplyFragment\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    mutation NoteComment($noteId: Int!, $content: String!) {\n        createNoteComment(noteId: $noteId, content: $content) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }"): (typeof documents)["\n    mutation NoteComment($noteId: Int!, $content: String!) {\n        createNoteComment(noteId: $noteId, content: $content) {\n            id\n            bizId\n            ...CommentFragment\n        }\n    }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query publishedNotes($pageSize: Int!, $cursor: Int) {\n        publishedNotes(pageSize: $pageSize, cursor: $cursor) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query publishedNotes($pageSize: Int!, $cursor: Int) {\n        publishedNotes(pageSize: $pageSize, cursor: $cursor) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query collectedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        collectedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query collectedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        collectedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ProfileDetail($userId: Int!) {\n        profile(userId: $userId) {\n            id\n            serialNumber\n            email\n            fullname\n            avatar\n            bio\n            createdAt\n            followsCount\n            fansCount\n            likedCount\n            collectedCount\n            isSelf\n            isFollowed\n        }\n    }\n"): (typeof documents)["\n    query ProfileDetail($userId: Int!) {\n        profile(userId: $userId) {\n            id\n            serialNumber\n            email\n            fullname\n            avatar\n            bio\n            createdAt\n            followsCount\n            fansCount\n            likedCount\n            collectedCount\n            isSelf\n            isFollowed\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query likedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        likedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query likedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        likedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query userNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        userNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"): (typeof documents)["\n    query userNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {\n        userNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {\n            id\n            title\n            content\n            images\n            video\n            type\n            user {\n                id\n                fullname\n                avatar\n            }\n            liked\n            likedCount\n            views\n            collected\n            collectedCount\n            commentsCount\n            createdAt\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ProfileByAuth {\n        profileByAuth {\n            id\n            fullname\n            avatar\n        }\n    }\n"): (typeof documents)["\n    query ProfileByAuth {\n        profileByAuth {\n            id\n            fullname\n            avatar\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;