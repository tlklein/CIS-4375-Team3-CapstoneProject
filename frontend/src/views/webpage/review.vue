<template>
    <section class="text-white mt-20" id="reviews" data-aos="zoom-in">
        <h2 class="text-4xl font-bold text-white text-center mb-4 px-4 xl:pl-16">Customer Review</h2>
        <div class="px-4 xl:px-16">
            <Carousel v-bind="settings" :breakpoints="breakpoints">
                <Slide v-for="element in testimonials" :key="element.id">
                    <div class="carousel__item p-4">
                        <div class="w-full mx-auto bg-[#111a3e] shadow-lg p-5 text-white font-light mb-6">
                            <div class="w-full flex mb-4 items-center">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                                    <img :src="element.image" alt="testimonial image" loading="lazy">
                                </div>
                                <h6 class="ml-4 font-bold text-sm uppercase text-white">{{ element.fullName }}</h6>
                            </div>
                            <div class="w-full">
                                <p class="text-sm leading-tight">
                                    <span class="text-lg leading-none italic font-bold text-white mr-1">"</span>
                                    {{ element.comment }}
                                    <span class="text-lg leading-none italic font-bold text-white mr-1">"</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Carousel settings
const settings = ref({
    itemsToShow: 1,
    snapAlign: "center",
});

// Breakpoints
const breakpoints = ref({
    700: {
        itemsToShow: 2.5,
        snapAlign: 'center',
    },
    1024: {
        itemsToShow: 3,
        snapAlign: 'start'
    }
});

const testimonials = ref([
    {
        id: 1,
        fullName: 'Luciano Garza',
        image: 'src/assets/review1.png',
        comment: 'I have been going to Prestige for a year now. My barber Carlos is one of the best Barbers in the salon. I got referred by an attorney and his assistants that have been using him for so many years now. Ive never been disappointed, edge up on point, beard and mustache trim, eyebrows done and more that he treats me like family and makes me feel welcome and right at home. Customer Service Satisfaction Guaranteed'
    },
    {
        id: 2,
        fullName: 'Jason Trevino',
        image: 'src/assets/review2.png',
        comment: 'Been coming here for about 5 years, Carlos is a great barber and I would recommend him to anyone looking for a good fade 🥶'
    },
    {
        id: 3,
        fullName: 'Carlos Hernandez',
        image: 'src/assets/review3.png',
        comment: 'Been coming to Prestige for about 5 years and Carlos has taken care of us since day one. Hes the first person to cut my sons hair and will keep going with him until he cant cut anymore. Would recommend anyone who wants to look fresh, but also experience a proper barber service to go to him. He accepts cash, zelle or cashapp to accommodate everyone.'
    },
    {
        id: 4,
        fullName: 'client 4',
        image: 'src/assets/image.png',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam minima reprehenderit maiores itaque molestiae optio, voluptatibus iusto eos doloremque consectetur!'
    },
    {
        id: 5,
        fullName: 'client 5',
        image: 'src/assets/image.png',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam minima reprehenderit maiores itaque molestiae optio, voluptatibus iusto eos doloremque consectetur!'
    },
]);
</script>

<style>
.carousel__prev,
.carousel__next {
    color: white !important;
}
</style>