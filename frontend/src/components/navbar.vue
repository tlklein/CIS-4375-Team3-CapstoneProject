<template>
    <header class="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-opacity-50 bg-[#111827] z-20">
        <div class="text-white text-3xl font-bold">
            <img src="@/assets/barberlogo.png" alt="Logo" class="h-20">
        </div>
        <!-- Mobile Toggle Button -->
        <div class="md:hidden z-30">
            <button type="button" 
            class="block focus:outline-none"
            @click="isMenuOpen = !isMenuOpen"
            >
                <span v-if="isMenuOpen" class="text-5xl">
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/delete-sign.png" alt="close" width="50" height="50">
                </span>
                <span v-else class="text-5xl">
                    <img src="https://img.icons8.com/ios-filled/100/ffffff/menu--v6.png" alt="menu" width="50" height="50">
                </span>
            </button>
        </div>
        <!-- Navbar Link -->
        <nav
        :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-[#111827] md:relative md:bg-transparent md:flex md:justify-between md:flex-row',
            isMenuOpen ? 'block':'hidden'
        ]"
        >
            <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                <li v-for="item in Menu" :key="item.name">
                    <!-- Use router-link for internal routes -->
                    <router-link 
                        v-if="item.href.startsWith('/')"
                        :to="item.href" 
                        class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg no-underline"
                        @click="isMenuOpen = false"
                    >
                        {{ item.name }}
                    </router-link>
                    <!-- Use anchor tag for hash links -->
                    <a 
                        v-else-if="item.name === 'Portal'" 
                        href="#"
                        class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg no-underline"
                        @click.prevent="isLoginModalOpen = true"
                    >
                        {{ item.name }}
                    </a>
                    <a 
                        v-else
                        :href="item.href" 
                        class="block text-white transition hover:text-primary ease-linear text-2xl md:text-lg no-underline"
                        @click="scrollToSection(item.href)"
                    >
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    <!-- Login Modal -->
    <div 
        v-if="isLoginModalOpen" 
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
        <div class="bg-white p-6 rounded shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="loginForm.email" 
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="loginForm.password" 
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div class="flex justify-end space-x-4">
                    <button 
                        type="button" 
                        @click="isLoginModalOpen = false" 
                        class="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        class="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p v-if="loginError" class="text-red-500 mt-4">{{ loginError }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification'; // Import the toast function
import { loginUser } from '@/api/api'; // Import the login API function

const toast = useToast(); // Initialize the toast function

const Menu = ref([
    { name: 'Home', href: '' },
    { name: 'Services', href: '#services' },
    { name: 'Location', href: '#location' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Appointment', href: '#appointment' },
    { name: 'Portal', href: '#' }, 
]);

const isMenuOpen = ref(false);
const isLoginModalOpen = ref(false); 
const loginForm = ref({ email: '', password: '' }); 
const loginError = ref(''); 

const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

const handleLogin = async () => {
    try {
        const response = await loginUser(loginForm.value); 
        console.log('Login successful:', response);
        isLoginModalOpen.value = false; 
        loginError.value = ''; 

        // Show success toast
        toast.success('Login successful! Redirecting...', {
            timeout: 3000,
        });

        // Redirect to the portal or handle login success
        window.location.href = '/home'; // Redirect to the portal
    } catch (error) {
        console.error('Login failed:', error);
        loginError.value = 'Invalid email or password. Please try again.';

        // Show error toast
        toast.error('Login failed. Please check your credentials.', {
            timeout: 3000,
        });
    }
};
</script>