<template>
  <tbody>
    <tr v-for="n in 5" class="h-16">
      <th>
        <div class="flex flex-col gap-2">
          <div class="skeleton w-40 h-4"> </div>
          <div class="skeleton w-32 h-2"> </div>
        </div>
      </th>
      <th>
        <div class="flex justify-center items-end">
          <div class="skeleton w-28 h-4"> </div>
        </div>
      </th>
      <th>
        <div class="flex gap-2 justify-center">
          <div class="skeleton w-24 h-4"> </div>
          <div class="skeleton w-20 h-4"> </div>
        </div>
      </th>
      <th>
        <div class="flex gap-2 justify-center">
          <div class="skeleton w-8 h-8 rounded"> </div>
        </div>
      </th>
    </tr>
  </tbody>
</template>
