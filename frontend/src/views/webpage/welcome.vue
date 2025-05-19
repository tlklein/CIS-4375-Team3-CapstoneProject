<template>
    <section class="relative w-full" data-aos="zoom-in-up">
        <div class="absolute top-0 inset-x-0 h-64 flex items-start" data-aos="fade-down" data-aos-delay="200">
            <div class="h-24 w-2/3 bg-gradient-to-br from-[#570cac] blur-2xl invisible opacity-40"></div>
            <div class="h-20 w-3/5 bg-gradient-to-r from-[#670ccf] opacity-40 blur-2xl"></div>
        </div>
        <div class="w-full px-5 sm:px-8 md:px-12 lg:px-8 max-w-screen-lg lg:max-w-screen-xl mx-auto relative">
            <div class="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto">
                <!-- Welcome Text -->
                <div class="lg:py-6" data-aos="fade-right" data-aos-delay="400">
                    <div class="text-center lg:text-left">
                        <h1 class="pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl">
                            Welcome To The
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                                Carlos "El Tigre" Zuniga Cuts
                            </span>
                        </h1>
                        <div class="flex items-center gap-3 pt-9 flex-col" data-aos="fade-up" data-aos-delay="600">
                            <!-- Anchor Link to #appointment -->
                            <a 
                                href="#appointment" 
                                class="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-500 transition duration-300"
                            >
                                BOOK TODAY!
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Hero Image -->
                <div class="lg:h-full md:flex" data-aos="fade-left" data-aos-delay="400">
                    <div class="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative">
                        <div class="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-[#570cac] to-primary blur-2xl"></div>
                        <div class="absolute h-full z-10 p-2 -translate-y-1/2 top-1/2 lg:right-3 md:right-40 sm:right-16 rounded-full shadow-lg">
                            <img src="@/assets/photo1.jpg" alt="Hero pic" width="500" height="auto" loading="lazy"
                            class="w-full h-full rounded-full object-cover"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init();
</script>