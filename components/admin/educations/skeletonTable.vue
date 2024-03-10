<template>
  <tbody>
    <tr v-for="n in 10">
      <th>
        <div class="skeleton w-80 h-4"></div>
      </th>
      <td>
        <div class="flex gap-3 justify-center">
          <div class="skeleton w-20 h-4"></div>
          <div class="skeleton w-20 h-4"></div>
        </div>
      </td>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-20 h-4"></div>
        </div>
      </td>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-20 h-4"></div>
        </div>
      </td>
      <td>
        <div class="flex gap-3 justify-center">
          <div class="skeleton w-6 h-6"></div>
          <div class="skeleton w-6 h-6"></div>
        </div>
      </td>
    </tr>
  </tbody>
</template>
