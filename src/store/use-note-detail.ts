import {create} from "zustand/react";

interface NoteDetailState {
  id?: number;
  open: (id: number) => void;
  close: () => void;
}

export const noteDetailStore = create<NoteDetailState>((set) => {
  return {
    id: undefined,
    open: (id) => set({id}),
    close: () => set({id: undefined}),
  };
});
