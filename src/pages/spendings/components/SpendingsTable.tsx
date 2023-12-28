import { observer } from "mobx-react-lite";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PaidIcon from "@mui/icons-material/Paid";
import moment from "moment";
import { priceFormatter } from "../../../utils/priceFormatter";
import { Spending } from "../../../types";

interface TableProps {
  tableData: Spending[];
}

export const SpendingsTable = observer((props: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="table of spendings">
        <TableBody>
          {props.tableData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>
                <PaidIcon color="primary" fontSize="large" />
              </TableCell>
              <TableCell>
                <Box>
                  <Typography variant="h6">{data.description}</Typography>
                  <Typography variant="caption">
                    {moment(data.spent_at).format("h:mm A - MMMM DD, YYYY")}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {priceFormatter(data.currency).format(data.amount)}
              </TableCell>
              <TableCell>
                <Button
                  disabled
                  variant="contained"
                  color="inherit"
                  sx={{ minWidth: 0, padding: 1, mr: 1 }}
                >
                  <BorderColorIcon
                    color="inherit"
                    sx={{ color: "white" }}
                    fontSize="small"
                  />
                </Button>
                <Button
                  disabled
                  variant="contained"
                  color="inherit"
                  sx={{ minWidth: 0, padding: 1 }}
                >
                  <CloseIcon
                    color="inherit"
                    sx={{ color: "white" }}
                    fontSize="small"
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
