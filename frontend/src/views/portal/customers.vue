<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Customers</h3>
    <div class="flex justify-between items-center mb-4">
      <!-- Filter Input -->
      <input
        v-model="filterText"
        type="text"
        placeholder="Search by Name"
        class="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        @click="openCreatePopup"
        class="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900"
      >
        Add New Customer
      </button>
    </div>
    <div class="overflow-x-auto relative sm:rounded-lg customers-container">
    <div class="overflow-x-auto relative sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('firstname')">
              First Name
              <span v-if="sortKey === 'firstname'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('lastname')">
              Last Name
              <span v-if="sortKey === 'lastname'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('phonenumber')">
              Phone Number
              <span v-if="sortKey === 'phonenumber'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('email')">
              Email
              <span v-if="sortKey === 'email'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in filteredCustomers"
            :key="customer.customerid"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ customer.firstname }}
            </td>
            <td class="py-4 px-6">{{ customer.lastname }}</td>
            <td class="py-4 px-6">{{ customer.phonenumber }}</td>
            <td class="py-4 px-6">{{ customer.email }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="openEditPopup(customer)"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

    <!-- Edit/Create Popup -->
    <div v-if="showPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Customer' : 'Add New Customer' }}</h3>
        <form @submit.prevent="isEditing ? updateCustomerDetails() : createCustomerDetails()">
          <div class="mb-4">
            <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              v-model="selectedCustomer.firstname"
              placeholder="Enter first name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              v-model="selectedCustomer.lastname"
              placeholder="Enter last name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="phonenumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phonenumber"
              v-model="selectedCustomer.phonenumber"
              placeholder="Enter phone number"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="selectedCustomer.email"
              placeholder="Enter email"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-between">
            <button
              v-if="isEditing"
              type="button"
              @click="deleteCustomerDetails"
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

    <!-- Error Popup -->
    <div v-if="showErrorPopup" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 class="text-xl font-bold mb-4 text-red-600">Error</h3>
        <p class="text-gray-700 mb-4">Unable to delete customer. Must delete associated appointment.</p>
        <button
          @click="closeErrorPopup"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/api/api";

export default {
  setup() {
    const customers = ref([]);
    const filterText = ref(""); // Filter text input
    const showPopup = ref(false);
    const showErrorPopup = ref(false); // Controls the visibility of the error popup
    const selectedCustomer = ref({
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
    });
    const isEditing = ref(false);

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

    const sortedCustomers = computed(() => {
      const sorted = [...customers.value];
      if (sortKey.value) {
        sorted.sort((a, b) => {
          let valA = a[sortKey.value]?.toLowerCase() || "";
          let valB = b[sortKey.value]?.toLowerCase() || "";
          if (valA < valB) return sortDirection.value === "asc" ? -1 : 1;
          if (valA > valB) return sortDirection.value === "asc" ? 1 : -1;
          return 0;
        });
      }
      return sorted;
    });

    const filteredCustomers = computed(() => {
      let filtered = sortedCustomers.value;
      if (filterText.value) {
        filtered = filtered.filter((customer) =>
          `${customer.firstname} ${customer.lastname}`
            .toLowerCase()
            .includes(filterText.value.toLowerCase())
        );
      }
      return filtered;
    });

    const fetchCustomers = async () => {
      try {
        const response = await getAllCustomers();
        customers.value = Array.isArray(response) ? response : [];
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const openCreatePopup = () => {
      selectedCustomer.value = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
      };
      isEditing.value = false;
      showPopup.value = true;
    };

    const openEditPopup = (customer) => {
      selectedCustomer.value = { ...customer };
      isEditing.value = true;
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
      selectedCustomer.value = {
        firstname: "",
        lastname: "",
        phonenumber: "",
        email: "",
      };
    };

    const closeErrorPopup = () => {
      showErrorPopup.value = false;
    };

    const createCustomerDetails = async () => {
      try {
        await createCustomer(selectedCustomer.value);
        closePopup();
        fetchCustomers();
      } catch (error) {
        console.error("Error creating customer:", error);
      }
    };

    const updateCustomerDetails = async () => {
      try {
        await updateCustomer(
          selectedCustomer.value.customerid,
          selectedCustomer.value
        );
        closePopup();
        fetchCustomers();
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    };

    const deleteCustomerDetails = async () => {
      try {
        await deleteCustomer(selectedCustomer.value.customerid);
        closePopup();
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
        showErrorPopup.value = true; // Show error popup on failure
      }
    };

    onMounted(fetchCustomers);

    return {
      customers,
      filterText,
      filteredCustomers,
      showPopup,
      showErrorPopup,
      selectedCustomer,
      isEditing,
      sortKey,
      sortDirection,
      sortBy,
      fetchCustomers,
      openCreatePopup,
      openEditPopup,
      closePopup,
      closeErrorPopup,
      createCustomerDetails,
      updateCustomerDetails,
      deleteCustomerDetails,
    };
  },
};
</script>
<style>
.customers-container {
  max-height: 700px; /* Set a fixed height for the table container */
  overflow-y: auto; /* Enable vertical scrolling */
  /* border: 1px solid #e5e7eb; Add a border for better visibility */
  background-color: #ffffff; /* Ensure the background is white */
}
</style>