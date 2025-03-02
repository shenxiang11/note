import {NoteCard} from "@/components/note-card.tsx";
import Masonry from "react-layout-masonry";
import {Note} from "@/__generated__/graphql.ts";
import {DeepPartial} from "@apollo/client/utilities";

export function NoteList({ list }: {
  list: DeepPartial<Note>[],
}) {
  return (
    <Masonry
      columns={{640: 2, 768: 3, 1024: 4, 1280: 5 }}
      gap={16}
    >
      {
        list.map((note) => (
          <NoteCard
            note={note}
            key={note.id}
          />
        ))
      }
    </Masonry>
  );
}
