<template>
  <ul
    class="menu bg-neutral text-white w-56 lg:rounded-box min-h-screen lg:min-h-full"
  >
    <li class="font-light my-2 px-2">Main Menu</li>
    <template v-for="menu in menus">
      <AdminLayoutNavigationItem :menu="menu" />
    </template>
  </ul>
</template>

<script setup>
const menus = [
  {
    title: "Dashboard",
    to: "/admin",
    icon: resolveComponent("LucideLayoutDashboard"),
  },
  {
    title: "Profile",
    to: "/admin/profile",
    icon: resolveComponent("LucideLayoutDashboard"),
  },
  {
    title: "Project",
    to: "/admin/project",
    icon: resolveComponent("LucideLayoutDashboard"),
  },

//   {
//     title: "Project",
//     icon: resolveComponent("LucideLayoutDashboard"),
//     children: [
//       {
//         title: "Login",
//         to: "/admin/login",
//         icon: resolveComponent("LucideLayoutDashboard"),
//       },
//       {
//         title: "Register",
//         to: "/admin/register",
//         icon: resolveComponent("LucideLayoutDashboard"),
//       },
//       {
//         title: "Register",
//         icon: resolveComponent("LucideLayoutDashboard"),
//         children: [
//           {
//             title: "Dashboard",
//             to: "/admin",
//             icon: resolveComponent("LucideLayoutDashboard"),
//           },
//           {
//             title: "Dashboard 2",
//             to: "/admin",
//             icon: resolveComponent("LucideLayoutDashboard"),
//           },
//           {
//             title: "Dashboard",
//             icon: resolveComponent("LucideLayoutDashboard"),
//             children: [
//               {
//                 title: "Dashboard",
//                 to: "/admin",
//                 icon: resolveComponent("LucideLayoutDashboard"),
//               },
//               {
//                 title: "Dashboard 2",
//                 to: "/admin",
//                 icon: resolveComponent("LucideLayoutDashboard"),
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
];
</script>
