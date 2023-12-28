import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { InputField, SelectField } from "../../../components/InputFields";

import { createSpending } from "../../../services/spendings";
import { Spending, SpendingInput } from "../../../types";

const defaultSpending = {
  description: "",
  amount: undefined,
  currency: undefined,
};

const defaultErrorMessages = {
  description: "",
  amount: "",
  currency: "",
};

export const AddNewSpending = () => {
  const [newSpending, setNewSpending] =
    useState<SpendingInput>(defaultSpending);

  const [errorMessages, setErrorMessages] = useState<{
    description: string;
    amount: string;
    currency: string;
  }>(defaultErrorMessages);

  const [requestMessage, setRequestMessage] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, isSuccess } = useMutation(
    createSpending,
    {
      onSuccess: () => {
        setRequestMessage("Spending saved successfully!");
        setNewSpending(defaultSpending);
      },
      onError: () => {
        setRequestMessage(
          `There was an error while saving new spending. Please, try again later!`
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries("get");
      },
    }
  );

  const handleSaveClick = () => {
    if (newSpending.description && newSpending.amount && newSpending.currency) {
      setErrorMessages(defaultErrorMessages);
      mutateAsync({
        ...newSpending,
        spent_at: new Date().toISOString(),
      } as Spending);
    } else {
      setErrorMessages({
        description: newSpending.description
          ? ""
          : "Please, provide a description!",
        amount: newSpending.amount ? "" : "Please, provide an amount!",
        currency: newSpending.currency ? "" : "Please, provide a currency!",
      });
    }
  };

  const handleChange = (e: ChangeEvent<Element>) => {
    const target = e.target as HTMLInputElement;
    const value =
      e.target.id === "amount" ? parseInt(target.value, 10) : target.value;
    setNewSpending((prevState) => ({
      ...prevState,
      [e.target.id]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setNewSpending((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isError && requestMessage && (
        <Alert
          severity="error"
          sx={{ position: "absolute", top: "80px", right: 0, zIndex: 10 }}
          onClose={() => setRequestMessage("")}
        >
          {requestMessage}
        </Alert>
      )}
      {isSuccess && requestMessage && (
        <Alert
          severity="success"
          sx={{ position: "absolute", top: "80px", right: 0, zIndex: 10 }}
          onClose={() => setRequestMessage("")}
        >
          {requestMessage}
        </Alert>
      )}
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 2 }}
        columns={20}
        sx={{ width: "100%", maxWidth: "900px" }}
      >
        <Grid item xs={20} sm={10} md={4}>
          <InputField
            id="description"
            label="Description"
            value={newSpending.description}
            handleChange={handleChange}
          />
          <Typography variant="caption" color="error">
            {errorMessages.description}
          </Typography>
        </Grid>
        <Grid item xs={20} sm={10} md={4}>
          <InputField
            id="amount"
            label="Amount"
            value={newSpending.amount}
            handleChange={handleChange}
            type="number"
            minValue={0.01}
          />
          <Typography variant="caption" color="error">
            {errorMessages.amount}
          </Typography>
        </Grid>
        <Grid item xs={20} sm={10} md={4}>
          <FormControl fullWidth>
            <SelectField
              id="currency"
              label="Currency"
              value={newSpending.currency}
              handleChange={handleSelectChange}
              options={["HUF", "USD"]}
            />

            <Typography variant="caption" color="error">
              {errorMessages.currency}
            </Typography>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={20}
          sm={10}
          md={4}
          sx={{ display: "flex", alignItems: "flex-start" }}
        >
          <Button
            variant="contained"
            onClick={handleSaveClick}
            sx={{
              marginTop: "24px",
              height: "41px",
              padding: "8px",
            }}
          >
            Save
            {isLoading ? (
              <CircularProgress color="inherit" size={16} sx={{ ml: 2 }} />
            ) : (
              ""
            )}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
