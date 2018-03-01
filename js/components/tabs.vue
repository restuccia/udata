<!--
    REMOVE ME when https://github.com/yuche/vue-strap/issues/520 will be closed
-->
<template>
<div>
  <!-- Nav tabs -->
  <ul class="nav" :class="navClass" role="tablist">
    <template v-for="t in headers">
      <li v-if="!t._tabgroup" :class="{active:t.active, disabled:t.disabled}" @click.prevent="select(t)">
          <a href="#"><slot name="header"><span v-html="t.header"></span></slot></a>
      </li>
      <dropdown v-else :text="t.header" :class="{active:t.active}" :disabled="t.disabled">
        <li v-for="tab in t.tabs" :class="{disabled:tab.disabled}"><a href="#" @click.prevent="select(tab)">{{tab.header}}</a></li>
      </dropdown>
    </template>
  </ul>
  <div class="tab-content" v-el:tab-content>
    <slot></slot>
  </div>
</div>
</template>

<script>
import TabSet from './tabset.vue';

export default {
    mixins: [TabSet],
    computed: {
        navClass() {
            return `nav-${this.navStyle}`;
        }
    }
};
</script>
