import { Card, CardContent, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";

type PieChartProps = {
  chartSeries: number[];
  labels: string[];
  sx?: any;
};

export const PieChart = (props: PieChartProps) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = usePieChartOptions(labels);
  return (
    <Card sx={sx}>
      <CardHeader title="Orders History" />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

const usePieChartOptions = (labels: string[]) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: ["rgb(87, 202, 34)", theme.palette.primary.main, "#FFA319"],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: true,
      position: "bottom" as "bottom",
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};
