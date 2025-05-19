<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, onMounted, watch, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
      chartInstance = new Chart(canvas.value, {
        type: "pie",
        data: props.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
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
      canvas,
    };
  },
});
</script>

<style>
/* Add any custom styles here */
</style>