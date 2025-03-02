import {useLazyQuery} from "@apollo/client";
import {gql} from "@/__generated__";
import {NoteList} from "@/components/note-list.tsx";
import {LoadMore} from "@/components/load-more.tsx";

const GET_PUBLISHED_NOTES = gql(/* GraphQL */`
    query publishedNotes($pageSize: Int!, $cursor: Int) {
        publishedNotes(pageSize: $pageSize, cursor: $cursor) {
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

export function Explore() {
  const [getPublishedNotes, { data, fetchMore: fetchMorePublishedNotes }] = useLazyQuery(GET_PUBLISHED_NOTES, {
    variables: {
      pageSize: 12,
      cursor: null,
    },
  });

  const loadMore = async () => {
    if (!data?.publishedNotes) {
      return getPublishedNotes();
    } else {
      return fetchMorePublishedNotes({
        variables: {
          cursor: data?.publishedNotes[data.publishedNotes.length - 1].id,
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) return prev;
          return {
            ...prev,
            publishedNotes: [...(prev.publishedNotes ?? []), ...fetchMoreResult.publishedNotes],
          };
        }
      });
    }
  }

  return (
    <div className="px-8 py-8 min-h-screen">
      <LoadMore fetchMore={loadMore}>
        <NoteList list={data?.publishedNotes ?? []} />
      </LoadMore>
    </div>
  )
}
