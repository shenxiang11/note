import {NoteList} from "@/components/note-list.tsx";
import {gql} from "@/__generated__";
import {useLazyQuery} from "@apollo/client";
import {useParams} from "react-router";
import { LoadMore } from "@/components/load-more";

const QUERY_USER_COLLECTED_NOTES = gql(/* GraphQL */`
    query collectedNotes($userId: Int!, $pageSize: Int!, $cursorId: Int) {
        collectedNotes(userId: $userId, pageSize: $pageSize, cursorId: $cursorId) {
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

export function Collects() {
  const params = useParams();
  const userId = parseInt(params.id!);

  const [getCollectedNotes, { fetchMore, data }] = useLazyQuery(QUERY_USER_COLLECTED_NOTES, {
    variables: { pageSize: 30, userId, cursorId: null },
  });

  const loadMore = async () => {
    if (!data?.collectedNotes) {
      return getCollectedNotes();
    } else {
      return fetchMore({
        variables: {
          cursorId: data?.collectedNotes[data.collectedNotes.length - 1].id,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            collectedNotes: [...(prev.collectedNotes ?? []), ...fetchMoreResult.collectedNotes],
          };
        }
      });
    }
  }

  return (
    <LoadMore fetchMore={loadMore}>
      <NoteList list={data?.collectedNotes ?? []} />
    </LoadMore>
  );
}
