import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const imgSrc =
  "https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg";

type propsType = {
  children: JSX.Element;
};

const BookCard = ({ children }: propsType) => {
  return (
    <>
      <Card sx={{ maxWidth: 300, width: "100%", my: 1 }} elevation={3}>
        <CardMedia
          sx={{
            height: 200,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            bgcolor: "#F0F0EB",
            py: 1,
          }}
          title="green iguana"
        >
          <img
            src={imgSrc}
            alt="book cover"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            OLIVIA WILSON
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            SOUL
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Quantity:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              10
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Price:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              $110
            </Typography>
          </Stack>
        </CardContent>
        <Divider />
        <>{children}</>
      </Card>
    </>
  );
};

export default BookCard;
