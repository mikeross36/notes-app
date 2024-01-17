import { createContext, useMemo, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  content: string;
  tags: Tag[];
};

export type StoredNote = {
  id: string;
} & StoredNoteData;

export type StoredNoteData = {
  title: string;
  content: string;
  tagIds: string[];
};

type NotesWithTags = {
  tags: Tag[];
  id: string;
  title: string;
  content: string;
  tagIds: string[];
};

type PropsType = {
  children: React.ReactNode;
};

type NoteContextType = {
  notesWithTags: NotesWithTags[];
  createNote: (data: NoteData) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  tags: Tag[];
};

const NoteContext = createContext({} as NoteContextType);

export const useNoteContext = () => {
  return useContext(NoteContext);
};

export const NotesContextProvider = ({ children }: PropsType) => {
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [notes, setNotes] = useLocalStorage<StoredNote[]>("NOTES", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const createNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes: Note[]) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const deleteNote = (id: string) => {
    setNotes((prevNotes: Note[]) => prevNotes.filter((note) => note.id !== id));
  };

  const updateNote = (id: string, { tags, ...newData }: NoteData) => {
    setNotes((prevNotes: Note[]) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...newData, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prevTags: Tag[]) => [...prevTags, tag]);
  };

  const updateTag = (id: string, newLabel: string) => {
    setTags((prevTags: Tag[]) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, newLabel };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prevTags: Tag[]) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notesWithTags,
        createNote,
        deleteNote,
        updateNote,
        addTag,
        updateTag,
        deleteTag,
        tags,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
