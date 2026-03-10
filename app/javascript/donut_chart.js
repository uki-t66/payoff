// app/javascript/donut_chart.js

function initDonutChart() {
  const canvas = document.getElementById("donut-chart");
  if (!canvas) return;
  if (typeof Chart === "undefined") return;

  // 既存チャートがあれば破棄
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();

  const total = parseFloat(canvas.dataset.total) || 0;
  const remaining = parseFloat(canvas.dataset.remaining) || 0;
  const rate = parseFloat(canvas.dataset.rate) || 0;
  const isOver = rate > 50;

  new Chart(canvas, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [total, remaining],
        backgroundColor: isOver ? ["#ef4444", "#2d333b"] : ["#C7F284", "#2d333b"],
        borderWidth: 0,
        hoverOffset: 0,
      }]
    },
    options: {
      responsive: false,        // ← ここが重要
      cutout: "72%",
      animation: { duration: 600 },
      plugins: { legend: { display: false }, tooltip: { enabled: false } }
    }
  });
}

document.addEventListener("DOMContentLoaded", initDonutChart);
document.addEventListener("turbo:load", initDonutChart);