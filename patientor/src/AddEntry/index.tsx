import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../types";
import { Alert } from "@material-ui/lab";

interface AddEntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: AddEntryModalProps) => {
  return (
    <Dialog fullWidth open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
