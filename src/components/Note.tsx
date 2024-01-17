import { Row, Col, Stack, Badge, Button } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNoteContext } from "../context/NotesContextProvider";

const Note = () => {
  const { deleteNote } = useNoteContext();
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => {
                return (
                  <Badge key={tag.id} className="text-truncate">
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit-note`}>
              <Button variant="success" size="sm">
                edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteNote(note.id);
                navigate("/");
              }}
              variant="danger"
              size="sm"
            >
              delete
            </Button>
            <Link to="/">
              <Button variant="secondary" size="sm">
                back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.content}</ReactMarkdown>
    </>
  );
};

export default Note;
