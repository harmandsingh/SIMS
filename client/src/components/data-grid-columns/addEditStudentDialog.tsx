import { Modal, Form } from "react-bootstrap";
import { Box } from "@mui/material";

interface AddEditStudentDialogProps {
  onDismiss: () => void;
}

const AddEditStudentDialog = ({ onDismiss }: AddEditStudentDialogProps) => {
  return (
    <Box>
      <>
        <Modal open={open} show onHide={onDismiss}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Student</Modal.Title>
          </Modal.Header>
            
          <Modal.Body>
            <Form id="addEditStudentForm">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type = "text" placeholder="Name"></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </Box>
  );
};

export default AddEditStudentDialog;
