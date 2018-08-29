<style lang="less">
.main-header {
    a.sidebar-toggle {
        cursor: pointer;

        &::before {
            content: '';
        }
    }
}
</style>
<template>
<div class="main-header">
    <a href="/" class="logo">
      <!-- Add the class icon to your logo image or logo icon to add the margining -->
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>{{$root.site.title ? $root.site.title[0] : ''}}</b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">{{$root.site.title}}</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href class="sidebar-toggle" role="button" @click.prevent="click">
            <span class="sr-only">Toggle navigation</span>
            <span :class="['fa', $root.toggled ? 'fa-angle-double-left' : 'fa-angle-double-right']"></span>
        </a>
      <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <notification-menu></notification-menu>
            <add-menu></add-menu>
            <user-menu></user-menu>
          </ul>
        </div>
    </nav>
</div>
</template>


<script>
import UserMenu from 'components/user-menu.vue';
import NotificationMenu from 'components/notification-menu.vue';
import AddMenu from 'components/add-menu.vue';

export default {
    components: {AddMenu, NotificationMenu, UserMenu},
    methods: {
        click() {
            this.$emit('navigation:toggled');
        }
    }
};
</script>
