<template>
  <div>
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const barChart = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      chartInstance = new Chart(barChart.value, {
        type: "bar",
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const value = context.raw || 0;
                  return `$${parseFloat(value).toLocaleString()}`; // Ensure proper formatting without leading zeros
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return `$${parseFloat(value).toLocaleString()}`; // Ensure proper formatting without leading zeros
                },
              },
            },
          },
        },
      });
    };

    // Watch for changes in chartData and re-render the chart
    watch(
      () => props.chartData,
      () => {
        renderChart();
      },
      { deep: true }
    );

    onMounted(() => {
      renderChart();
    });

    return {
      barChart,
    };
  },
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>