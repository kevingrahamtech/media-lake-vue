<template>
        <b-navbar class="justify-content-between" toggleable="lg" type="dark">
          <b-navbar-brand>
            <router-link :to="{name: 'Home'}">MediaLake</router-link>
          </b-navbar-brand>
          <b-navbar-nav class="mr-auto">
            <b-nav-item>
                <router-link :to="{name: 'Discover'}">Discover</router-link>
              </b-nav-item>
          </b-navbar-nav>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
              <api-search-form></api-search-form>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav>

              <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <span>User</span>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
</template>

<script>
import ApiSearchForm from './ApiSearchForm.vue';

export default {
    components: {
        ApiSearchForm
    }
}
</script>

<style scoped>
.navbar {
  padding: 20px 30px;
  border-bottom: 1px solid #42b983;
  background: linear-gradient(160.68deg, #0F495C 0%, #0D3640 49.72%, #08141F 100%);

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .navbar-toggler {
    color: #42b983;
  }
}
.navbar-brand{
  font-family: Cocon;
}
</style>