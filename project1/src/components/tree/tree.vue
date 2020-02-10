<template>
  <li>
    <div
      class="bold: isFolder"
      v-on:click="toggle"
      @dblclick="changeType">
      {{ model.name }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <tree
        class="item"
        v-for="(child, index) in model.children"
        :key="index"
        :model="child">
      </tree>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>

</template>

<style>
body {
  font-family: Menlo, Consolas, monospace;
  color: rgb(230, 17, 17);
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
<script>
import Vue from 'vue'
export default {
  name: "tree",
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>
