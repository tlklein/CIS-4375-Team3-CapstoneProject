<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Barbers</h3>

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
        Add New Barber
      </button>
    </div>

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
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('bio')">
              Bio
              <span v-if="sortKey === 'bio'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="barber in filteredBarbers"
            :key="barber.barberid"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ barber.firstname }}
            </td>
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ barber.lastname }}
            </td>
            <td class="py-4 px-6">{{ barber.bio }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="openEditPopup(barber)"
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
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit Barber' : 'Add New Barber' }}</h3>
        <form @submit.prevent="isEditing ? updateBarberDetails() : createBarberDetails()">
          <div v-if="!isEditing" class="mb-4">
            <label for="userid" class="block text-sm font-medium text-gray-700">Select User</label>
            <select
              id="userid"
              v-model="selectedBarber.userid"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="user in users" :key="user.userid" :value="user.userid">
                {{ user.firstname }} {{ user.lastname }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <input
              type="text"
              id="bio"
              v-model="selectedBarber.bio"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-between">
            <button
              v-if="isEditing"
              type="button"
              @click="deleteBarberDetails"
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
  getAllBarbers,
  createBarber,
  updateBarber,
  deleteBarber,
  getAllUsers,
} from "@/api/api";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const barbers = ref([]);
    const users = ref([]);
    const showPopup = ref(false);
    const selectedBarber = ref({
      userid: "",
      bio: "",
    });
    const isEditing = ref(false);
    const toast = useToast();

    const filterText = ref(""); // Filter text input
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

    const sortedBarbers = computed(() => {
      const sorted = [...barbers.value];
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

    const filteredBarbers = computed(() => {
      let filtered = sortedBarbers.value;
      if (filterText.value) {
        filtered = filtered.filter((barber) =>
          `${barber.firstname} ${barber.lastname}`
            .toLowerCase()
            .includes(filterText.value.toLowerCase())
        );
      }
      return filtered;
    });

    const fetchBarbers = async () => {
      try {
        const response = await getAllBarbers();
        barbers.value = Array.isArray(response) ? response : [];
      } catch (error) {
        console.error("Error fetching barbers:", error);
        toast.error("Failed to fetch barbers.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        users.value = Array.isArray(response) ? response : [];
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    const openCreatePopup = () => {
      selectedBarber.value = {
        userid: "",
        bio: "",
      };
      isEditing.value = false;
      showPopup.value = true;
    };

    const openEditPopup = (barber) => {
      selectedBarber.value = { ...barber };
      isEditing.value = true;
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
      selectedBarber.value = {
        userid: "",
        bio: "",
      };
    };

    const createBarberDetails = async () => {
      try {
        await createBarber(selectedBarber.value);
        closePopup();
        fetchBarbers();
        toast.success("Barber created successfully!");
      } catch (error) {
        console.error("Error creating barber:", error);
        toast.error("Failed to create barber.");
      }
    };

    const updateBarberDetails = async () => {
      try {
        await updateBarber(selectedBarber.value.barberid, {
          bio: selectedBarber.value.bio,
        });
        closePopup();
        fetchBarbers();
        toast.success("Barber updated successfully!");
      } catch (error) {
        console.error("Error updating barber:", error);
        toast.error("Failed to update barber.");
      }
    };

    const deleteBarberDetails = async () => {
      try {
        await deleteBarber(selectedBarber.value.barberid);
        closePopup();
        fetchBarbers();
        toast.success("Barber deleted successfully!");
      } catch (error) {
        console.error("Error deleting barber:", error);
        toast.error("Failed to delete barber.");
      }
    };

    onMounted(() => {
      fetchBarbers();
      fetchUsers();
    });

    return {
      barbers,
      users,
      showPopup,
      selectedBarber,
      isEditing,
      filterText,
      sortKey,
      sortDirection,
      filteredBarbers,
      sortBy,
      fetchBarbers,
      fetchUsers,
      openCreatePopup,
      openEditPopup,
      closePopup,
      createBarberDetails,
      updateBarberDetails,
      deleteBarberDetails,
    };
  },
};
</script>