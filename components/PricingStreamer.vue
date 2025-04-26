<script setup lang="ts">


</script>

<template>
  <UContainer>
    <div class="text-3xl font-bold text-center text-white mb-10">Choisissez votre abonnement</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <!-- Offre gratuite -->
      <div
        class="p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl flex flex-col justify-between"
      >
        <div>
          <h3 class="text-2xl font-bold text-white mb-2">Offre Gratuite</h3>
          <p class="text-4xl font-extrabold text-secondary-400 mb-6">0€ / mois</p>
          <ul class="space-y-4 text-gray-300">
            <li>✅ 2 Golden Buzz par semaine</li>
            <li>✅ 5 Playlists maximum</li>
            <li>✅ 20 musiques par playlist</li>
            <li>❌ 20% de commission sur les Louz</li>
          </ul>
        </div>
      </div>

      <!-- Offre premium -->
      <div
        class="p-8 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-xl flex flex-col justify-between"
      >
        <div>
          <h3 class="text-2xl font-bold text-white mb-2">Offre Premium</h3>
          <p class="text-4xl font-extrabold text-white mb-6">5,99€ / mois</p>
          <ul class="space-y-4 text-gray-200">
            <li>✅ Golden Buzz illimités</li>
            <li>✅ 100 Playlists maximum</li>
            <li>✅ 100 musiques par playlist</li>
            <li>✅ 0% de commission</li>
          </ul>
        </div>
        <UButton color="white" variant="solid" size="lg" class="mt-10 w-full font-bold text-black">
          Passer Premium
        </UButton>
      </div>
    </div>
  </UContainer>
</template>
