<template>
  <header class="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
      <div class="container-xl">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <router-link :to="{ name: 'home' }" class="wb-logo wb-logo-home">
            webBudget
          </router-link>
        </h1>
        <div class="navbar-nav flex-row order-md-last">
          <notification-menu />
          <user-menu />
        </div>
        <div class="collapse navbar-collapse" id="navbar-menu">
          <div class="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#" >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <dashboard-icon />
                  </span>
                  <span class="nav-link-title">
                    {{ $t('main-menu.dashboards') }}
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <currency-dollar-icon />
                  </span>
                  <span class="nav-link-title">
                    {{ $t('main-menu.financial') }}
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <chart-area-icon />
                  </span>
                  <span class="nav-link-title">
                    {{ $t('main-menu.investments') }}
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <edit-icon />
                  </span>
                  <span class="nav-link-title">
                    {{ $t('main-menu.registration') }}
                  </span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" >
                  <span class="nav-link-icon d-md-none d-lg-inline-block">
                    <adjustments-icon />
                  </span>
                  <span class="nav-link-title">
                    {{ $t('main-menu.configurations') }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
</template>

<script setup>
import UserMenu from '@/components/home/UserMenu.vue'
import NotificationMenu from '@/components/home/NotificationMenu.vue'

import {
  DashboardIcon,
  EditIcon,
  CurrencyDollarIcon,
  ChartAreaIcon,
  AdjustmentsIcon
} from 'vue-tabler-icons'
</script>
