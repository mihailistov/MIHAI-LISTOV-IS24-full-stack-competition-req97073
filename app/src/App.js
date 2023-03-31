import './App.css';
import React, { useState, useEffect } from 'react';
import CustomTable from './CustomTable';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function App() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [healthy, setHealthy] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const healthCheck = () => {
    return fetch("http://localhost:3000/api/ping")
      .then(() => {
        setHealthy(true);
        setOpen(true);
      })
      .catch(() => {
        setError(true);
        setOpen(true);
      });
  };

  useEffect(() => {
    healthCheck();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const renderSnackbarElement = () => {
    if (healthy) return (
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Backend service is online and functional!
          </Alert>
    )

    if (error) return (
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Something is wrong!
      </Alert>
    )
  }

  return (
    <div className="App">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {renderSnackbarElement()}
      </Snackbar>
      <CustomTable />
    </div>
  );
}

export default App;
