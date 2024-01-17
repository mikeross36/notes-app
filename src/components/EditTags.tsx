import { Modal, Form, Stack, Row, Col, Button } from "react-bootstrap";
import { useNoteContext, Tag } from "../context/NotesContextProvider";

type EditTagsProps = {
  editTags: boolean;
  handleHide: () => void;
  storedTags: Tag[];
  updateTag: (id: string, label: string) => void;
};

const EditTags: React.FC<EditTagsProps> = ({
  editTags,
  handleHide,
  storedTags,
  updateTag,
}) => {
  const { deleteTag } = useNoteContext();

  return (
    <Modal show={editTags} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {storedTags.map((tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => updateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => deleteTag(tag.id)}
                      variant="danger"
                      size="sm"
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTags;
