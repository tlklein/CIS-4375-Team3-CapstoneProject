<template >
    <section class="text-white mt-18 flex justify-center items-center min-h-screen" id="services">
        <div class="flex flex-col items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 z-1">
            <h2 class="text-4xl font-bold text-white text-center mb-8">Services</h2>
            <div class="py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3">
                <div v-for="service in services" :key="service.id" data-aos="fade-up"
                class="px-8 py-12 rounded-xl bg-[#111a3e] shadow-lg flex flex-col items-center"
                >
                    <div class="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                        <div>
                            <img :src="service.icon" alt="service icon">
                        </div>
                    </div>
                    <div class="text-center">
                        <h3 class="pt-8 text-lg font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary lg:text-xl">
                            {{ service.name }}
                        </h3>
                        <p class="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                            {{ service.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import {ref} from 'vue';
const services =ref([
    {
        id:1,
        icon:'https://img.icons8.com/?size=100&id=10367&format=png&color=FFFFFF',
        name:'CLASSIC HAIRCUT',
        description:'Our Classic Haircut is a timeless choice that never goes out of style! Whether you prefer a clean & sharp look or a relaxed & natural finish, our expert barbers tailor each cut to suit your unique style and preferences. Using a mix of traditional techniques and modern precision, we ensure a flawless finish that enhances your features and is perfect for any occasion. The Classic Haircut is a sophisticated look that’s both versatile and easy to maintain!'
    },
    {
        id:2,
        icon:'https://img.icons8.com/?size=100&id=Y5yb4j6UVYZz&format=png&color=FFFFFF',
        name:'SHAVE',
        description:'A well-groomed beard is the ultimate statement of style and sophistication. At Zuniga Barbershop, our expert barbers specialize in shaping and trimming your beard to perfection. Whether you’re looking for a clean & sharp outline or a fuller & more natural look, we tailor each service to enhance your beard’s unique shape and texture. Using top-quality tools and products, we ensure your beard is not only perfectly groomed, but also nourished & healthy. Leave with a sharp, polished appearance that matches your individual taste!'
    },
    {
        id:2,
        icon:'https://img.icons8.com/?size=100&id=Y5yb4j6UVYZz&format=png&color=FFFFFF',
        name:'HAIRCUT & SHAVE',
        description:'Elevate your grooming routine with our Haircut & Shave combination! Enjoy a sharp, personalized haircut that complements your style, followed by a smooth, precise, and clean shave. This service ensures you leave looking your best with a refined look that suits any occasion. Whether you’re after a fresh new style or a quick touch-up, our experts deliver the perfect combination of a great cut and a close shave for a sharp, confident appearance.'
    },
])
</script>