<template>
    <div class="bg-[#111827] min-h-screen">
      <!-- Wrap components in Suspense to handle loading -->
       <Suspense>
        <template #default>
          <!-- Wrap all Components inside a single root element -->
           <div>
              <NavBar />
              
              <WelcomeSection />
              <ServicesSection />
              <LocationSection />
              <ReviewSection/>
              <GallerySection />
              <AppointmentSection />
              <Footer />
              <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
            <loadingSpinner />
        </div>
      </template>
    </Suspense>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  const WelcomeSection = defineAsyncComponent(() => import('@/views/webpage/welcome.vue'));
  const ServicesSection = defineAsyncComponent(() => import('@/views/webpage/services.vue'));
  const LocationSection = defineAsyncComponent(() => import('@/views/webpage/location.vue'));
  const ReviewSection = defineAsyncComponent(() => import('@/views/webpage/review.vue'));
  const GallerySection = defineAsyncComponent(() => import('@/views/webpage/gallery.vue'));
  const AppointmentSection = defineAsyncComponent(() => import('@/views/webpage/appointment.vue'));
  
  const NavBar = defineAsyncComponent(() => import('@/components/navbar.vue'));
  const Footer = defineAsyncComponent(() => import('@/components/footer.vue'));
  const BackToTop = defineAsyncComponent(() => import('@/components/backtotop.vue'));
  import loadingSpinner from '@/components/loadingSpinner.vue';
  </script>
  <style>
  
  *{
    scrollbar-width: thin;
    scrollbar-color: #111827 #f1f1f1;
  }
  </style>
  
  