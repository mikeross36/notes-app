import NoteForm from "./NoteForm";
import { NoteData } from "../context/NotesContextProvider";

export type NewNoteProps = {
  createNote: (data: NoteData) => void;
};

const NewNote: React.FC<NewNoteProps> = ({ createNote }) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm createNote={createNote} />
    </>
  );
};

export default NewNote;
