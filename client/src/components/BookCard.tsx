import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

type propsType = {
  title: string;
  author: string;
  quantity: number;
  price: number;
  imageURL: string;
  children: JSX.Element;
};

const BookCard = ({
  title,
  author,
  quantity,
  price,
  imageURL,
  children,
}: propsType) => {
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
            // backgroundImage: `url(${imageURL})`,
            backgroundImage: `linear-gradient(to right bottom, rgba(0,0,0,0.7), rgb(47 41 41 / 80%)),url(${imageURL})`,
          }}
          title="green iguana"
        >
          <img
            src={imageURL}
            alt="book cover"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {author}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Quantity:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              {quantity}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Price:{" "}
            </Typography>
            <Typography variant="body2" color="black">
              ${price}
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
