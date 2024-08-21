<template>
  <inputText
      placeholder="Пароль"
      name="password"
      :rules="rules"
      :type="type"
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
  >
    <template v-slot:prefixIcon>
      <svg style="width: 18px; height: 18px" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.616 18C1.17133 18 0.791 17.8417 0.475 17.525C0.159 17.2083 0.000666667 16.8287 0 16.386V7.616C0 7.172 0.158333 6.792 0.475 6.476C0.791667 6.16 1.17167 6.00133 1.615 6H3V4C3 2.886 3.38833 1.941 4.165 1.165C4.941 0.388333 5.886 0 7 0C8.114 0 9.05933 0.388333 9.836 1.165C10.6127 1.94167 11.0007 2.88667 11 4V6H12.385C12.829 6 13.209 6.15833 13.525 6.475C13.841 6.79167 13.9993 7.17167 14 7.615V16.385C14 16.829 13.8417 17.209 13.525 17.525C13.2083 17.841 12.8283 17.9993 12.385 18H1.616ZM7 13.5C7.422 13.5 7.77733 13.3553 8.066 13.066C8.35533 12.7773 8.5 12.422 8.5 12C8.5 11.578 8.35533 11.2227 8.066 10.934C7.77667 10.6453 7.42133 10.5007 7 10.5C6.57867 10.4993 6.22333 10.644 5.934 10.934C5.64467 11.2227 5.5 11.578 5.5 12C5.5 12.422 5.64467 12.7773 5.934 13.066C6.22267 13.3553 6.578 13.5 7 13.5ZM4 6H10V4C10 3.16667 9.70833 2.45833 9.125 1.875C8.54167 1.29167 7.83333 1 7 1C6.16667 1 5.45833 1.29167 4.875 1.875C4.29167 2.45833 4 3.16667 4 4V6Z" fill="#757575"/>
      </svg>
    </template>
    <template v-slot:append>
      <svg @click="type='text'" v-if="type==='password'" class="cursor-pointer" style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#757575" d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"/></svg>
      <svg @click="type='password'" v-else class="cursor-pointer" style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#757575" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"/></svg>
    </template>
  </inputText>
</template>
<script>
import inputText from '@/components/input/text.vue'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
  },
  components:{
    inputText
  },
  data () {
    return {
      type: 'password'
    }
  },
  name: 'inputPhone',
}

</script>