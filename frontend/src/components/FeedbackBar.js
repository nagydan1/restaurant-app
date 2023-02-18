/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FeedbackBar({
  open, severity, message, handleClose,
}) {
  let feedbackMessage = message;
  if (message === 'Failed to fetch') feedbackMessage = 'Your order can\'t be saved at them moment. Try again later.';

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default FeedbackBar;
