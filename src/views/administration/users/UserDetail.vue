<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title" v-if="user && deleting">
            {{ $t('users.page-title.deleting') }}
          </div>
          <div class="title" v-else>
            {{ $t('users.page-title.detailing') }}
          </div>
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
              <li>
                <router-link :to="{ name: 'administration' }">
                  {{ $t('breadcrumb.menus.administration') }}
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'users' }">
                  {{ $t('breadcrumb.pages.users') }}
                </router-link>
              </li>
              <li class="is-active">
                <a href="#" aria-current="page" v-if="deleting">
                  {{ $t('breadcrumb.actions.deleting') }}
                </a>
                <a href="#" aria-current="page" v-else>
                  {{ $t('breadcrumb.actions.detailing') }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="columns is-multiline pt-4">
      <div class="column is-12">
        <b-field>
          <b-switch v-model="user.active" :type="user.active ? 'is-success' : ''" size="is-medium">
            {{ user.active ? $t('commons.state.active') : $t('commons.state.inactive') }}
          </b-switch>
        </b-field>
      </div>
      <div class="column is-4">
        <b-field
          :message="errors"
          :label="$t('users.form.name')">
          <b-input v-model="user.name" />
        </b-field>
      </div>
      <div class="column is-4">
        <b-field
          :message="errors"
          :label="$t('users.form.email')">
          <b-input v-model="user.email" />
        </b-field>
      </div>
      <div class="column is-4">
        <b-field
          :message="errors"
          :label="$t('users.form.profile')">
          <b-taginput
            icon="label"
            autocomplete
            open-on-focus
            type="is-dark"
            :data="authorities"
            closeType="is-danger"
            :loading="loadingData"
            :readonly="loadingData"
            v-model="user.authorities"
            :placeholder="$t('commons.select.type-to-search')">
            <template slot-scope="props">
              {{ $t(`users.authorities.${props.option}`) }}
            </template>
            <template slot="empty">
              {{ $t('commons.list.empty') }}
            </template>
            <template slot="tag" slot-scope="props">
              {{ $t(`users.authorities.${props.tag}`) }}
            </template>
          </b-taginput>
        </b-field>
      </div>
      <div class="column is-12 has-text-right" v-if="!deleting">
          <b-button
            type="is-success"
            @click.prevent="changeToEdit">
            {{ $t('commons.actions.edit') }}
          </b-button>
          <b-button
            class="ml-2"
            type="is-danger"
            @click.prevent="changeToDelete">
            {{ $t('commons.actions.delete') }}
          </b-button>
          <b-button
            class="ml-2"
            type="is-primary"
            @click.prevent="goBack">
            {{ $t('commons.actions.back') }}
          </b-button>
        </div>
        <div class="column is-12 has-text-right" v-else>
          <span class="is-inline is-relative mr-3 has-text-danger delete-confirmation">
            {{ $t('commons.notification.delete-confirmation') }}
          </span>
          <b-button
            type="is-danger"
            :loading="loading"
            :disabled="loading"
            @click.prevent="doDelete">
            {{ $t('commons.actions.yes') }}
          </b-button>
          <b-button
            class="ml-2"
            type="is-success"
            :disabled="loading"
            @click.prevent="goBack">
            {{ $t('commons.actions.no') }}
          </b-button>
        </div>
      <b-loading :active.sync="loadingPage" :is-full-page="false"/>
    </div>
  </main>
</template>

<script>
import UserClient from '@/clients/administration/user.client.js'
import AuthoritiesClient from '@/clients/administration/authorities.client.js'

import User from '@/models/administration/user.js'

import FormMixin from '@/components/mixins/form.mixin.js'
import NotificationsMixin from '@/components/mixins/notifications.mixin.js'
import LoadingStateMixin from '@/components/mixins/loading-state.mixin.js'

export default {
  name: 'user-detail',
  props: {
    id: { type: String },
    deleting: { type: Boolean, default: false }
  },
  mixins: [
    FormMixin,
    LoadingStateMixin,
    NotificationsMixin
  ],
  methods: {
    async doDelete() {
      try {
        this.loadingStart()
        await this.userClient.delete(this.id)
        this.notifyDeletedSuccess()
        this.$router.push({ name: 'users' })
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingEnd()
      }
    },
    async loadFormData() {
      try {
        this.loadingStart()
        const response = await this.userClient.findById(this.id)
        this.user = User.fromJson(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingEnd()
      }
    },
    async loadAuthorities() {
      try {
        this.loadingDataStart()
        const response = await this.authoritiesClient.findAll()
        this.authorities = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingDataEnd()
      }
    },
    changeToDelete() {
      this.$router.push({ name: 'users.delete', params: { id: this.id } })
    },
    changeToEdit() {
      this.$router.push({ name: 'users.edit', params: { id: this.id } })
    }
  },
  data() {
    return {
      user: new User(),
      authorities: [],
      userClient: null,
      authoritiesClient: null
    }
  },
  created() {
    this.userClient = new UserClient()
    this.authoritiesClient = new AuthoritiesClient()
  },
  mounted() {
    if (this.id) {
      this.loadAuthorities()
      this.loadFormData()
    }
  }
}
</script>
