<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title" v-if="user && editing">
            {{ $t('users.page-title.editing') }}
          </div>
          <div class="title" v-else>
            {{ $t('users.page-title.adding') }}
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
                <a href="#" aria-current="page" v-if="editing">
                  {{ $t('breadcrumb.actions.editing') }}
                </a>
                <a href="#" aria-current="page" v-else>
                  {{ $t('breadcrumb.actions.adding') }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <validation-observer ref="formObserver" v-slot="{ passes, invalid }">
      <div class="columns is-multiline pt-4">
        <div class="column is-12">
          <b-field>
            <b-switch v-model="user.active" :type="user.active ? 'is-success' : ''" size="is-medium">
              {{ user.active ? $t('commons.state.active') : $t('commons.state.inactive') }}
            </b-switch>
          </b-field>
        </div>
        <div class="column is-8">
          <div class="columns is-multiline">
            <div class="column is-6">
            <validation-provider
              rules="required"
              v-slot="{ errors, valid }"
              :name="$t('users.form.name')" >
              <b-field
                :message="errors"
                :label="$t('users.form.name')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }">
                <b-input v-model="user.name" />
              </b-field>
            </validation-provider>
          </div>
          <div class="column is-6">
            <validation-provider
              rules="required|email"
              v-slot="{ errors, valid }"
              :name="$t('users.form.email')" >
              <b-field
                :message="errors"
                :label="$t('users.form.email')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }">
                <b-input v-model="user.email" />
              </b-field>
            </validation-provider>
          </div>
          <div v-if="!editing" class="column is-6">
            <validation-provider
              vid="password"
              v-slot="{ errors, valid }"
              :name="$t('users.form.password')"
              :rules="{ required: !editing, min: 6 }">
              <b-field
                :message="errors"
                :label="$t('users.form.password')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }">
                <b-input  type="password" v-model="user.password" />
              </b-field>
            </validation-provider>
          </div>
          <div v-if="!editing" class="column is-6">
            <validation-provider
              v-slot="{ errors, valid }"
              :name="$t('users.form.password-confirmation')"
              :rules="{ required: !editing, matchPassword: '@password' }">
              <b-field
                :message="errors"
                :label="$t('users.form.password-confirmation')"
                :type="{ 'is-danger': errors[0], 'is-success': valid }">
                <b-input type="password" v-model="passwordConfirmation" />
              </b-field>
            </validation-provider>
          </div>
          </div>
        </div>
        <div class="column is-4">
          <validation-provider
            rules="required"
            v-slot="{ errors, valid }"
            :name="$t('users.form.profile')">
            <b-field
              :message="errors"
              :label="$t('users.form.profile')"
              :type="{ 'is-danger': errors[0], 'is-success': valid }">
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
          </validation-provider>
        </div>
        <div class="column is-12 has-text-right">
          <b-button
            v-if="editing"
            type="is-success"
            :loading="loading"
            @click="passes(doUpdate)"
            :disabled="invalid || loading">
            {{ $t('commons.actions.save') }}
          </b-button>
          <b-button
            v-else
            type="is-success"
            :loading="loading"
            @click="passes(doSave)"
            :disabled="invalid || loading">
            {{ $t('commons.actions.save') }}
          </b-button>
          <b-button
            :disabled="loading"
            type="is-primary ml-2"
            @click.prevent="goBack">
            {{ $t('commons.actions.back') }}
          </b-button>
        </div>
        <b-loading :active.sync="loadingPage" :is-full-page="false"/>
      </div>
    </validation-observer>
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
  name: 'user-form',
  props: {
    id: { type: String },
    editing: { type: Boolean, default: false }
  },
  mixins: [
    FormMixin,
    LoadingStateMixin,
    NotificationsMixin
  ],
  methods: {
    async doSave() {
      try {
        this.loadingStart()
        await this.userClient.save(this.user)
        this.notifySavedSuccess()
        this.resetForm()
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingEnd()
      }
    },
    async doUpdate() {
      try {
        this.loadingStart()
        await this.userClient.update(this.id, this.user)
        this.notifyUpdatedSuccess()
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
    resetForm() {
      this.user = new User()
      this.passwordConfirmation = ''
      this.resetValidations()
    }
  },
  data() {
    return {
      user: new User(),
      authorities: [],
      passwordConfirmation: '',
      userClient: null,
      authoritiesClient: null
    }
  },
  created() {
    this.userClient = new UserClient()
    this.authoritiesClient = new AuthoritiesClient()
  },
  mounted() {
    this.loadAuthorities()
    if (this.id) {
      this.loadFormData()
    }
  }
}
</script>
