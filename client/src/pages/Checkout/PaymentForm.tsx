import { Radio, RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <RadioGroup defaultValue="cod" name="payment-method">
        <FormControlLabel
          value="cod"
          control={<Radio />}
          label="Cash on Delivery"
        />
        <FormControlLabel
          disabled
          value="card"
          control={<Radio />}
          label="Credit Card (Not available right now)"
        />
      </RadioGroup>
    </React.Fragment>
  );
}
