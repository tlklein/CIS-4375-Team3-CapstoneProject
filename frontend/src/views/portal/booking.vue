<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Appointments</h3>
    
    <!-- Filter Tabs -->
    <div class="flex space-x-4 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.label"
        @click="activeTab = tab.label"
        :class="[
          'px-4 py-2 rounded-md',
          activeTab === tab.label ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700'
        ]"
      >
        {{ tab.label }} ({{ tab.count }})
      </button>
    </div>

    <!-- Filter Section -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-2">
        <input
          v-model="filterText"
          type="text"
          placeholder="Search by Name"
          class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        @click="openCreatePopup"
        class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
      >
        Add New Appointment
      </button>
    </div>
    <div class="overflow-x-auto relative sm:rounded-lg booking-container">
      <!-- Appointments Table -->
    <div class="overflow-x-auto relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('Customer')">
              Customer Name
              <span v-if="sortKey === 'Customer'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('Barber')">
              Barber
              <span v-if="sortKey === 'Barber'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('Service')">
              Service
              <span v-if="sortKey === 'Service'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('StartTime')">
              Start Time
              <span v-if="sortKey === 'StartTime'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('EndTime')">
              End Time
              <span v-if="sortKey === 'EndTime'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('Status')">
              Status
              <span v-if="sortKey === 'Status'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="appointment in filteredAppointments"
            :key="appointment.appointmentid"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ appointment.CustomerFirst }} 
              {{ appointment.CustomerLast }}
            </td>
            <td class="py-4 px-6">{{ appointment.BarberFirst }} {{ appointment.BarberLast }} </td>
            <td class="py-4 px-6">{{ appointment.Service }}</td>
            <td class="py-4 px-6">{{ formatDateTime(appointment.starttime) }}</td>
            <td class="py-4 px-6">{{ formatDateTime(appointment.endtime) }}</td>
            <td class="py-4 px-6">{{ appointment.status }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="openEditPopup(appointment)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Popup -->
    <div v-if="showPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Appointment' : 'Add New Appointment' }}</h3>
        <form @submit.prevent="isEditing ? updateAppointmentDetails() : createAppointmentDetails()">
          <div class="mb-4">
            <label for="customer" class="block text-sm font-medium text-gray-700">Customer</label>
            <select
              id="customer"
              v-model="selectedAppointment.customerid"
              :disabled="isEditing"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="customer in customers" :key="customer.customerid" :value="customer.customerid">
                {{ customer.firstname }} {{ customer.lastname }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="barber" class="block text-sm font-medium text-gray-700">Barber</label>
            <select
              id="barber"
              v-model="selectedAppointment.barberid"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="barber in barbers" :key="barber.barberid" :value="barber.barberid">
                {{ barber.firstname }} {{ barber.lastname }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="service" class="block text-sm font-medium text-gray-700">Service</label>
            <select
              id="service"
              v-model="selectedAppointment.serviceid"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="service in services" :key="service.serviceid" :value="service.serviceid">
                {{ service.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="starttime" class="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              id="starttime"
              v-model="selectedAppointment.starttime"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="endtime" class="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="datetime-local"
              id="endtime"
              v-model="selectedAppointment.endtime"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              v-model="selectedAppointment.status"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          <div class="flex justify-between">
            <button
              v-if="isEditing"
              type="button"
              @click="deleteAppointmentDetails"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
        <button
          @click="closePopup"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllCustomers,
  getAllBarbers,
  getAllServices,
} from "@/api/api";

export default {
  setup() {
    const appointments = ref([]);
    const customers = ref([]);
    const barbers = ref([]);
    const services = ref([]);
    const showPopup = ref(false);
    const isEditing = ref(false);
    const selectedAppointment = ref({
      appointmentid: "",
      customerid: "",
      barberid: "",
      serviceid: "",
      starttime: "",
      endtime: "",
      status: "scheduled",
    });

    const filterText = ref(""); // Filter text input
    const activeTab = ref("All");
    const sortKey = ref(""); // Current column being sorted
    const sortDirection = ref("asc"); // Sorting direction: 'asc' or 'desc'

    const sortBy = (key) => {
      if (sortKey.value === key) {
        // Toggle sort direction if the same column is clicked
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      } else {
        // Set new sort key and default to ascending order
        sortKey.value = key;
        sortDirection.value = "asc";
      }
    };

    const sortedAppointments = computed(() => {
      const sorted = [...appointments.value];
      if (sortKey.value) {
        sorted.sort((a, b) => {
          let valA, valB;
          switch (sortKey.value) {
            case "Customer":
              valA = `${a.CustomerFirst} ${a.CustomerLast}`.toLowerCase();
              valB = `${b.CustomerFirst} ${b.CustomerLast}`.toLowerCase();
              break;
            case "Barber":
              valA = `${a.BarberFirst} ${a.BarberLast}`.toLowerCase();
              valB = `${b.BarberFirst} ${b.BarberLast}`.toLowerCase();
              break;
            case "Service":
              valA = a.Service.toLowerCase();
              valB = b.Service.toLowerCase();
              break;
            case "StartTime":
              valA = new Date(a.starttime);
              valB = new Date(b.starttime);
              break;
            case "EndTime":
              valA = new Date(a.endtime);
              valB = new Date(b.endtime);
              break;
            case "Status":
              valA = a.status.toLowerCase();
              valB = b.status.toLowerCase();
              break;
            default:
              return 0;
          }
          if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;
          if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;
          return 0;
        });
      }
      return sorted;
    });

    const filteredAppointments = computed(() => {
      let filtered = sortedAppointments.value;

      if (activeTab.value === "Completed") {
        filtered = filtered.filter((appointment) => appointment.status === "Completed");
      } else if (activeTab.value === "Scheduled") {
        filtered = filtered.filter((appointment) => appointment.status === "Scheduled");
      } else if (activeTab.value === "Canceled") {
        filtered = filtered.filter((appointment) => appointment.status === "Canceled");
      }

      if (filterText.value) {
        filtered = filtered.filter((appointment) =>
          `${appointment.CustomerFirst} ${appointment.CustomerLast}`
            .toLowerCase()
            .includes(filterText.value.toLowerCase())
        );
      }

      return filtered;
    });

    const tabs = computed(() => [
      { label: "All", count: appointments.value.length },
      { label: "Completed", count: appointments.value.filter((a) => a.status === "Completed").length },
      { label: "Scheduled", count: appointments.value.filter((a) => a.status === "Scheduled").length },
      { label: "Canceled", count: appointments.value.filter((a) => a.status === "Canceled").length },
    ]);

    const fetchAppointments = async () => {
      try {
        appointments.value = await getAllAppointments();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        customers.value = await getAllCustomers();
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchBarbers = async () => {
      try {
        barbers.value = await getAllBarbers();
      } catch (error) {
        console.error("Error fetching barbers:", error);
      }
    };

    const fetchServices = async () => {
      try {
        services.value = await getAllServices();
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const openCreatePopup = () => {
      selectedAppointment.value = {
        appointmentid: "",
        customerid: "",
        barberid: "",
        serviceid: "",
        starttime: "",
        endtime: "",
        status: "scheduled",
      };
      isEditing.value = false;
      showPopup.value = true;
    };

    const openEditPopup = (appointment) => {
      const formatToDateTimeLocal = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };

      selectedAppointment.value = {
        appointmentid: appointment.appointmentid,
        customerid: appointment.customerid,
        barberid: appointment.barberid,
        serviceid: appointment.serviceid,
        starttime: formatToDateTimeLocal(appointment.starttime),
        endtime: formatToDateTimeLocal(appointment.endtime),
        status: appointment.status,
      };

      isEditing.value = true;
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
    };

    const createAppointmentDetails = async () => {
      try {
        await createAppointment(selectedAppointment.value);
        closePopup();
        fetchAppointments();
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
    };

    const updateAppointmentDetails = async () => {
      try {
        await updateAppointment(
          selectedAppointment.value.appointmentid,
          {
            customerid: selectedAppointment.value.customerid,
            barberid: selectedAppointment.value.barberid,
            serviceid: selectedAppointment.value.serviceid,
            starttime: selectedAppointment.value.starttime,
            endtime: selectedAppointment.value.endtime,
            status: selectedAppointment.value.status,
          }
        );
        closePopup();
        fetchAppointments();
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    };

    const deleteAppointmentDetails = async () => {
      try {
        await deleteAppointment(selectedAppointment.value.appointmentid);
        closePopup();
        fetchAppointments();
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    };

    const formatDateTime = (dateTime) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateTime).toLocaleDateString(undefined, options);
    };

    onMounted(() => {
      fetchAppointments();
      fetchCustomers();
      fetchBarbers();
      fetchServices();
    });

    return {
      appointments,
      customers,
      barbers,
      services,
      showPopup,
      isEditing,
      selectedAppointment,
      filteredAppointments,
      filterText,
      activeTab,
      tabs,
      sortKey,
      sortDirection,
      sortBy,
      openCreatePopup,
      openEditPopup,
      closePopup,
      createAppointmentDetails,
      updateAppointmentDetails,
      deleteAppointmentDetails,
      formatDateTime,
    };
  },
};
</script>

<style>
.booking-container {
  max-height: 640px; /* Set a fixed height for the table container */
  overflow-y: auto; /* Enable vertical scrolling */
  /* border: 1px solid #e5e7eb; Add a border for better visibility */
  background-color: #ffffff; /* Ensure the background is white */
}
</style>