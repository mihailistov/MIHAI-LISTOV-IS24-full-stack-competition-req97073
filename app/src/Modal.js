import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  '& > *:not(:last-child)': {
    marginBottom: '15px',
  }
};

export default function BasicModal({ product, open, setOpen, fetchData }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productId, setProductId] = useState(product?.productId || "");
  const [name, setName] = useState(product?.name || "");
  const [owner, setOwner] = useState(product?.owner || "");
  const [scrumMaster, setScrumMaster] = useState(product?.scrumMaster || "");
  const [developerNames, setDeveloperNames] = useState(product?.developerNames || new Array(5).fill(""));
  const [methodology, setMethodology] = useState(product?.methodology || "");
  const [startDate, setStartDate] = useState(product?.startDate || "");

  useEffect(() => {
    setProductId(product?.productId || "");
    setName(product?.name || "");
    setOwner(product?.owner || "");
    setScrumMaster(product?.scrumMaster || "");
    handleSetDeveloperNames(product?.developerNames || []);
    setMethodology(product?.methodology || "");
    setStartDate(product?.startDate || "");
  }, [product])

  const handleSetDeveloperNames = developerNames => {
    let newArr = new Array(5).fill("");
    [0, 1, 2, 3, 4].map((_, index) => newArr[index] = developerNames?.[index] || "");
    setDeveloperNames(newArr);
  }

  const handleDeveloperNameChange = index => event => {
    let newArr = [...developerNames];
    newArr[index] = event.target.value;
    setDeveloperNames(newArr);
  }

  const handleSave = () => {
    const newProduct = {
      name,
      owner,
      scrumMaster,
      developerNames,
      methodology,
      startDate
    }
    console.log(newProduct);
    fetch(`http://localhost:3000/api/products${productId ? `/${productId}` : ""}`, { 
      method: productId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    })
        .then(() => fetchData())
        .then(() => handleClose())
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="productId"
            label="Product ID (auto-generated)"
            value={productId}
            disabled={true}
            onChange={(event) => {
              setProductId(event.target.value);
            }}
          />
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            id="owner"
            label="Owner"
            value={owner}
            onChange={(event) => {
              setOwner(event.target.value);
            }}
          />
          <TextField
            id="scrumMaster"
            label="Scrum Master"
            value={scrumMaster}
            onChange={(event) => {
              setScrumMaster(event.target.value);
            }}
          />
          {
            [0, 1, 2, 3, 4].map((_, index) => (
              <TextField
                key={index}
                id={`developerName${index}`}
                label={`Developer Name (${index + 1})`}
                value={developerNames?.[index] || ""}
                onChange={handleDeveloperNameChange(index)}
              />
            ))
          }
          <TextField
            id="methodology"
            label="Methodology (Agile or Waterfall)"
            value={methodology}
            onChange={(event) => {
              setMethodology(event.target.value);
            }}
          />
          <TextField
            id="startDate"
            label="Start Date"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
            }}
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}