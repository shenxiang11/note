import {gql} from "@/__generated__";

export const FOLLOW_USER = gql(/* GraphQL */`
    mutation Follow($userId: Int!) {
        follow(userId: $userId)
    }
`);

export const UNFOLLOW_USER = gql(/* GraphQL */`
    mutation Unfollow($userId: Int!) {
        unfollow(userId: $userId)
    }
`);

export const LIKE_NOTE = gql(/* GraphQL */`
    mutation LikeNote($id: Int!) {
        likeNote(id: $id)
    }
`);

export const CANCEL_LIKE_NOTE = gql(/* GraphQL */`
    mutation CancelLikeNote($id: Int!) {
        unlikeNote(id: $id)
    }
`);

export const LIKE_COMMENT = gql(/* GraphQL */`
    mutation LikeComment($id: Int!) {
        likeComment(id: $id)
    }
`);

export const CANCEL_LIKE_COMMENT = gql(/* GraphQL */`
    mutation CancelLikeComment($id: Int!) {
        unlikeComment(id: $id)
    }
`);

export const REPLY_FRAGMENT = gql(/* GraphQL */`
    fragment ReplyFragment on Reply {
        userId
        content
        createdAt
        updatedAt
        user {
            id
            fullname
            avatar
        }
        likedCount
        liked
        parentId
        rootId
        bizId
        parent {
            id
            content
            user {
                id
                fullname
            }
        }
    }
`);


export const COMMENT_FRAGMENT = gql(/* GraphQL */`
    fragment CommentFragment on Comment {
        userId
        content
        createdAt
        updatedAt
        user {
            id
            fullname
            avatar
        }
        replies {
            id
            ...ReplyFragment
        }
        repliesCount
        likedCount
        liked
    }
`);

export const FETCH_NOTE_COMMENTS = gql(/* GraphQL */`
    query GetNoteComments($noteId: Int!, $minId: Int, $limit: Int!) {
        comments(noteId: $noteId, minId: $minId, limit: $limit) {
            id
            bizId
            ...CommentFragment
        }
    }
`);

export const FETCH_REPLIES = gql(/* GraphQL */`
    query FetchReplies($noteId: Int!, $minId: Int, $limit: Int!) {
        replies(noteId: $noteId, minId: $minId, limit: $limit) {
            id
            ...ReplyFragment
        }
    }
`);

export const CREATE_REPLY = gql(/* GraphQL */`
    mutation Reply($noteId: Int!, $rootId: Int!, $commentId: Int!, $content: String!) {
        createReply(noteId: $noteId, rootId: $rootId, commentId: $commentId, content: $content) {
            id
            ...ReplyFragment
        }
    }
`);

export const CREATE_NOTE_COMMENT = gql(/* GraphQL */`
    mutation NoteComment($noteId: Int!, $content: String!) {
        createNoteComment(noteId: $noteId, content: $content) {
            id
            bizId
            ...CommentFragment
        }
    }`
);
