import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import "../css/Data.css";
import { api } from "../apis/api";
import DataTable from "react-data-table-component";
import { Edit, DeleteOutline, Comment } from "@mui/icons-material";
import { Link } from "react-router-dom";


function Data() {
  const [atms, setATMs] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [formCities, setFormCities] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const defaultForm ={
    id: null,
    atM_Name: "",
    atM_Address: "",
    atM_Latitude: "",
    atM_Longitude: "",
    atM_Status: true,
    atM_ZIPCode: "",
    city_ID: "",
    province_ID: "",
  }
  const [form, setForm] = useState(defaultForm);

  //-------------------------GET REQUESTS------------------------------------
  const getATMs = async () => {
    try {
      const response = await api().get("/ATMs");
      setATMs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinces = async () => {
    try {
      const response = await api().get("/Provinces");
      setProvinces(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCitiesByProvinceId = async () => {
    try {
      const response = await api().get(
        `/Cities/ListCities/${form.province_ID}`
      );
      setFormCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCities = async () => {
    try {
      const response = await api().get("/Cities");
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getATMs();
    getCities();
    getProvinces();
  }, []);
  useEffect(() => {
    form.province_ID && getCitiesByProvinceId();
    //eslint-disable-next-line
  }, [form.province_ID]);
//--------------------------------------------------------------------------


//------------------------POST AND PUT REQUESTS-----------------------------
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      api()
        .put("/ATMs", {
          id: form.id,
          atM_Name: form.atM_Name,
          atM_Address: form.atM_Address,
          atM_Latitude: form.atM_Latitude,
          atM_Longitude: form.atM_Longitude,
          atM_Status: form.atM_Status,
          atM_ZIPCode: form.atM_ZIPCode,
          createdDate: form.createdDate,
          updatedDate: form.updatedDate,
          city_ID: form.city_ID,
          city_Name: formCities?.filter((e) => {
            return e.city_ID === form.city_ID;
          })[0]?.city_Name,
          province_ID: form.province_ID,
          province_Name: provinces?.filter((e) => e.id === form.province_ID)[0]
            ?.province_Name,
        }).then((res) =>{

          handleClose();
          
        }) 

    } else {
      api()
        .post("/ATMs", {
          atM_Name: form.atM_Name,
          atM_Address: form.atM_Address,
          atM_Latitude: form.atM_Latitude,
          atM_Longitude: form.atM_Longitude,
          atM_Status: form.atM_Status,
          atM_ZIPCode: form.atM_ZIPCode,
          city_ID: form.city_ID,
          city_Name: formCities?.filter((e) => {
            return e.city_ID === form.city_ID;
          })[0]?.city_Name,
          province_ID: form.province_ID,
          province_Name: provinces?.filter((e) => e.id === form.province_ID)[0]
            ?.province_Name,
        })
        .then((res) =>{
          handleClose();
        }).catch((err) =>{
          
        }) 
    }
  };
//--------------------------------------------------------------------------

//-------------------------DELETE REQUEST-----------------------------------
  const deleteATM = async (id) => {
    await api().delete(`ATMs/${id}`);
    setATMs(
      atms.filter((atm) => {
        return atm.id !== id;
      })
    );
  };
//--------------------------------------------------------------------------

//-----------------------Open and Close Dialog------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setForm(defaultForm);
    setIsEdit(false);
    getATMs();
    setOpen(false);

  };
  //--------------------------------------------------------------------------


  // DATA TABLE COLUMNS
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "ATM_Name",
      selector: (row) => row.atM_Name,
      sortable: true,
    },
    {
      name: "Province Name",
      selector: (row) =>
        provinces?.filter((e) => e.id === row.province_ID)[0]?.province_Name,
      sortable: true,
    },
    {
      name: "City Name",
      selector: (row) =>
        cities?.filter((e) => e.id === row.city_ID)[0]?.city_Name,
      sortable: true,
    },
    {
      name: "Zip Code",
      selector: (row) => row.atM_ZIPCode,
      sortable: true,
    },
    {
      name: "Latitude",
      selector: (row) => row.atM_Latitude,
      sortable: true,
    },
    {
      name: "Longitude",
      selector: (row) => row.atM_Longitude,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.atM_Address,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row) => row.createdDate,
      sortable: true,
    },
    {
      name: "Updated Date",
      selector: (row) => row.updatedDate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.atM_Status ? "Active" : "Passive"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <>
            <div
              onClick={(e) => {
                setForm(() => {
                  setIsEdit(true);
                  return row;
                });
                handleClickOpen();
              }}
              className="editIcon"
            >
              <Edit />
            </div>

            <div className="deleteIcon">
              <DeleteOutline onClick={(e) => deleteATM(row.id)} />
            </div>
            <Link to={"/detail/"+row.id}>
            <div className="detailIcon">
              <Comment/>
            </div>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <Box flex={14} p={2} style={{ height: 850, width: "90%", paddingTop: "64px" }}>
      <DataTable
        columns={columns}
        data={atms}
        pagination
        highlightOnHover
        actions={
          <Button  onClick={handleClickOpen} variant="contained" color="primary">
            Add ATM
          </Button>
        }
      />

      <Dialog
        PaperProps={{
          sx: {
            height: "100%",
            maxHeight: "700px!important",
            width: "100%",
            maxWidth: "900px!important",
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{isEdit ? "Edit ATM" : "Add ATM"}</DialogTitle>

        <DialogContent>
          <form onSubmit={(e) => submit(e)}>
            <div className="container">
              <div className="p-4 border-top border-bottom  w-100">
                <div className="row">
                  <div className="col-6 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="ATM Name"
                      variant="outlined"
                      value={form.atM_Name}
                      fullWidth
                      required
                      onChange={(e) =>
                        setForm((prevState) => {
                          return {
                            ...prevState,
                            atM_Name: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Zip Code"
                      variant="outlined"
                      value={form.atM_ZIPCode}
                      fullWidth
                      required
                      onChange={(e) =>
                        setForm((prevState) => {
                          return {
                            ...prevState,
                            atM_ZIPCode: e.target.value,
                          };
                        })
                      }
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <FormControl fullWidth>
                      <InputLabel>Province</InputLabel>
                      <Select
                        labelId="select-demo"
                        id="province-select"
                        value={form.province_ID}
                        label="Province"
                        fullWidth
                        required
                        onChange={(e) =>
                          setForm((prevState) => {
                            return {
                              ...prevState,
                              province_ID: e.target.value,
                            };
                          })
                        }
                      >
                        <MenuItem>Empty</MenuItem>
                        {provinces?.map((getProvince, index) => (
                          <MenuItem key={index} value={getProvince.id}>
                            {getProvince.province_Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="col-6 mb-3">
                    <FormControl fullWidth>
                      <InputLabel>City</InputLabel>
                      <Select
                        labelId="cityLabel"
                        id="city"
                        value={form.city_ID}
                        label="City"
                        fullWidth
                        required
                        disabled={!formCities?.length}
                        onChange={(e) =>
                          setForm((prevState) => {
                            return {
                              ...prevState,
                              city_ID: e.target.value,
                            };
                          })
                        }
                      >
                        <MenuItem>Empty</MenuItem>
                        {formCities.map((getCity, index) => (
                          <MenuItem key={index} value={getCity.city_ID}>
                            {getCity.city_Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="col-6 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Latitude"
                      variant="outlined"
                      value={form.atM_Latitude}
                      fullWidth
                      required
                      onChange={(e) =>
                        setForm((prevState) => {
                          return {
                            ...prevState,
                            atM_Latitude: e.target.value,
                          };
                        })
                      }
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Longitude"
                      variant="outlined"
                      value={form.atM_Longitude}
                      fullWidth
                      required
                      onChange={(e) =>
                        setForm((prevState) => {
                          return {
                            ...prevState,
                            atM_Longitude: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      value={form.atM_Address}
                      fullWidth
                      rows={3}
                      multiline
                      required
                      onChange={(e) => {
                        console.log(e.target.value);
                        setForm((prevState) => {
                          return {
                            ...prevState,
                            atM_Address: String(e.target.value),
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <FormGroup fullWidth>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={form.atM_Status}
                            onChange={(e) =>
                              setForm((prevState) => {
                                return {
                                  ...prevState,
                                  atM_Status: e.target.checked,
                                };
                              })
                            }
                          />
                        }
                        label="Active"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
            <Button variant="contained" className="m-3" onClick={handleClose}>Close</Button>
            <Button variant="contained" className="m-3" type="submit">{isEdit ? "Edit" : "Add"}</Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </Box>
  );
}
export default Data;
