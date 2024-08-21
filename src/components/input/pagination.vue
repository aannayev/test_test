<template>
  <ul v-if="total_pages > 1" class="pagination-list">
    <li :class="{'disabled': isInFirstPage}">
      <button type="button"
              :disabled="isInFirstPage"
              @click="gotoFirst">
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.41669 7.5L0.916687 4L4.41669 0.5L5.23335 1.31667L2.5646 4L5.23335 6.68333L4.41669 7.5ZM8.26669 7.5L4.76669 4L8.26669 0.5L9.08335 1.31667L6.4146 4L9.08335 6.68333L8.26669 7.5Z" fill="#6C757D"/>
        </svg>
      </button>
    </li>

    <li :class="{'disabled': isInFirstPage}">
      <button type="button"
              :disabled="isInFirstPage"
              @click="gotoPrevious">
        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16669 7.5L0.666687 4L4.16669 0.5L4.98335 1.31667L2.30002 4L4.98335 6.68333L4.16669 7.5Z" fill="#6C757D"/>
        </svg>
      </button>
    </li>

    <template v-if="showDots('left')">
      <li>
        <button type="button"
                @click="gotoPageNumber(1)">
          1
        </button>
      </li>

      <li>
        <button type="button" disabled class="no_hover">...</button>
      </li>
    </template>

    <li v-for="(page, index) in pages"
        :key="`pages_${index}`"
        :class="{'active': page === value}">
      <button type="button"
              :disabled="page === value"
              @click="gotoPageNumber(page)">
        {{ page }}
      </button>
    </li>

    <template v-if="showDots('right')">
      <li>
        <button type="button" disabled class="no_hover">...</button>
      </li>

      <li>
        <button type="button"
                @click="gotoPageNumber(total_pages)">
          {{ total_pages }}
        </button>
      </li>
    </template>

    <li :class="{'disabled': isInLastPage}">
      <button type="button"
              :disabled="isInLastPage"
              @click="gotoNext">
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.40004 4L0.333374 0.933333L1.26671 0L5.26671 4L1.26671 8L0.333374 7.06667L3.40004 4Z" fill="#6C757D"/>
        </svg>
      </button>
    </li>

    <li :class="{'disabled': isInLastPage}">
      <button type="button"
              :disabled="isInLastPage"
              @click="gotoLast">
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.38337 4L0.333374 0.933333L1.26671 0L5.26671 4L1.26671 8L0.333374 7.06667L3.38337 4ZM7.78337 4L4.73337 0.933333L5.66671 0L9.66671 4L5.66671 8L4.73337 7.06667L7.78337 4Z" fill="#6C757D"/>
        </svg>
      </button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    value: { type: Number },
    pagination: { type: Object, required: true, default: () => ({}) },
    maxVisibleButtons: { type: Number, required: false, default: 5 },
  },

  data() {
    return {
      per_page: 10,
      total: 0,
      total_pages: 0,
    };
  },

  watch: {
    pagination: {
      handler(pagination) {
        this.per_page = pagination.per_page || 10;
        this.total = pagination.total || 0;
        this.total_pages = pagination.total_pages || 0;
      },
      immediate: true,
    },
  },

  computed: {
    isInFirstPage() {
      return this.value === 1;
    },

    isInLastPage() {
      return this.value === this.total_pages;
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }

      return range;
    },

    startPage() {
      if (this.value === 1) {
        return 1;
      }

      if (this.value === this.total_pages) {
        return Math.max(1, this.total_pages - this.maxVisibleButtons + 1);
      }

      return this.value - 1;
    },

    endPage() {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.total_pages);
    },
  },

  methods: {
    showDots(position = "left") {
      const number = position === "left" ? 1 : this.total_pages;
      const nextNumber = position === "left" ? 2 : this.total_pages - 1;

      return !this.pages.includes(number) || !this.pages.includes(nextNumber);
    },

    gotoFirst() {
      this.gotoPageNumber(1);
    },

    gotoLast() {
      this.gotoPageNumber(this.total_pages);
    },

    gotoPrevious() {
      this.gotoPageNumber(this.value - 1);
    },

    gotoNext() {
      this.gotoPageNumber(this.value + 1);
    },

    gotoPageNumber(pageNumber) {
      this.$emit("input", pageNumber);
    },
  },
}
</script>
<style lang="css" scoped>

.pagination-list {
  list-style-type: none;
  display: flex;
  gap: 5px;
  padding-left: 0;
  margin: 0;
  font-family: Roboto,serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 11.72px;
  text-align: center;

}

.pagination-list button {
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-list li button:hover {
  background-color: #e2e2e2;
}

.pagination-list li.disabled button {
  cursor: not-allowed;
  background-color: #f9f9f9;
  color: #999;
}

.pagination-list li.active button {
  background-color: #50B053;
  color: #fff;
  cursor: default;
}

.no_hover:hover{
  background-color: transparent !important;
}

</style>
