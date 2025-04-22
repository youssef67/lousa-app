<script setup lang="ts">
const { pushTermsSales, pushTermsUse, pushPrivatePolicy, pushAboutUs, pushLegal } =
  useSpecialRouter()
</script>

<template>
  <UFooter class="w-full py-8">
    <template #center>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6">
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 class="font-bold text-lg mb-2">À propos</h1>
          <ul class="space-y-2">
            <li>
              <NuxtLink :to="pushLegal(false)">Mentions légales</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="pushAboutUs(false)">À propos de nous</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 class="font-bold text-lg mb-2">Services</h1>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/faq">FAQ</NuxtLink>
            </li>
            <li class="flex flex-wrap justify-center md:justify-start gap-1">
              <NuxtLink :to="pushTermsSales(false)">CGV</NuxtLink> /
              <NuxtLink :to="pushTermsUse(false)">CGU</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="pushPrivatePolicy(false)">Vie privée</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 class="font-bold text-lg mb-2">Contact</h1>
          <p class="text-sm">you.moudni@gmail.com</p>
        </div>
      </div>
    </template>
  </UFooter>
</template>
