import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./components/NewNote";
import NoteList from "./components/NoteList";
import NoteLayout from "./components/NoteLayout";
import Note from "./components/Note";
import EditNote from "./components/EditNote";
import { useNoteContext } from "./context/NotesContextProvider";

export default function App() {
  const { createNote, updateNote } = useNoteContext();

  return (
    <Container>
      <Routes>
        <Route path="new-note" element={<NewNote createNote={createNote} />} />
        <Route path="/" element={<NoteList />} />
        <Route path="/:id" element={<NoteLayout />}>
          <Route index element={<Note />} />
          <Route
            path="edit-note"
            element={<EditNote createNote={updateNote} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}
