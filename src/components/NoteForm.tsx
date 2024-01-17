import { useRef, useState, FormEvent } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NewNoteProps } from "./NewNote";
import { Tag, NoteData } from "../context/NotesContextProvider";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/NotesContextProvider";

const NoteForm = ({
  createNote,
  title = "",
  content = "",
  tags = [],
}: NewNoteProps & Partial<NoteData>) => {
  const { addTag, tags: storedTags } = useNoteContext();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [newTags, setNewTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    createNote({
      title: titleRef.current!.value,
      content: contentRef.current!.value,
      tags: newTags,
    });
    navigate("..");
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={title} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  addTag(newTag);
                  setNewTags((prevTags) => [...prevTags, newTag]);
                }}
                options={storedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={newTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setNewTags(
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
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            defaultValue={content}
            ref={contentRef}
            required
          />
        </Form.Group>
        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button type="submit" variant="success" size="sm">
            save
          </Button>
          <Link to="..">
            <Button type="button" variant="primary" size="sm">
              cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
