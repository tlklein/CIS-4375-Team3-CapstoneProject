<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Services</h3>

    <!-- Filter Section -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="filterText"
        type="text"
        placeholder="Search by Service Name"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        @click="openCreatePopup"
        class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
      >
        Add New Service
      </button>
    </div>

    <div class="overflow-x-auto relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Description</th>
            <th scope="col" class="py-3 px-6">Price</th>
            <th scope="col" class="py-3 px-6">Duration</th>
            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="service in filteredServices"
            :key="service.serviceid"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ service.name }}
            </td>
            <td class="py-4 px-6">{{ service.description }}</td>
            <td class="py-4 px-6">${{ service.price }}</td>
            <td class="py-4 px-6">{{ service.duration }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="openEditPopup(service)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit/Create Popup -->
    <div v-if="showPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Service' : 'Add New Service' }}</h3>
        <form @submit.prevent="isEditing ? updateServiceDetails() : createServiceDetails()">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="selectedService.name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              v-model="selectedService.description"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              v-model="selectedService.price"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              id="duration"
              v-model="selectedService.duration"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-between">
            <button
              v-if="isEditing"
              type="button"
              @click="deleteServiceDetails"
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
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "@/api/api";

export default {
  setup() {
    const services = ref([]); // List of services fetched from the database
    const filterText = ref(""); // Filter text input
    const showPopup = ref(false); // Controls the visibility of the popup
    const selectedService = ref({
      name: "",
      description: "",
      price: "",
      duration: "",
    }); // The service being edited or created
    const isEditing = ref(false); // Determines if the popup is for editing or creating

    // Computed property to filter services by name
    const filteredServices = computed(() => {
      if (!filterText.value) return services.value;
      return services.value.filter((service) =>
        service.name.toLowerCase().includes(filterText.value.toLowerCase())
      );
    });

    // Fetch all services from the database
    const fetchServices = async () => {
      try {
        const response = await getAllServices(); // Fetch services from the API
        services.value = Array.isArray(response) ? response : []; // Ensure services is an array
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    // Open the create popup
    const openCreatePopup = () => {
      selectedService.value = {
        name: "",
        description: "",
        price: "",
        duration: "",
      };
      isEditing.value = false;
      showPopup.value = true;
    };

    // Open the edit popup
    const openEditPopup = (service) => {
      selectedService.value = { ...service }; // Clone the service object
      isEditing.value = true;
      showPopup.value = true;
    };

    // Close the popup
    const closePopup = () => {
      showPopup.value = false;
      selectedService.value = {
        name: "",
        description: "",
        price: "",
        duration: "",
      };
    };

    // Create a new service
    const createServiceDetails = async () => {
      try {
        await createService(selectedService.value);
        closePopup();
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error("Error creating service:", error);
      }
    };

    // Update service details
    const updateServiceDetails = async () => {
      try {
        await updateService(selectedService.value.serviceid, selectedService.value);
        closePopup();
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error("Error updating service:", error);
      }
    };

    // Delete service
    const deleteServiceDetails = async () => {
      try {
        await deleteService(selectedService.value.serviceid);
        closePopup();
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    };

    // Fetch services when the component is mounted
    onMounted(fetchServices);

    return {
      services,
      filterText,
      filteredServices,
      showPopup,
      selectedService,
      isEditing,
      fetchServices,
      openCreatePopup,
      openEditPopup,
      closePopup,
      createServiceDetails,
      updateServiceDetails,
      deleteServiceDetails,
    };
  },
};
</script>

<style>
/* Add any custom styles for the popup or table here */
</style>