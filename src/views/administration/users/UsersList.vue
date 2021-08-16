<template>
  <main class="column">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="title">{{ $t('users.page-title.listing') }}</div>
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
                  {{ $t('breadcrumb.administration') }}
                </router-link>
              </li>
              <li class="is-active">
                <a href="#" aria-current="page">
                  {{ $t('breadcrumb.users.listing') }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column is-four-fifths">
        <b-field>
          <b-input
            expanded
            type="search"
            v-model="pageRequest.filter"
            @keypress.native.enter="loadData"
            :placeholder="$t('users.list.filter')"/>
          <p class="control">
            <b-button
              type="is-primary"
              @click.prevent="loadData">
              {{ $t('commons.actions.search') }}
            </b-button>
          </p>
        </b-field>
      </div>
      <div class="column has-text-right">
        <b-button type="is-primary" @click.prevent="changeToAdd">
          {{ $t('commons.actions.new') }}
        </b-button>
      </div>
      <div class="column is-full">
        <b-table
            hoverable
            :striped="true"
            :loading="loading"
            @select="onRowSelected"

            paginated
            backend-pagination
            :data="pageResponse.content"
            :per-page="pageRequest.size"
            :total="pageResponse.totalElements"
            @page-change="onPageChange"

            backend-sorting
            @sort="onSort">

            <b-table-column
              sortable
              field="name"
              v-slot="props"
              cell-class="is-vcentered"
              :label="$t('users.list.name')">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column
              sortable
              field="email"
              v-slot="props"
              cell-class="is-vcentered"
              :label="$t('users.list.email')">
              {{ props.row.email }}
            </b-table-column>
            <b-table-column
              width="10%"
              v-slot="props"
              :label="$t('commons.list.actions')">
              <b-tooltip type="is-info" :label="$t('commons.actions.edit')">
                <b-button
                  type="is-primary"
                  icon-left="file-edit"
                  @click.prevent="changeToEdit(props.row.id)"/>
              </b-tooltip>
              <b-tooltip type="is-info" :label="$t('commons.actions.delete')">
                <b-button
                  class="ml-2"
                  type="is-danger"
                  icon-left="trash-can-outline"
                  @click.prevent="changeToDelete(props.row.id)"/>
              </b-tooltip>
            </b-table-column>

            <template slot="bottom-left">
              <span class="mr-2">
                {{ $t('commons.list.rows-per-page') }}
              </span>
              <b-select v-model="pageRequest.size">
                <option value="5">5</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </b-select>
            </template>

            <template #empty v-if="!loading">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p><b-icon pack="far" icon="sad-tear" size="is-large"/></p>
                  <p>{{ $t('commons.list.empty') }}</p>
                </div>
              </section>
            </template>
        </b-table>
      </div>
    </div>
  </main>
</template>

<script>
import PageRequest from '@/models/utilities/page-request.js'
import PageResponse from '@/models/utilities/page-response.js'

import UserClient from '@/clients/administration/user.client.js'

import ViewStateMixin from '@/components/mixins/view-state.mixin.js'

export default {
  name: 'user-list',
  mixins: [
    ViewStateMixin
  ],
  methods: {
    async loadData() {
      try {
        this.loadingStarted()
        const response = await this.userClient.findAll(this.pageRequest)
        this.pageResponse = PageResponse.fromJson(response.data)
      } catch (error) {
        console.error(error) // FIXME handle this properly
      } finally {
        this.loadingEnded()
      }
    },
    onPageChange(pageNumber) {
      console.log(pageNumber)
    },
    onRowSelected(row) {
      this.$router.push({ name: 'users.detail', params: { id: row.id } })
    },
    onSort(field, order) {
      this.pageRequest.sortFields = field
      this.pageRequest.direction = order
      this.loadData()
    },
    changeToAdd() {
      this.$router.push({ name: 'users.add' })
    },
    changeToDelete(userId) {
      this.$router.push({ name: 'users.delete', params: { id: userId } })
    },
    changeToEdit(userId) {
      this.$router.push({ name: 'users.edit', params: { id: userId } })
    }
  },
  data() {
    return {
      userClient: null,
      pageRequest: new PageRequest(),
      pageResponse: new PageResponse()
    }
  },
  created() {
    this.userClient = new UserClient()
  },
  mounted() {
    this.loadData()
  }
}
</script>
