import { AttachMoney, ShoppingCart, ShowChart } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { BarChart } from "../../components/Dashboard/BarChart";
import DataCard from "../../components/Dashboard/DataCard";
import { PieChart } from "../../components/Dashboard/PieCart";
import useRedirectUser from "../../hooks/useRedirectUser";

const DashBoard = () => {
  useRedirectUser("/login");

  const sx = {
    width: [26, 44],
    height: [26, 44],

    color: "white",
  };
  const CardItems = [
    {
      title: "Orders Completed",
      icon: <ShoppingCart sx={sx} />,
      value: "34",
      subtitle: "Total Sales of all time",
      color: "primary.main",
      shadowColor: "rgba(255,0,0,0.6)",
    },
    {
      title: "Total Profit",
      icon: <ShowChart sx={sx} />,
      value: "$4,500",
      subtitle: "Profit made by selling books",
      color: "rgb(87, 202, 34)",
      shadowColor: "rgba(87, 202, 34,0.6)",
    },
    {
      title: "Inventory Worth",
      icon: <AttachMoney sx={sx} />,
      value: "$91,500",
      subtitle: "Total Worth of all books in inventory",
      color: "#FFA319",
      shadowColor: "rgba(255, 163, 25 ,0.6)",
    },
  ];

  return (
    <>
      <Box p={2} pr={5}>
        <Grid container spacing={4} pr={[0, 0, 0, 5]}>
          {CardItems.map((item, index) => {
            return (
              <Grid item key={index} lg={4} md={6} sm={6} xs={12}>
                <DataCard
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={item.icon}
                  value={item.value}
                  color={item.color}
                  shadowColor={item.shadowColor}
                />
              </Grid>
            );
          })}

          <Grid item xs={12} lg={8}>
            <BarChart
              chartSeries={[
                {
                  name: "This year",
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                },
              ]}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <PieChart
              chartSeries={[63, 15, 22]}
              labels={["Completed", "Cancelled", "Pending"]}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashBoard;
