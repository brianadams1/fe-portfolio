<template>
  <tbody>
    <tr v-for="n in 10">
      <th>
        <div class="skeleton w-10 h-10 rounded"></div>
      </th>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-16 h-4"></div>
        </div>
      </td>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-52 h-4"></div>
        </div>
      </td>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-6 h-6"></div>
        </div>
      </td>
      <td>
        <div class="flex justify-center">
          <div class="skeleton w-8 h-8 rounded"></div>
        </div>
      </td>
    </tr>
  </tbody>
</template>
