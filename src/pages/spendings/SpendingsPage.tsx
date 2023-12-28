import { useContext } from "react";
import { observer } from "mobx-react-lite";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { SelectField } from "../../components/InputFields";
import { SpendingsTable } from "./components/SpendingsTable";

import { useSpendings } from "../../services/spendings";
import { SpendingsStoreContext } from "../../stores/spendingsStore";
import { Currency, OrderType } from "../../types";

import { AddNewSpending } from "./components/AddNewSpending";

const orderMapStringToValue = {
  "Date descending (default)": "-spent_at",
  "Date ascending": "spent_at",
  "Amount descending": "-amount",
  "Amount ascending": "amount",
};

const orderMapValueToString = {
  "-spent_at": "Date descending (default)",
  spent_at: "Date ascending",
  "-amount": "Amount descending",
  amount: "Amount ascending",
};

export const SpendingsPage = observer(() => {
  const spendingsStore = useContext(SpendingsStoreContext);

  const { data, isLoading, isError, isSuccess } = useSpendings(
    spendingsStore.selectedCurrency,
    spendingsStore.selectedOrder
  );

  const handleCurrencyChange = (c: Currency | "All") => {
    spendingsStore.setSelectedCurrency(c === "All" ? null : c);
  };

  const handleOrderChange = (o: keyof typeof orderMapStringToValue | null) => {
    spendingsStore.setSelectedOrder(
      o ? (orderMapStringToValue[o] as OrderType) : null
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 4,
        pt: 12,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <AddNewSpending />
      </Box>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2 }}
        columns={24}
        sx={{ mb: 2, width: "100%" }}
      >
        <Grid item xs={8}>
          <SelectField
            id="sortby"
            label="Sort by"
            value={
              spendingsStore.selectedOrder
                ? orderMapValueToString[
                    spendingsStore.selectedOrder as keyof typeof orderMapValueToString
                  ]
                : undefined
            }
            handleChange={(e) =>
              handleOrderChange(
                e.target.value as keyof typeof orderMapStringToValue
              )
            }
            options={Object.keys(orderMapStringToValue)}
            renderedValues={true}
          />
        </Grid>
        <Grid item xs={8} />
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Chip
            label="ALL"
            color="primary"
            onClick={() => handleCurrencyChange("All")}
            {...(spendingsStore.selectedCurrency !== undefined && {
              variant: "outlined",
            })}
            sx={{ mr: 1 }}
          />
          <Chip
            label="HUF"
            color="primary"
            onClick={() => handleCurrencyChange("HUF")}
            {...(spendingsStore.selectedCurrency !== "HUF" && {
              variant: "outlined",
            })}
            sx={{ mr: 1 }}
          />
          <Chip
            label="USD"
            color="primary"
            onClick={() => handleCurrencyChange("USD")}
            {...(spendingsStore.selectedCurrency !== "USD" && {
              variant: "outlined",
            })}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!isLoading && (data ?? []).length > 0 && (
          <SpendingsTable tableData={data ?? []} />
        )}
        {!isLoading && isSuccess && (data ?? []).length === 0 && (
          <Typography variant="body1">There is no data to show.</Typography>
        )}
        {isLoading && (
          <CircularProgress color="primary" size={120} sx={{ mt: 6 }} />
        )}
        {isError && (
          <Alert severity="error">
            There was an error while loading the results. Please, try again
            later.
          </Alert>
        )}
      </Box>
    </Container>
  );
});
