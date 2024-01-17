import NoteForm from "./NoteForm";
import { NoteData } from "../context/NotesContextProvider";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  createNote: (id: string, data: NoteData) => void;
};

const EditNote: React.FC<EditNoteProps> = ({ createNote }) => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        createNote={(data) => createNote(note.id, data)}
        title={note.title}
        content={note.content}
        tags={note.tags}
      />
    </>
  );
};

export default EditNote;
