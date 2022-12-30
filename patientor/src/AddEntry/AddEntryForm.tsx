import { Field, Form, Formik } from "formik";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button, Grid } from "@mui/material";
import { Typography } from "@material-ui/core";

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
    dischargeCriteria: "",
    dischargeDate: "",
    type: "Hospital",
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
    if (!values.dischargeCriteria) errors.dischargeCriteria = requiredError;
    if (!values.dischargeDate) errors.dischargeDate = requiredError;
    else if (!isDate(values.dischargeDate))
      errors.dischargeDate = "Invalid Date";

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={formValidate}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
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
            <Typography variant="h6">Hospital</Typography>
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
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
