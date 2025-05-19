<template>
  <div>
    <!-- Pie Chart and Counter Section -->
    <div class="mt-8 flex flex-wrap justify-center items-start gap-8">
      <!-- Bar Chart Card -->
      <div class="card bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-bold text-left py-2">Service Earnings</h3>
        <BarChart :chart-data="barChartData" />
        <button
          @click="exportTodaysAppointmentsToExcel"
          class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Export Today's Appointments to Excel
        </button>
      </div>

      <!-- Pie Chart Card -->
      <div class="card bg-white p-6 rounded-lg shadow-md" style="">
        <h3 class="text-2xl font-bold text-left py-2">Recent Services<br>(Last 3 Weeks)</h3>
        <PieChart :chart-data="chartData" />
      </div>

      <!-- Appointment Counter Card -->
      <div class="card bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-2xl font-bold text-left py-2">Today's Appointments</h3>
        <p class="text-4xl font-bold text-blue-600">{{ todayAppointments }}</p>
        <h3 class="text-2xl font-bold text-left py-2">Today's Earnings</h3>
        <p class="text-4xl font-bold text-green-600">${{ totalEarnings }}</p>
        <button
          @click="exportAllAppointmentsToExcel"
          class="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
        >
          Export All Appointments to Excel
        </button>
      </div>
    </div>

    <!-- Recent Appointments Section -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-left py-2">Recent Appointments</h2>
      <div class="overflow-x-auto relative sm:rounded-lg appointments-container">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">Last Name</th>
              <th scope="col" class="py-3 px-6">First Name</th>
              <th scope="col" class="py-3 px-6">Phone Number</th>
              <th scope="col" class="py-3 px-6">Email</th>
              <th scope="col" class="py-3 px-6">Start Time</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="appointment in appointments"
              :key="appointment.appointmentid"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ appointment.CustomerLast }}
              </th>
              <td class="py-4 px-6">{{ appointment.CustomerFirst }}</td>
              <td class="py-4 px-6">{{ appointment.phonenumber || 'N/A' }}</td>
              <td class="py-4 px-6">{{ appointment.email || 'N/A' }}</td>
              <td class="py-4 px-6">{{ appointment.formattedStartTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllAppointments, getAllServices, getAllCustomers } from "@/api/api";
import { defineAsyncComponent } from "vue";
import * as XLSX from "xlsx";

// Dynamically import the PieChart and BarChart components
const PieChart = defineAsyncComponent(() =>
  import("@/components/charts/PieChart.vue")
);
const BarChart = defineAsyncComponent(() =>
  import("@/components/charts/BarChart.vue")
);

export default {
  components: {
    PieChart,
    BarChart,
  },
  setup() {
    const appointments = ref([]);
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: "Service Distribution (Last 3 Weeks)",
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    });
    const barChartData = ref({
      labels: [],
      datasets: [
        {
          label: "Earnings (Today)",
          data: [],
          backgroundColor: "#36A2EB",
        },
      ],
    });
    const todayAppointments = ref(0);
    const totalEarnings = ref(0);

    const fetchAppointmentsAndServices = async () => {
      try {
        const appointmentData = await getAllAppointments();
        const serviceData = await getAllServices();
        const customerData = await getAllCustomers();

        console.log("Appointment Data:", appointmentData);
        console.log("Service Data:", serviceData);
        console.log("Customer Data:", customerData);

        // Get the current date and calculate the date 2 days ago
        const today = new Date();
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(today.getDate() - 2);

        // Filter appointments to include only those from the last 2 days
        const recentAppointments = appointmentData.filter((appointment) => {
          const appointmentDate = new Date(appointment.starttime); // Replace with the actual date field
          console.log("Appointment Date:", appointmentDate);
          return appointmentDate >= twoDaysAgo && appointmentDate <= today;
        });

        console.log("Recent Appointments:", recentAppointments);

        // Merge customer data into appointments
        appointments.value = recentAppointments.map((appointment) => {
          const customer = customerData.find(
            (c) => c.customerid === appointment.customerid
          );

          // Format the starttime to include date and time in 12-hour format
          const formattedStartTime = new Date(appointment.starttime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return {
            ...appointment,
            phonenumber: customer?.phonenumber,
            email: customer?.email,
            formattedStartTime, // Add the formatted time
          };
        });

        // Calculate service distribution for the last 3 weeks
        const threeWeeksAgo = new Date();
        threeWeeksAgo.setDate(today.getDate() - 21);

        const serviceCounts = {};
        appointmentData
          .filter((appointment) => {
            const appointmentDate = new Date(appointment.starttime);
            return appointmentDate >= threeWeeksAgo && appointmentDate <= today;
          })
          .forEach((appointment) => {
            const serviceId = appointment.serviceid;
            serviceCounts[serviceId] = (serviceCounts[serviceId] || 0) + 1;
          });

        console.log("Service Counts:", serviceCounts);

        // Prepare chart data
        chartData.value.labels = serviceData.map((service) => service.name);
        chartData.value.datasets[0].data = serviceData.map(
          (service) => serviceCounts[service.serviceid] || 0
        );

        console.log("Chart Data:", chartData.value);

        // Count today's appointments
        todayAppointments.value = appointmentData.filter((appointment) => {
          const appointmentDate = new Date(appointment.starttime); // Replace with the actual date field
          return appointmentDate.toDateString() === today.toDateString();
        }).length;

        console.log("Today's Appointments:", todayAppointments.value);

        // Calculate today's earnings
        const todayEarnings = appointmentData
          .filter((appointment) => {
            const appointmentDate = new Date(appointment.starttime);
            return (
              appointmentDate.toDateString() === today.toDateString() &&
              appointment.status === "Completed" // Only include completed appointments
            );
          })
          .reduce((total, appointment) => {
            const service = serviceData.find(
              (service) => service.serviceid === appointment.serviceid
            );
            return total + Number(service?.price || 0); // Ensure price is treated as a number
          }, 0);

        totalEarnings.value = todayEarnings;

        // Prepare bar chart data
        barChartData.value.labels = serviceData.map((service) => service.name);
        barChartData.value.datasets[0].data = serviceData.map((service) => {
          return appointmentData
            .filter((appointment) => {
              const appointmentDate = new Date(appointment.starttime);
              return (
                appointmentDate.toDateString() === today.toDateString() &&
                appointment.serviceid === service.serviceid &&
                appointment.status === "Completed" // Only include completed appointments
              );
            })
            .reduce((total, appointment) => total + (service.price || 0), 0);
        });

        console.log("Bar Chart Data:", barChartData.value);
      } catch (error) {
        console.error("Error fetching appointments or services:", error);
      }
    };

    const exportAllAppointmentsToExcel = async () => {
      try {
        // Fetch all appointments, services, and customers
        const allAppointments = await getAllAppointments();
        const allServices = await getAllServices();
        const allCustomers = await getAllCustomers();

        if (!allAppointments.length) {
          alert("No appointment data to export.");
          return;
        }

        // Merge customer data into appointments
        const mergedAppointments = allAppointments.map((appointment) => {
          const customer = allCustomers.find(
            (c) => c.customerid === appointment.customerid
          );
          const service = allServices.find(
            (s) => s.serviceid === appointment.serviceid
          );
          return {
            ...appointment,
            phonenumber: customer?.phonenumber || "N/A",
            email: customer?.email || "N/A",
            serviceAmount: service?.price || "N/A",
          };
        });

        // Calculate total earnings
        const totalEarnings = mergedAppointments.reduce((total, appointment) => {
          return total + Number(appointment.serviceAmount || 0);
        }, 0);

        // Prepare data for Excel
        const worksheetData = mergedAppointments.map((appointment) => ({
          "Last Name": appointment.CustomerLast,
          "First Name": appointment.CustomerFirst,
          "Phone Number": appointment.phonenumber,
          "Email": appointment.email,
          "Start Time": new Date(appointment.starttime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          "End Time": new Date(appointment.endtime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          Service: appointment.Service || "N/A",
          "Service Amount": `$${appointment.serviceAmount}`
        }));

        // Add summary row for total appointments and earnings
        worksheetData.push({});
        worksheetData.push({
          "Last Name": "Summary",
          "First Name": "",
          "Phone Number": `Total Appointments: ${mergedAppointments.length}`,
          Email: "",
          "Start Time": `Total Earnings: $${totalEarnings}`,
          "End Time": "",
          Service: "",
          "Service Amount": ""
        });

        // Create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(worksheetData);

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "All Appointments");

        // Export the workbook to an Excel file
        XLSX.writeFile(workbook, "All_Appointments.xlsx");
      } catch (error) {
        console.error("Error exporting all appointments:", error);
        alert("Failed to export appointments. Please try again.");
      }
    };

    const exportTodaysAppointmentsToExcel = async () => {
      try {
        const allAppointments = await getAllAppointments();
        const allServices = await getAllServices();
        const allCustomers = await getAllCustomers();

        const today = new Date();
        const todaysAppointments = allAppointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.starttime);
          return appointmentDate.toDateString() === today.toDateString();
        });

        if (!todaysAppointments.length) {
          alert("No appointments for today to export.");
          return;
        }

        const mergedAppointments = todaysAppointments.map((appointment) => {
          const customer = allCustomers.find(
            (c) => c.customerid === appointment.customerid
          );
          const service = allServices.find(
            (s) => s.serviceid === appointment.serviceid
          );
          return {
            ...appointment,
            phonenumber: customer?.phonenumber || "N/A",
            email: customer?.email || "N/A",
            serviceAmount: service?.price || "N/A",
          };
        });

         // Calculate total earnings
         const totalEarnings = mergedAppointments.reduce((total, appointment) => {
          return total + Number(appointment.serviceAmount || 0);
        }, 0);

        const worksheetData = mergedAppointments.map((appointment) => ({
          "Last Name": appointment.CustomerLast,
          "First Name": appointment.CustomerFirst,
          "Phone Number": appointment.phonenumber,
          Email: appointment.email,
          "Start Time": new Date(appointment.starttime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          "End Time": new Date(appointment.endtime).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          Service: appointment.Service || "N/A",
          "Service Amount": `$${appointment.serviceAmount}`,
        }));

        // Add summary row for total appointments and earnings
        worksheetData.push({});
        worksheetData.push({
          "Last Name": "Summary",
          "First Name": "",
          "Phone Number": `Total Appointments: ${mergedAppointments.length}`,
          Email: "",
          "Start Time": `Total Earnings: $${totalEarnings}`,
          "End Time": "",
          Service: "",
          "Service Amount": ""
        });

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Today's Appointments");

        XLSX.writeFile(workbook, "Todays_Appointments.xlsx");
      } catch (error) {
        console.error("Error exporting today's appointments:", error);
        alert("Failed to export today's appointments. Please try again.");
      }
    };

    // Fetch data when the component is mounted
    onMounted(fetchAppointmentsAndServices);

    return {
      appointments,
      chartData,
      barChartData,
      todayAppointments,
      totalEarnings,
      exportAllAppointmentsToExcel,
      exportTodaysAppointmentsToExcel,

    };
  },
};
</script>

<style>
.card {
  width: 300px; /* Set the width of the card */
  text-align: center; /* Center align the content */
  background-color: #ffffff; /* White background for the card */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for the card */
}

.mt-8.flex {
  gap: 2rem; /* Adjust the spacing between the cards */
}

.overflow-x-auto {
  margin-top: 2rem; /* Add spacing above the table */
}

.appointments-container {
  max-height: 300px; /* Set a fixed height for the table container */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #e5e7eb; /* Add a border for better visibility */
  background-color: #ffffff; /* Ensure the background is white */
}
</style>