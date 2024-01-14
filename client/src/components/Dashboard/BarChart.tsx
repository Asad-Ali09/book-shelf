import {
  Card,
  CardContent,
  CardHeader,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";

type BarChartProps = {
  chartSeries: {
    name: string;
    data: number[];
  }[];
  sx?: any;
};

export const BarChart = (props: BarChartProps) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return (
    <Card sx={sx}>
      <CardHeader title="Profit" />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type={md ? "bar" : "line"}
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

const useChartOptions = () => {
  const theme = useTheme();
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  return {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      alpha(theme.palette.primary.main, 0.25),
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: [md ? "transparent" : theme.palette.primary.main],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};
