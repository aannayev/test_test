<template>
  <ValidationProvider :rules="rules" v-slot="{ errors }" class="custom-input-box" :class="disabled? 'pointer-events-none' : ''">
    <div v-if="$slots.prefixIcon" class="custom-input-box-prefix">
      <slot name="prefixIcon"/>
    </div>
    <div v-if="$slots.prefix" class="custom-input-box-prefix">
      <slot name="prefix"/>
    </div>

    <div class="custom-input">
      <input
          :id='name'
          :name="name"
          :type="type"
          :placeholder="placeholder"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          class="custom-input-field"
          autocomplete="off"
      />

      <label :for="name" class="custom-input-label">{{placeholder}}</label>
    </div>
    <span class="custom-input-error" :class="errors[0]? 'custom-input-error-active' : ''" v-text="errors[0]"></span>

    <div v-if="$slots.append" class="custom-input-box-append">
      <slot name="append"/>
    </div>
  </ValidationProvider>
</template>
<script>

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Date],
      default: ''
    },
  },
  name: 'inputText',
}

</script>
<style lang="scss">

.custom-input-box{
  height: 48px;
  width: 100%;
  background-color: #FFFFFF;
  border-bottom: #CCCCCC solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: Roboto,serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;


  &-prefix{
    height: 100%;
    padding-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: max(1rem,min(1vw,5rem));
  }

  &-append{
    height: 100%;
    padding-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.custom-input {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &-label {
    position: absolute;
    display: block;
    top: -15px;
    left: 12px;
    transition: 0.2s;
    font-size: 0.9rem;
    padding: 4px;
    border-radius: 10px;
    user-select: none;
    background: linear-gradient(to top, #ffffff 60%, rgba(255, 255, 255, 0.16) 40%);
  }

  &-error {
    position: absolute;
    left: 0;
    font-size: 0.9rem;
    color: #dc3545;
    transition: all 0.2s;
    user-select: none;
    opacity: 0;
    bottom: 0;

    &-active {
      opacity: 1;
      bottom: -20px;
    }

  }

  &-field {
    width: 100%;
    height: 100%;
    border: 0;
    outline: 0;
    border-radius: 8px;
    font-size: max(1rem,min(1vw,5rem));
    padding: 8px 8px 8px 12px;
    transition: border-color 0.2s;
    background-color: transparent;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .custom-input-label {
      font-size: max(1rem,min(1vw,5rem));
      color: #ababab;
      cursor: text;
      top: 30%;
      left: 12px;
      padding: 0;
      background: none;
    }

  }

}

.custom-input-field:focus {
  border-width: 3px;

  ~ .custom-input-label {
    position: absolute;
    top: -15px;
    display: block;
    color: #2d2d2d;
    transition: 0.2s;
    font-size: 0.9rem;
    padding: 4px;
    border-radius: 10px;
    background: linear-gradient(to top, #ffffff 60%, rgba(255, 255, 255, 0.16) 40%);
  }
}


</style>