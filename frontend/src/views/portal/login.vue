<template>
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/api/api";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const loginData = { email: email.value, password: password.value };
        const response = await loginUser(loginData);

        // Save the token to localStorage
        localStorage.setItem("token", response.token);

        // Check user role and redirect accordingly
        if (response.role === "admin") {
          alert("Welcome, Admin!");
          router.push("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          alert("Welcome, User!");
          router.push("/user-dashboard"); // Redirect to user dashboard
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid email or password.");
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>

<style>
/* Add any additional styles here if needed */
</style>