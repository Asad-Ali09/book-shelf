import { Divider, Grid, Stack } from "@mui/material";
import SellerBookCard from "../../components/SellerBooks/SellerBookCard";
import TopBar from "../../components/SellerBooks/TopBar";

const MyBooks = () => {
  const arr = new Array(6).fill(0);

  return (
    <>
      <TopBar />
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={[1, 2]}>
        {arr.map((_, index) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
            <Stack alignItems={"center"}>
              <SellerBookCard />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyBooks;
