import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import {
  Diagnosis,
  EntryFormValues,
  Gender,
  HealthCheckRating,
} from "../types";
import { InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, [...data]);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};

export const TypeSelection = ({
  types,
  setFieldTouched,
  setValues,
  values,
}: {
  types: string[];
  setFieldTouched: FormikProps<{ type: string }>["setFieldTouched"];
  setValues: FormikProps<EntryFormValues>["setValues"];
  values: EntryFormValues;
}) => {
  const [selectedType, setSelectedType] = useState<string>(types[0]);
  const field = "type";
  const onChange = (data: string) => {
    setSelectedType(data);
    setFieldTouched(field, true);
    switch (data) {
      case "Hospital": {
        setValues({
          ...values,
          type: "Hospital",
          dischargeCriteria: "",
          dischargeDate: "",
        });
        break;
      }
      case "OccupationalHealthcare":
        setValues({
          ...values,
          type: "OccupationalHealthcare",
          employerName: "",
          sickLeaveStartDate: "",
          sickLeaveEndDate: "",
        });
        break;
      case "HealthCheck":
        setValues({
          ...values,
          type: "HealthCheck",
          healthCheckRating: 0,
        });
    }
  };

  const stateOptions = types.map((type) => ({
    key: type,
    text: type,
    value: type,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Entry Type</InputLabel>
      <Select
        value={selectedType}
        onChange={(e) => onChange(e.target.value as string)}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};

export const HealthCheckRatingSelection = ({
  healthChecks,
  setFieldValue,
  setFieldTouched,
}: {
  healthChecks: Array<string | HealthCheckRating>;
  setFieldValue: FormikProps<{ healthCheck: number }>["setFieldValue"];
  setFieldTouched: FormikProps<{ healthCheck: number }>["setFieldTouched"];
}) => {
  const [selectedHealthChecks, setSelectedHealthChecks] = useState<number>(0);
  const field = "healthCheckRating";
  const onChange = (data: number) => {
    setSelectedHealthChecks(data);
    setFieldTouched(field, true);
    setFieldValue(field, data);
  };

  const stateOptions = healthChecks.map((healthCheck) => ({
    key: healthCheck,
    text: healthCheck,
    value: healthCheck,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Health Check Rating</InputLabel>
      <Select
        value={selectedHealthChecks}
        onChange={(e) => onChange(e.target.value as number)}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
