<script setup lang="ts">
import { ref } from 'vue'
import VOtpInput from 'vue3-otp-input'

const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null)
const bindModal = ref('')

const emit = defineEmits(['handleOnComplete', 'handleOnChange'])

const handleOnComplete = (value: string) => {
  emit('handleOnComplete', value)
}

const handleOnChange = (value: string) => {
  emit('handleOnChange', value)
}

onMounted(() => {
  nextTick(() => {
    const inputElement = document.querySelector('.one')
    if (inputElement) {
      ;(inputElement as HTMLInputElement).focus()
    }
  })
})
</script>

<template>
  <div
    style=""
    class="mx-auto"
  >
    <v-otp-input
      ref="otpInput"
      v-model:value="bindModal"
      input-classes="otp-input"
      class="justify-center"
      :conditional-class="['one', 'two', 'three', 'four']"
      separator=" "
      input-type="number"
      :num-inputs="5"
      :should-auto-focus="false"
      :should-focus-order="false"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<style>
.otp-input {
  width: 45px;
  height: 70px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 12px;
  border: 2px solid white;
  background-color: transparent;
  text-align: center;
}

@media (max-width: 640px) {
  .otp-input {
    width: 36px;
    height: 56px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 12px;
    border: 2px solid white;
    background-color: transparent;
    text-align: center;
  }
}

/* Background color of an input field with value */
.otp-input.is-complete {
  border: 5px solid white;
  background-color: transparent;
  color: white;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
