// app/javascript/donut_chart.js

function initDonutChart() {
  const canvas = document.getElementById("donut-chart");
  if (!canvas) return;
  if (typeof Chart === "undefined") return;

  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();

  const total = parseFloat(canvas.dataset.total);
  const remaining = parseFloat(canvas.dataset.remaining);
  const rate = parseFloat(canvas.dataset.rate);
  const isOver = rate > 50;

  const usedColor = isOver ? "#ef4444" : "#C7F284";
  const remainColor = isOver ? "#ef444420" : "#C7F28420";

  new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: remaining >= 0 ? [total, remaining] : [total, 0],
          backgroundColor: [usedColor, remainColor],
          borderWidth: 0,
          borderRadius: 4,
          hoverOffset: 0,
        },
      ],
    },
    options: {
      cutout: "78%",
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      animation: {
        animateRotate: true,
        duration: 800,
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", initDonutChart);
document.addEventListener("turbo:load", initDonutChart);