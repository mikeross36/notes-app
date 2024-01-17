import { useState, useMemo } from "react";
import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "../context/NotesContextProvider";
import NoteCard from "./NoteCard";
import EditTags from "./EditTags";
import { useNoteContext } from "../context/NotesContextProvider";

export type FilteredNote = {
  id: string;
  title: string;
  tags: Tag[];
};

const NoteList = () => {
  const [editTags, setEditTags] = useState(false);
  const [title, setTitle] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const {
    notesWithTags: notes,
    updateTag,
    tags: storedTags,
  } = useNoteContext();

  const filteredNotes: FilteredNote[] = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (filteredTags.length === 0 ||
          filteredTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, filteredTags]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Your Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new-note">
              <Button variant="success" size="sm">
                create
              </Button>
            </Link>
            <Button
              onClick={() => setEditTags(true)}
              variant="primary"
              size="sm"
            >
              edit tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Filter by Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tag">
              <Form.Label>Filter by Tags</Form.Label>
              <ReactSelect
                options={storedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={filteredTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setFilteredTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <EditTags
        editTags={editTags}
        handleHide={() => setEditTags(false)}
        storedTags={storedTags}
        updateTag={updateTag}
      />
    </>
  );
};

export default NoteList;
