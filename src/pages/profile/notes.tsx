import {NoteList} from "@/components/note-list.tsx";
import {gql} from "@/__generated__";
import {useLazyQuery} from "@apollo/client";
import {useParams} from "react-router";
import {LoadMore} from "@/components/load-more.tsx";

const QUERY_USER_NOTES = gql(/* GraphQL */`
    query userNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {
        userNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {
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

export function Notes() {
  const params = useParams();
  const userId = parseInt(params.id!);

  const [getUserNotes, { fetchMore, data }] = useLazyQuery(QUERY_USER_NOTES, {
    variables: { pageSize: 30, userId, cursorId: null },
  });


  const loadMore = async () => {
    if (!data?.userNotes) {
      return getUserNotes();
    } else {
      return fetchMore({
        variables: {
          cursorId: data?.userNotes[data.userNotes.length - 1].id,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            userNotes: [...(prev.userNotes ?? []), ...fetchMoreResult.userNotes],
          };
        }
      });
    }
  }

  return (
    <LoadMore fetchMore={loadMore}>
      <NoteList list={data?.userNotes ?? []} />
    </LoadMore>
  );
}
