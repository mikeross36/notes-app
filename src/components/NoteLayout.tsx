import {
  Outlet,
  useParams,
  Navigate,
  useOutletContext,
} from "react-router-dom";
import { Note } from "../context/NotesContextProvider";
import { useNoteContext } from "../context/NotesContextProvider";

const NoteLayout = () => {
  const { notesWithTags: notes } = useNoteContext();
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useNote() {
  return useOutletContext<Note>();
}

export default NoteLayout;
