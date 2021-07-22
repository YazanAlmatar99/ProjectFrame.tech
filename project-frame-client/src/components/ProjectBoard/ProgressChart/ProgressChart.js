import { Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
const ProgressChart = ({ todoItems, inProgressItems, doneItems }) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData({
      labels: ["To DO", "In Progress", "Done"],
      datasets: [
        {
          data: [todoItems, inProgressItems, doneItems],
          backgroundColor: [
            "rgb(169,169,169)",
            "rgb(54, 162, 235)",
            " rgb(152,251,152)",
          ],
          hoverOffset: 8,
        },
      ],
    });
  }, [todoItems, inProgressItems, doneItems]);

  return (
    <div>
      <Doughnut
        height={250}
        width={500}
        data={data}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default ProgressChart;
