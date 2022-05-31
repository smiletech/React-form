
// 
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";


// let rows=JSON.parse(localStorage.getItem("Data"))||[];


export default function List() {
    let navigate = useNavigate();
    const [count, setcount] = React.useState(0)
    const [rows, setrows] = React.useState(JSON.parse(localStorage.getItem("Data"))||[])


    const HndDelete=(index)=>{
        const DataArr=JSON.parse(localStorage.getItem("Data"))||[]
        DataArr.splice(index,1)
        localStorage.setItem("Data",JSON.stringify(DataArr));
        alert("data deleted")
        setcount(prv=>prv+1)
        console.log(index);
         }


  React.useEffect(() => {
    setrows(JSON.parse(localStorage.getItem("Data"))||[]);
  console.log(rows);
 },[count])
    
 const HndEdit=(index)=>{
    console.log(index);
    navigate(`/edit/${index}`)
     }

 

  return (
      <>
      <div className="py-5 text-center">
          <h2>List Candidate</h2>
        </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Skill</TableCell>
            <TableCell align="right">Experience</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${row.firstname} ${row.lastname}`}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.prof_info.skills.length}</TableCell>
              <TableCell align="right">{row.prof_info.experience.length}</TableCell>
              <TableCell align="right"><Grid><EditIcon onClick={()=>HndEdit(index)} /> <DeleteIcon onClick={()=>HndDelete(index)} /> </Grid></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
