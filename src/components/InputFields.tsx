import { ChangeEvent } from "react";
import { Theme } from "@mui/material/styles/createTheme";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const customInputLabelStyle = (theme: Theme) => ({
  position: "relative",
  transform: "none",
  fontSize: "12px",
  color: theme.palette.primary.dark,
});

const customInputStyle = (theme: Theme) => ({
  "& .MuiInputBase-input": {
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 1,
    p: 1,
    mt: 1,
    height: "24px",
  },
  ":before": {
    borderBottom: "none",
  },
});

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number | undefined;
  handleChange: (e: ChangeEvent) => void;
  type?: string;
  minValue?: number;
}

export const InputField = (props: InputFieldProps) => {
  return (
    <FormControl fullWidth={true}>
      <InputLabel id={`${props.id}-label`} sx={customInputLabelStyle}>
        {props.label}
      </InputLabel>
      <TextField
        id={props.id}
        variant="standard"
        value={props.value}
        onChange={props.handleChange}
        sx={customInputStyle}
        {...(props.type && { type: props.type })}
        InputProps={{
          disableUnderline: true,
          inputProps: {
            "data-testid": props.id,
            ...(props.minValue && { min: props.minValue }),
          },
        }}
      />
    </FormControl>
  );
};

interface SelectFieldProps {
  id: string;
  label: string;
  value?: string;
  options: string[];
  handleChange: (e: SelectChangeEvent) => void;
  renderedValues?: boolean;
}

export const SelectField = (props: SelectFieldProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.id}-label`} sx={customInputLabelStyle}>
        {props.label}
      </InputLabel>
      <Select
        id={props.id}
        name={props.id}
        label={props.label}
        variant="standard"
        value={props.value ?? ""}
        onChange={props.handleChange}
        sx={(theme) => ({
          ...customInputStyle(theme),
          mt: "0 !important",
        })}
        displayEmpty={true}
        renderValue={(value) =>
          props.renderedValues
            ? value
              ? `${props.label} ${value}`
              : ""
            : value
        }
        inputProps={{ "data-testid": props.id }}
      >
        {props.options.map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
