import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setError, setShippingDetails } from "../../redux/cart/cartSlice";
import { Theme, useMediaQuery } from "@mui/material";
import { placeOrder } from "../../redux/cart/cartServices";
import toast from "react-hot-toast";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
  step: number,
  shippingDetails: shippingDetailsType,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          shippingDetails={shippingDetails}
          handleInputChange={handleInputChange}
        />
      );
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const {
    shippingDetails: cartShippingState,
    orderID,
    error,
    loading,
  } = useAppSelector((state) => state.cart);

  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [shippingDetails, _setShippingDetails] =
    React.useState(cartShippingState);
  const dispatch = useAppDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    _setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeStep === 0) {
      dispatch(setShippingDetails(shippingDetails));
    }
    if (activeStep === steps.length - 1) {
      // place order
      dispatch(placeOrder())
        .unwrap()
        .then(() => {
          handleNext();
        });
    } else {
      handleNext();
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <>
      <Toolbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
            orientation={sm ? "vertical" : "horizontal"}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your tracking ID is {orderID}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <form onSubmit={handleSubmit}>
              {getStepContent(activeStep, shippingDetails, handleInputChange)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button
                    disabled={loading}
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  //   onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  type="submit"
                  disabled={loading}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </form>
          )}
        </Paper>
        <Copyright />
      </Container>
    </>
  );
}
