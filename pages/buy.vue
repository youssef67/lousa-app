<script lang="ts" setup>
const offers = [
  { louz: 100, price: '1,99 €', icon: 'i-tabler-coin' },
  { louz: 500, price: '7,99 €', icon: 'i-tabler-coins' },
  {
    louz: 1000,
    price: '14,99 €',
    icon: 'i-tabler-currency-euro',
    highlight: true,
    badge: '🔥 Offre populaire',
  },
]

const buyLouz = (amount: number) => {
  console.log(`Achat de ${amount} Louz`)
}
</script>

<template>
  <UContainer>
    <div class="text-4xl font-bold w-full text-center mb-6 text-white">Acheter des Louz</div>

    <!-- Texte d'explication -->
    <p class="text-center text-gray-300 max-w-3xl mx-auto mb-12 text-lg leading-relaxed space-y-4">
      <span class="block">
        <span class="text-secondary-400 font-semibold">Les Louz</span> sont la monnaie virtuelle de
        la plateforme. Utilisez-les pour vivre une expérience musicale plus intense.
      </span>

      <span class="block">
        💽 <span class="text-white font-medium">Soumettez vos musiques</span> et entrez dans l’arène
        des battles pour tenter de dominer le classement.
      </span>

      <span class="block">
        🔥 <span class="text-white font-medium">Boostez vos morceaux favoris</span> avec des likes
        supplémentaires pour les faire briller.
      </span>

      <span class="block">
        🎁 <span class="text-white font-medium">Faites gagner votre streamer</span> et contribuez à
        lui générer un <span class="text-secondary-400 font-semibold">revenu complémentaire</span> à
        chaque victoire.
      </span>
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div
        v-for="offer in offers"
        :key="offer.louz"
        :class="[
          'relative p-6 rounded-3xl shadow-xl flex flex-col items-center justify-between transition-all duration-300',
          'bg-gradient-to-br from-gray-800 to-gray-900',
          offer.highlight ? 'ring-2 ring-secondary-400 scale-105' : 'hover:scale-105',
        ]"
      >
        <!-- Badge "Offre populaire" -->
        <div
          v-if="offer.badge"
          class="absolute -top-3 -right-3 bg-secondary-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow animate-pulse"
        >
          {{ offer.badge }}
        </div>

        <UIcon :name="offer.icon" class="text-5xl mb-4 text-secondary-400 drop-shadow-md" />
        <h3 class="text-2xl font-semibold text-white mb-1">{{ offer.louz }} Louz</h3>
        <p class="text-lg text-gray-300 mb-6">{{ offer.price }}</p>
        <UButton
          size="lg"
          class="w-full font-bold"
          color="secondary"
          variant="solid"
          @click="buyLouz(offer.louz)"
        >
          Acheter
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
/* Bonus : pour rendre l'animation pulse plus douce si besoin */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
