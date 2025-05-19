<template>
    <section id='appointment' class="w-full max-w-screen-lg mx-auto mt-16 px-6 lg:px-12 py-12 bg-transparent rounded-xl shadow-md">
        <h1 
            class="text-4xl font-extrabold text-center text-gray-100 mb-10" 
            data-aos="fade-up"
        >
            BOOK NOW!
        </h1>
        <div class="flex flex-col md:flex-row gap-12">
            <!-- Contact Information -->
            <div 
                class="w-full md:w-1/2 text-gray-100" 
                data-aos="fade-right"
            >
                <h2 class="text-2xl font-bold mb-6">Contact Me</h2>
                <p class="text-lg font-semibold">Phone: 713-258-0191</p>
                <p class="text-lg font-semibold">
                    Email: <a href="mailto:c.zuniga85@yahoo.com" class="text-primary hover:underline">c.zuniga85@yahoo.com</a>
                </p>
            </div>
            <!-- Form -->
            <div 
                class="w-full md:w-1/2" 
                data-aos="fade-left"
            >
                <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- First Name -->
                    <div>
                        <label for="firstName" class="block text-gray-100 font-semibold mb-2">First Name</label>
                        <input
                            v-model="form.firstName"
                            type="text"
                            id="firstName"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="First name"
                            required
                        />
                    </div>
                    <!-- Last Name -->
                    <div>
                        <label for="lastName" class="block text-gray-100 font-semibold mb-2">Last Name</label>
                        <input
                            v-model="form.lastName"
                            type="text"
                            id="lastName"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-gray-100 font-semibold mb-2">Email</label>
                        <input
                            v-model="form.email"
                            type="email"
                            id="email"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <!-- Phone Number -->
                    <div>
                        <label for="phone" class="block text-gray-100 font-semibold mb-2">Phone Number</label>
                        <input
                            v-model="form.phone"
                            type="tel"
                            id="phone"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <!-- Services -->
                    <div>
                        <label for="services" class="block text-gray-100 font-semibold mb-2">Select Service</label>
                        <select
                            v-model="form.serviceId"
                            id="services"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >
                            <option value="" disabled>Select a Service</option>
                            <option v-for="service in services" :key="service.serviceid" :value="service.serviceid">
                                {{ service.name }}
                            </option>
                        </select>
                    </div>
                    <!-- Barbers -->
                    <div>
                        <label for="barbers" class="block text-gray-100 font-semibold mb-2">Select Barber</label>
                        <select
                            v-model="form.barberId"
                            id="barbers"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >
                            <option value="" disabled>Select a Barber</option>
                            <option v-for="barber in barbers" :key="barber.barberid" :value="barber.barberid">
                                {{ barber.firstname }} {{ barber.lastname }}
                            </option>
                        </select>
                    </div>
                    <!-- Date -->
                    <div class="md:col-span-2">
                        <label for="date" class="block text-gray-100 font-semibold mb-2">Select Date</label>
                        <input
                            v-model="form.date"
                            type="date"
                            id="date"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            @change="updateAvailableTimes"
                            required
                        />
                    </div>
                    <!-- Time -->
                    <div class="md:col-span-2">
                        <label for="time" class="block text-gray-100 font-semibold mb-2">Select Time</label>
                        <select
                            v-model="form.time"
                            id="time"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        >
                            <option value="" disabled>Select a Time</option>
                            <option v-for="time in availableTimes" :key="time" :value="time">
                                {{ time }}
                            </option>
                        </select>
                    </div>
                    <!-- Submit Button -->
                    <div class="md:col-span-2 text-center">
                        <button
                            type="submit"
                            class="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-pink-500 transition ease-in-out duration-300 shadow-lg"
                        >
                            BOOK TODAY!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getAllServices, getAllBarbers, createCustomer, createAppointment } from '@/api/api';

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceId: '',
    barberId: '',
    date: '',
    time: '',
});

const services = reactive([]);
const barbers = reactive([]);
const availableTimes = reactive([]);

const fetchServices = async () => {
    try {
        const data = await getAllServices();
        services.push(...data);
    } catch (error) {
        console.error('Error fetching services:', error);
    }
};

const fetchBarbers = async () => {
    try {
        const data = await getAllBarbers();
        barbers.push(...data);
    } catch (error) {
        console.error('Error fetching barbers:', error);
    }
};

const updateAvailableTimes = () => {
    const day = new Date(form.date).getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const schedule = {
        0: { start: '09:00', end: '20:00' }, // Monday
        1: { start: '09:00', end: '20:00' }, // Tuesday
        2: { start: '09:00', end: '20:00' }, // Wednesday
        3: { start: '09:00', end: '20:00' }, // Thursday
        4: { start: '09:00', end: '21:00' }, // Friday
        5: { start: '08:00', end: '21:00' }, // Saturday
        6: null, // Sunday (Closed)
    };

    const selectedSchedule = schedule[day];
    availableTimes.splice(0, availableTimes.length); // Clear existing times

    if (selectedSchedule) {
        const startTime = selectedSchedule.start.split(':').map(Number);
        const endTime = selectedSchedule.end.split(':').map(Number);

        let currentHour = startTime[0];
        let currentMinute = startTime[1];

        while (
            currentHour < endTime[0] ||
            (currentHour === endTime[0] && currentMinute < endTime[1])
        ) {
            const formattedTime = formatTime(currentHour, currentMinute);
            availableTimes.push(formattedTime);

            // Increment by 30 minutes
            currentMinute += 30;
            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour += 1;
            }
        }
    } else {
        // Add placeholder for Sunday
        availableTimes.push('Closed');
    }
};

const formatTime = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const formattedMinute = minute.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${period}`;
};

const submitForm = async () => {
    try {
        // Create customer
        const customer = await createCustomer({
            firstname: form.firstName,
            lastname: form.lastName,
            email: form.email,
            phonenumber: form.phone,
        });

        // Book appointment
        await createAppointment({
            customerid: customer.customerid,
            barberid: form.barberId,
            serviceid: form.serviceId,
            starttime: `${form.date}T${convertTo24Hour(form.time)}`,
            endtime: `${form.date}T${calculateEndTime(form.time)}`,
            status: 'scheduled',
        });

        alert('Appointment booked successfully!');
        // Reset form
        Object.keys(form).forEach((key) => (form[key] = ''));
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
    }
};

const convertTo24Hour = (time) => {
    const [hour, minute, period] = time.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
    let hours = parseInt(hour, 10);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minute}:00`;
};

const calculateEndTime = (startTime) => {
    const [hour, minute, period] = startTime.match(/(\d+):(\d+)\s(AM|PM)/).slice(1);
    let hours = parseInt(hour, 10);
    let minutes = parseInt(minute, 10);

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    // Add 30 minutes
    minutes += 30;
    if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
};

// Initialize AOS and fetch data
onMounted(() => {
    AOS.init();
    fetchServices();
    fetchBarbers();
});
</script>

<style>
/* Add your custom styles here if needed */

select option {
    color: black; /* Ensure dropdown options are visible */
    background-color: white; /* Set a contrasting background for options */
}

select:focus {
    outline: none;
    border-color: #ff007f; /* Add focus ring color (optional) */
    box-shadow: 0 0 0 2px rgba(255, 0, 127, 0.5); /* Optional focus effect */
}

/* Change calendar icon color */
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1); /* Inverts the color to white */
    cursor: pointer; /* Ensures the cursor changes to pointer */
}
</style>