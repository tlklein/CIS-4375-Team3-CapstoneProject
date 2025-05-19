<template>
    <section class="bg-gray-900 text-white py-12" id="gallery">
        <div class="container mx-auto px-6 lg:px-12">
            <h2 
                class="text-4xl font-bold text-center mb-8" 
                data-aos="fade-up"
            >
                Gallery
            </h2>
            <p 
                class="text-center text-gray-400 mb-12" 
                data-aos="fade-up" 
                data-aos-delay="200"
            >
                Explore our collection of premium haircuts and grooming styles.
            </p>
            <div 
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
                data-aos="fade-up" 
                data-aos-delay="400"
            >
                <div 
                    v-for="image in images" 
                    :key="image.id" 
                    class="relative group" 
                    data-aos="zoom-in" 
                    data-aos-delay="600"
                >
                    <img 
                        :src="image.src" 
                        :alt="image.alt" 
                        class="w-full h-64 object-cover rounded-lg shadow-lg"
                    >
                    <div 
                        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg"
                    >
                        <p class="text-white font-bold text-lg">{{ image.alt }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = ref([
    { id: 1, src: 'src/assets/photo1.jpg', alt: 'Classic Haircut' },
    { id: 2, src: 'src/assets/photo2.jpg', alt: 'Brow Trim' },
    { id: 3, src: 'src/assets/photo3.jpg', alt: 'Fade' },
    { id: 4, src: 'src/assets/photo4.jpg', alt: 'Fade' },
    { id: 5, src: 'src/assets/photo5.jpg', alt: 'Fade' },
    { id: 6, src: 'src/assets/photo6.jpg', alt: 'Fade' },
]);

// Initialize AOS
onMounted(() => {
    AOS.init();
});
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}

.group img {
    transition: transform 0.3s ease-in-out;
}

.group:hover img {
    transform: scale(1.05); /* Slight zoom effect on hover */
}

/* Responsive Image Styling */
img {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>