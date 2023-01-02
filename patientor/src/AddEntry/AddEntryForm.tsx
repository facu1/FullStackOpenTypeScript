import { Field, Form, Formik } from "formik";
import { EntryFormValues, HealthCheckRating } from "../types";
import {
  DiagnosisSelection,
  HealthCheckRatingSelection,
  TextField,
  TypeSelection,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button, Grid } from "@mui/material";

interface AddEntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: AddEntryFormProps) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: EntryFormValues = {
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: undefined,
    type: "Hospital",
    dischargeCriteria: "",
    dischargeDate: "",
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const formValidate = (values: EntryFormValues) => {
    const requiredError = "Field is required";
    const errors: { [fields: string]: string } = {};

    if (!values.date) errors.date = requiredError;
    else if (!isDate(values.date)) errors.date = "Invalid Date";
    if (!values.description) errors.description = requiredError;
    if (!values.specialist) errors.specialist = requiredError;

    switch (values.type) {
      case "Hospital": {
        if (!values.dischargeCriteria) errors.dischargeCriteria = requiredError;
        if (!values.dischargeDate) errors.dischargeDate = requiredError;
        else if (!isDate(values.dischargeDate))
          errors.dischargeDate = "Invalid Date";
        break;
      }
      case "OccupationalHealthcare": {
        if (!values.employerName) errors.employerName = requiredError;
        if (values.sickLeaveStartDate || values.sickLeaveEndDate) {
          if (!values.sickLeaveStartDate)
            errors.sickLeaveStartDate = requiredError;
          else if (!isDate(values.sickLeaveStartDate))
            errors.sickLeaveStartDate = "Invalid Date";

          if (!values.sickLeaveEndDate) errors.sickLeaveEndDate = requiredError;
          else if (!isDate(values.sickLeaveEndDate))
            errors.sickLeaveEndDate = "Invalid Date";
        }
        break;
      }
      case "HealthCheck": {
        if (typeof values.healthCheckRating !== "number")
          errors.healthCheckRating = requiredError;
      }
    }

    return errors;
  };

  const fieldsByEntryType = (
    entry: EntryFormValues,
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldValue: (
      field: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <>
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <Field
              key="dischargeDate"
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <Field
              label="Employer Name"
              placeholder="Name"
              name="employerName"
              component={TextField}
            />
            <Field
              key="sickLeaveStartDate"
              label="Sick Leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveStartDate"
              component={TextField}
            />
            <Field
              key="sickLeaveEndDate"
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeaveEndDate"
              component={TextField}
            />
          </>
        );
      case "HealthCheck":
        return (
          <HealthCheckRatingSelection
            healthChecks={Object.values(HealthCheckRating).filter(
              (value) => typeof value === "number"
            )}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          ></HealthCheckRatingSelection>
        );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={formValidate}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
        setValues,
      }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              diagnoses={Object.values(diagnoses)}
            />
            <TypeSelection
              setFieldTouched={setFieldTouched}
              setValues={
                setValues as (
                  values: React.SetStateAction<EntryFormValues>,
                  shouldValidate?: boolean | undefined
                ) => void
              }
              values={values}
              types={["Hospital", "OccupationalHealthcare", "HealthCheck"]}
            />
            {fieldsByEntryType(values, setFieldTouched, setFieldValue)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
