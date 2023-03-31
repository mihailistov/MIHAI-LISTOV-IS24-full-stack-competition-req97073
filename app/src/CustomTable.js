import React, { useState, useEffect } from "react";
import MUIDataTable from 'mui-datatables'
import CustomToolbar from "./CustomToolbar";
import BasicModal from "./Modal";

const CustomTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const parseObjToArray = data => data.map(product => (
    [
      product.productId || "",
      product.name || "",
      product.owner || "",
      product.scrumMaster || "",
      product.developerNames || [],
      product.methodology || "",
      product.startDate || "",
    ]
  ));

  const parseArrayToObj = product => ({
    productId: product[0],
    name: product[1],
    owner: product[2],
    scrumMaster: product[3],
    developerNames: product[4],
    methodology: product[5],
    startDate: product[6]
  });

  const fetchData = () => {
    return fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setData(parseObjToArray(data)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Product ID",
      options: {
        filter: true,
      }
    },
    {
      name: "Name",
      options: {
        filter: true,
      }
    },
    {
      name: "Owner",
      options: {
        filter: true,
      }
    },
    {
      name: "Scrum Master",
      options: {
        filter: true,
      }
    },
    {
      name: "Developer Names",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <ul>
              {data[dataIndex][4].map((developerName) => (
                developerName && <li>{developerName}</li>
              ))}
            </ul>
          );
        }
      }
    },
    {
      name: "Methodology",
      options: {
        filter: true,
      }
    },
    {
      name: "Start Date",
      options: {
        filter: true,
      }
    },
    {
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <button onClick={() => {
              setProduct(parseArrayToObj(data[dataIndex]));
              handleOpenModal();
            }}>
              Edit
            </button>
          );
        }
      }
    },
    {
      name: "Delete",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <button onClick={() => {
              const productId = data[dataIndex][0];
              return fetch(`http://localhost:3000/api/products/${productId}`, { method: "DELETE" })
                .then(() => fetchData());
            }}>
              Delete
            </button>
          );
        }
      }
    }
  ];

  const options = {
    filter: true,
    selectableRows: 'none',
    filterType: 'dropdown',
    responsive: 'vertical',
    rowsPerPage: 10,
    customToolbar: () => {
      return (
        <CustomToolbar handleOpenModal={handleOpenModal} handleSetProduct={handleSetProduct} />
      );
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleSetProduct = product => setProduct(product);

  return (
    <>
      <MUIDataTable title={"IMB Product List"} data={data} columns={columns} options={options} />
      <BasicModal product={product} open={open} setOpen={setOpen} fetchData={fetchData} />
    </>
  );
}

export default CustomTable;