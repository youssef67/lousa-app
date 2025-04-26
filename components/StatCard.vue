<template>
  <div
    :class="[
      'p-6 rounded-2xl text-white flex flex-col justify-between shadow-lg transition transform hover:scale-105',
      isHighlighted ? 'bg-gradient-to-r from-purple-600 to-indigo-600 col-span-2' : 'bg-gray-800'
    ]"
  >
    <div class="flex items-center gap-4">
      <div class="p-3 bg-gray-700 rounded-full">
        <component :is="iconComponent" size="32" />
      </div>
      <h2 class="text-lg font-semibold text-gray-300">{{ title }}</h2>
    </div>
    <p :class="['mt-6 font-bold', isHighlighted ? 'text-4xl' : 'text-2xl']">
      {{ formattedValue }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Music, Users, DollarSign, Star, ListMusic, PawPrint } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  title: string
  value: number
  highlight?: boolean
}>()

// Map des icônes
const iconsMap = {
  music: Music,
  users: Users,
  dollarSign: DollarSign,
  star: Star,
  listMusic: ListMusic,
  pawPrint: PawPrint,
}

// Cherche l'icône en fonction du nom
const iconComponent = computed(() => iconsMap[props.icon])

// Format du texte si c'est du montant
const formattedValue = computed(() => {
  return props.title.includes('€') ? `${props.value.toFixed(2)} €` : props.value
})

// Est-ce une carte à mettre en avant ?
const isHighlighted = computed(() => props.highlight || false)
</script>
