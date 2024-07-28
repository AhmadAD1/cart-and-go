import React, { ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Rating,
  TextField,
} from "@mui/material";
import Flex from "@components/Flex/Flex";

interface AddReviewDialogProps {
  open: boolean;
  submitReviewToggle: () => void;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  reviewSubmitHandler: () => void;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({
  open,
  submitReviewToggle,
  rating,
  setRating,
  comment,
  setComment,
  reviewSubmitHandler,
}) => {
  return (
    <>
      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
        {/* <DialogTitle>Submit Review</DialogTitle> */}
        <div
          style={{
            textAlign: "center",
            color: "#ef233c",
            textTransform: "capitalize",
          }}>
          {/* {alert !== "" && alert} */}
        </div>
        <DialogContent className="submitDialog">
          <Flex gap={2} dir="column">
            <Rating
              onChange={(e: ChangeEvent<{}>, newValue: number | null) => {
                if (newValue !== null) {
                  setRating(newValue);
                }
              }}
              value={rating}
              size="large"
            />
            <TextField
              sx={{ width: 400 }}
              placeholder="tell us about your experience"
              rows={2}
              multiline
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            />
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={reviewSubmitHandler} color="primary">
            Add Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddReviewDialog;
