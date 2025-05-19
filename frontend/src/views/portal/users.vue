<template>
  <div>
    <h3 class="text-2xl font-bold text-left py-2">Users</h3>

    <!-- Filter Section -->
    <div class="flex justify-between items-center mb-4">
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
        Add New User
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
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('email')">
              Email
              <span v-if="sortKey === 'email'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6">Password</th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('phonenumber')">
              Phone
              <span v-if="sortKey === 'phonenumber'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6 cursor-pointer" @click="sortBy('role')">
              Role
              <span v-if="sortKey === 'role'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th scope="col" class="py-3 px-6"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.userid"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ user.firstname }}
            </td>
            <td class="py-4 px-6">{{ user.lastname }}</td>
            <td class="py-4 px-6">{{ user.email }}</td>
            <td class="py-4 px-6">***********</td>
            <td class="py-4 px-6">{{ user.phonenumber }}</td>
            <td class="py-4 px-6">{{ user.role }}</td>
            <td class="py-4 px-6 text-right">
              <button
                @click="openEditPopup(user)"
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
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
        <form @submit.prevent="isEditing ? updateUserDetails() : createUserDetails()">
          <div class="mb-4">
            <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              v-model="selectedUser.firstname"
              placeholder="First name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              v-model="selectedUser.lastname"
              placeholder="Last name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="selectedUser.email"
              placeholder="Email"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="selectedUser.password"
              :placeholder="isEditing ? 'Leave blank to keep current password' : 'Enter password'"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="phonenumber" class="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phonenumber"
              v-model="selectedUser.phonenumber"
              placeholder="Phone Number (e.g., 1234567890)"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              id="role"
              v-model="selectedUser.role"
              placeholder="Role (e.g., Admin, Barber)"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div class="flex justify-between">
            <button
              v-if="isEditing"
              type="button"
              @click="deleteUserDetails"
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
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/api";

export default {
  setup() {
    const users = ref([]);
    const filterText = ref("");
    const showPopup = ref(false);
    const selectedUser = ref({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phonenumber: "",
      role: "",
    });
    const isEditing = ref(false);

    const sortKey = ref("");
    const sortDirection = ref("asc");

    const sortBy = (key) => {
      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortDirection.value = "asc";
      }
    };

    const sortedUsers = computed(() => {
      const sorted = [...users.value];
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

    const filteredUsers = computed(() => {
      let filtered = sortedUsers.value;
      if (filterText.value) {
        filtered = filtered.filter((user) =>
          `${user.firstname} ${user.lastname}`
            .toLowerCase()
            .includes(filterText.value.toLowerCase())
        );
      }
      return filtered;
    });

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        users.value = Array.isArray(response) ? response : [];
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const openCreatePopup = () => {
      selectedUser.value = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phonenumber: "",
        role: "",
      };
      isEditing.value = false;
      showPopup.value = true;
    };

    const openEditPopup = (user) => {
      selectedUser.value = { ...user, password: "" };
      isEditing.value = true;
      showPopup.value = true;
    };

    const closePopup = () => {
      showPopup.value = false;
      selectedUser.value = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phonenumber: "",
        role: "",
      };
    };

    const createUserDetails = async () => {
      try {
        await createUser(selectedUser.value);
        closePopup();
        fetchUsers();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    const updateUserDetails = async () => {
      try {
        const userData = { ...selectedUser.value };
        if (!userData.password) delete userData.password;
        await updateUser(selectedUser.value.userid, userData);
        closePopup();
        fetchUsers();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    const deleteUserDetails = async () => {
      try {
        await deleteUser(selectedUser.value.userid);
        closePopup();
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    onMounted(fetchUsers);

    return {
      users,
      filterText,
      filteredUsers,
      showPopup,
      selectedUser,
      isEditing,
      sortKey,
      sortDirection,
      sortBy,
      fetchUsers,
      openCreatePopup,
      openEditPopup,
      closePopup,
      createUserDetails,
      updateUserDetails,
      deleteUserDetails,
    };
  },
};
</script>

<style>
/* Add any custom styles for the popup or table here */
</style>