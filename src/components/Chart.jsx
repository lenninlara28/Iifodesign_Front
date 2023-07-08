import { Fragment } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const RadarChart = (props) => {
  const { tipo, tramo, series } = props;

  const data = {
    labels: tramo,
    datasets: [
      {
        data: series,
        backgroundColor: [
          "#D98880",
          "#7FB3D5",
          "#73C6B6",
          "#F7DC6F",
          "#E59866",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "dataset",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#000",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let total = 0;
            // eslint-disable-next-line
            context.dataset.data.map((item) => {
              total = total + item;
            });
            let value = ((context.parsed * 100) / total).toFixed();
            let label = `${context.label.split(":")[0]}: ${value}%`;
            return label;
          },
        },
      },
    },
  };

  return (
    <Fragment>
      <Typography variant="h6" color="black">
        {tipo}
      </Typography>
      <div className="d-flex justify-content-center">
        <Doughnut data={data} width={800} height={412} options={options} />
      </div>
    </Fragment>
  );
};
export default RadarChart;
