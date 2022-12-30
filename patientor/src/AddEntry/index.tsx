import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../types";

interface AddEntryModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
}: AddEntryModalProps) => {
  return (
    <Dialog fullWidth open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
