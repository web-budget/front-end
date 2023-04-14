<template>
  <header
    v-once
    class="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none"
  >
    <div class="container-xl">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1
        class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"
      >
        <router-link :to="{ name: 'home' }" class="wb-logo wb-logo-home">
          webBudget
        </router-link>
      </h1>
      <div class="navbar-nav flex-row order-md-last">
        <notification-menu />
        <user-menu />
      </div>
      <div class="collapse navbar-collapse" id="navbar-menu">
        <div
          class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center"
        >
          <ul class="navbar-nav">
            <menu-section label="main-menu.base.financial">
              <template #icon>
                <currency-dollar-icon />
              </template>
              <template #items>
                <div class="dropdown-menu-column">
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.credit-card-invoice') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.bank-accounts') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.financial-periods') }}
                  </a>
                </div>
                <div class="dropdown-menu-column">
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.vehicle-logbook') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.fixed-movements') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.financial.period-movements') }}
                  </a>
                </div>
              </template>
            </menu-section>
            <menu-section label="main-menu.base.investments">
              <template #icon>
                <chart-area-icon />
              </template>
              <template #items>
                <div class="dropdown-menu-column">
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.investments.stocks') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.investments.funds') }}
                  </a>
                </div>
              </template>
            </menu-section>
            <menu-section label="main-menu.base.registration">
              <template #icon>
                <edit-icon />
              </template>
              <template #items>
                <div class="dropdown-menu-column">
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.registration.vehicles') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.registration.wallets') }}
                  </a>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.registration.credit-cards') }}
                  </a>
                </div>
                <div class="dropdown-menu-column">
                  <router-link
                    class="dropdown-item"
                    :to="{ name: 'cost-centers' }"
                  >
                    {{ $t('main-menu.registration.cost-centers') }}
                  </router-link>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.registration.movement-classes') }}
                  </a>
                </div>
              </template>
            </menu-section>
            <menu-section label="main-menu.base.configurations">
              <template #icon>
                <adjustments-icon />
              </template>
              <template #items>
                <div class="dropdown-menu-column">
                  <router-link class="dropdown-item" :to="{ name: 'users' }">
                    {{ $t('main-menu.configurations.users') }}
                  </router-link>
                  <a class="dropdown-item" href="#">
                    {{ $t('main-menu.configurations.parameters') }}
                  </a>
                </div>
              </template>
            </menu-section>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import UserMenu from '@/components/menu/UserMenu.vue'
import MenuSection from '@/components/menu/MenuSection.vue'
import NotificationMenu from '@/components/menu/NotificationMenu.vue'

import {
  AdjustmentsIcon,
  ChartAreaIcon,
  CurrencyDollarIcon,
  EditIcon,
} from 'vue-tabler-icons'
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: unset;
}
</style>
