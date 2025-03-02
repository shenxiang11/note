import {NoteList} from "@/components/note-list.tsx";
import {gql} from "@/__generated__";
import {useLazyQuery} from "@apollo/client";
import {useParams} from "react-router";
import {LoadMore} from "@/components/load-more.tsx";

const QUERY_USER_LIKED_NOTES = gql(/* GraphQL */`
    query likedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {
        likedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {
            id
            title
            content
            images
            video
            type
            user {
                id
                fullname
                avatar
            }
            liked
            likedCount
            views
            collected
            collectedCount
            commentsCount
            createdAt
        }
    }
`);

export function Likes() {
  const params = useParams();
  const userId = parseInt(params.id!);

  const [getLikedNotes, { fetchMore, data }] = useLazyQuery(QUERY_USER_LIKED_NOTES, {
    variables: { pageSize: 30, userId, cursorId: null },
  });

  const loadMore = async () => {
    if (!data?.likedNotes) {
      return getLikedNotes();
    } else {
      return fetchMore({
        variables: {
          cursorId: data?.likedNotes[data.likedNotes.length - 1].id,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            likedNotes: [...(prev.likedNotes ?? []), ...fetchMoreResult.likedNotes],
          };
        }
      });
    }
  }

  return (
    <LoadMore fetchMore={loadMore}>
      <NoteList list={data?.likedNotes ?? []} />
    </LoadMore>
  );
}
