<template>
  <ValidationProvider :rules="rules" v-slot="{ errors }" class="custom-select-box" :class="disabled? 'pointer-events-none' : ''">

    <div v-if="$slots.prefix" class="custom-select-box-prefix">
      <slot name="prefix"/>
    </div>

    <div class="custom-select">

      <div class="custom-select-field" :data-value="selected" :data-list="items">
        <div class="custom-select-field-selector" @click="toggle()">
          <div class="custom-select-field-label">
            <div class="custom-select-field-label-item">
              <div class="d-flex flex-column">
                <span>{{ selected?.hasOwnProperty(itemKey) ? selected[itemKey] : placeholder }}</span>
              </div>
            </div>
          </div>
          <svg class="transition ease-in custom-select-field-arrow" :style="`transform: rotate(${visible? 180 : 0}deg)`" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6.37509L0 0.375092H1.4H6L10.6 0.375433L12 0.375092L6 6.37509Z" fill="#999999"/>
          </svg>
          <div :class="{ 'custom-select-hidden' : !visible, visible }">
            <ul>
              <li :class="{ 'custom-select-current' : item === selected }" v-for="item in items" @click="select(item)">
                <div class="custom-select-field-label-item">
                  <div class="d-flex flex-column">
                    <span>{{ item[itemKey] }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <input
          :id='name'
          :name="name"
          v-bind:value="value"
          v-on:input="$emit('input', $event.target.value)"
          autocomplete="off"
          hidden
      />

    </div>
    <span class="custom-select-error" :class="errors[0]? 'custom-select-error-active' : ''" v-text="errors[0]"></span>

    <div v-if="$slots.append" class="custom-select-box-append">
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
    items: {
      type: Array,
      default: []
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
    itemKey: {
      type: String,
      default: 'content'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    value: {
      type: [String, Number],
      default: ''
    },
  },
  data() {
    return {
      selected: null,
      visible: false,
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    },
    select(item) {
      this.$emit('input', item.hasOwnProperty(this.itemValue) ? item[this.itemValue] : item)
    }
  },
  watch: {
    value() {
      this.selected = this.items.find((item) => item.hasOwnProperty(this.itemValue) && item[this.itemValue] === this.value) || this.items[0]
    }
  },
  created() {
    this.selected = this.items.find((item) => item.hasOwnProperty(this.itemValue) && item[this.itemValue] === this.value) || this.items[0]
  }
}

</script>
<style lang="scss">

.custom-select-box{
  cursor: pointer;
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
    padding-left: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: max(1rem,min(1vw,5rem));
  }

  &-append{
    height: 100%;
    padding-right: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.custom-select {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &-current {
    background: #f8f8f8;
  }
  &-hidden {
    visibility: hidden;
  }

  &-label {
    position: absolute;
    display: block;
    top: -12px;
    left: 12px;
    transition: 0.2s;
    font-size: 0.9rem;
    padding-left: 4px;
    padding-right: 4px;
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
    position: relative;

    &-arrow {
      position: absolute;
      top: 45%;
      right: 10px;
    }

    &-selector {
      width: 100%;
      height: 100%;

      ul {
        width: 100%;
        max-height: 200px;
        list-style-type: none;
        padding: 0;
        margin: 0.5px 0 0;
        font-size: 16px;
        position: absolute;
        z-index: 1;
        overflow: hidden;
        overflow-y: auto;
        background: #fff;
        border: 1px solid #e8e8e8;
      }
      li {
        padding: 12px;
        &:hover {
          background: #f8f8f8;
        }
      }

    }

    &-expanded {
      transform: rotateZ(180deg) translateY(2px);
    }

    &-label {
      padding: 8px 26px 8px 12px;
      display: flex;
      justify-content: start;
      align-items: center;
      width: 100%;
      height: 100%;
      font-size: 16px;
      color: #888;

      &-item{
        display: flex;
        align-items: center;
        justify-content: start;

        img{
          width: auto;
          height: 24px;
          margin-right: 8px;
        }

        p {
          font-size: 12px;
        }

      }

    }

  }

}

.custom-select-field:focus {
  ~ .custom-select-label {
    position: absolute;
    top: -12px;
    display: block;
    color: #2d2d2d;
    transition: 0.2s;
    font-size: 0.9rem;
    padding-left: 4px;
    padding-right: 4px;
    background: linear-gradient(to top, #ffffff 60%, rgba(255, 255, 255, 0.16) 40%);
  }
}

</style>