<template>
    <div class="flex min-h-screen">
        <div class="min-h-screen grow grid grid-cols-10">
            <div class="col-span-10 md:col-span-3 bg-primary">
                <div class="md:fixed">content fixed</div>
            </div>
            <div class="col-span-10 md:col-span-7 bg-warning">
                <div class="bg-sky-200 min-h-screen">scroll</div>
                <div class="bg-sky-400 min-h-screen">scroll</div>
                <div class="bg-sky-600 min-h-screen">scroll</div>
                <div class="bg-sky-800 min-h-screen">scroll</div>
            </div>
        </div>
        <div class="bg-slate-100 min-h-screen w-32 flex-none max-md:hidden">
            <div class="fixed">fixed nih</div>
            
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>