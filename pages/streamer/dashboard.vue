<script lang="ts" setup>
// Données fictives
const highlightedStats = [
  { title: 'Louz dépensés', value: 3200, icon: 'pawPrint' },
  { title: 'Montant généré (€)', value: 1540.75, icon: 'dollarSign' },
]

const otherStats = [
  { title: 'Playlists créées', value: 24, icon: 'music' },
  { title: 'Playlists actives', value: 18, icon: 'listMusic' },
  { title: 'Followers totaux', value: 1200, icon: 'users' },
  { title: 'Musiques totales', value: 560, icon: 'music' },
  { title: 'Golden Buzzers', value: 15, icon: 'star' },
]
</script>

<template>
  <UContainer>
    <div class="p-8 space-y-10">
      <h1 class="text-3xl font-bold">Dashboard</h1>

      <!-- LIGNE SPÉCIALE pour les stats importantes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          v-for="(stat, index) in highlightedStats"
          :key="'highlight-' + index"
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          highlight
        />
      </div>

      <!-- Autres stats normales -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          v-for="(stat, index) in otherStats"
          :key="'other-' + index"
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
        />
      </div>

      <!-- Graphique -->
      <div class="mt-10">
        <IncomeHistoryChart />
      </div>
    </div>
  </UContainer>
</template>
