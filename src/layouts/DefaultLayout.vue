<template>
    <div class="flex min-h-screen bg-gray-100">
        <Sidebar/>

        <div class="flex-1 flex flex-col min-h-screen">
            <Navbar/>
            <main class="flex-1 p-6">
                <slot />
            </main>
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>