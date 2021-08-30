<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">Home</div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <router-link :to="{ name: 'home' }">
                  <b-icon pack='fas' size="is-small" icon="home"/>
                  {{ $t('breadcrumb.home') }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      asasdad
    </div>
  </main>
</template>

<script>
export default {
  name: 'home'
}
</script>
