<script lang="ts" setup>
import type { StatsResponse } from '~/types/viewer.type'


const userStats = ref<StatsResponse>({
  tracksVersus: {
    completed: 0,
    votingInProgress: 0,
    onHold: 0,
    won: 0,
  },
  tracks: {
    top: 0,
    ranked: 0,
  },
})
const { runGetStats } = useViewerRepository()


onMounted(async () => {
  const stats = await runGetStats()

  if (stats) {
    userStats.value = stats
  }
})
</script>

<template>
  <UContainer>
    <div class="text-4xl font-medium w-full mb-10">Mes Statistiques</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Colonne 1 : Duels -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-white mb-2">Duels</h2>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-swords" class="text-3xl text-blue-400" />
          <div>
            <h3 class="text-lg font-semibold">Duels en cours</h3>
            <p class="text-2xl font-bold">{{ userStats.tracksVersus.votingInProgress }}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-checklist" class="text-3xl text-green-400" />
          <div>
            <h3 class="text-lg font-semibold">Duels terminés</h3>
            <p class="text-2xl font-bold">{{ userStats.tracksVersus.completed }}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-trophy" class="text-3xl text-yellow-400" />
          <div>
            <h3 class="text-lg font-semibold">Duels gagnés</h3>
            <p class="text-2xl font-bold">{{ userStats.tracksVersus.won }}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-hourglass-empty" class="text-3xl text-orange-400" />
          <div>
            <h3 class="text-lg font-semibold">Duels en attente</h3>
            <p class="text-2xl font-bold">{{ userStats.tracksVersus.onHold }}</p>
          </div>
        </div>
      </section>

      <!-- Colonne 2 : Musiques -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-white mb-2">Musiques</h2>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-award" class="text-3xl text-indigo-400" />
          <div>
            <h3 class="text-lg font-semibold">Top 3 atteints</h3>
            <p class="text-2xl font-bold">{{ userStats.tracks.top }}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-music" class="text-3xl text-pink-400" />
          <div>
            <h3 class="text-lg font-semibold">Musiques classées</h3>
            <p class="text-2xl font-bold">{{ userStats.tracks.ranked }}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-heart" class="text-3xl text-rose-400" />
          <div>
            <h3 class="text-lg font-semibold">Likes générés</h3>
            <p class="text-2xl font-bold">15</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-gray-800 text-white shadow flex items-center gap-4">
          <UIcon name="i-tabler-coin" class="text-3xl text-amber-400" />
          <div>
            <h3 class="text-lg font-semibold">Louz dépensés</h3>
            <p class="text-2xl font-bold">15</p>
          </div>
        </div>
      </section>
    </div>
  </UContainer>
</template>





<style>

</style>