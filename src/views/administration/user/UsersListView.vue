<template>
  <page-content title="user.title" action="pages.actions.listing">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <search-controls
            @onAdd="changeToAdd()"
            @onStatusChange="applyFilter()"
            v-model:filter="pageRequest.filter"
            v-model:status="pageRequest.status"
            :placeholder="$t('user.search.filters')"
          />
        </div>
        <div class="card-body border-bottom p-0">
          <default-grid
            :loading="loading"
            :data="pageResponse.content"
            @page-changed="onPageChange($event)"
            @table-sorted="onTableSorted($event)"
            @row-selected="changeToDetail($event)"
            :total-elements="pageResponse.totalElements"
          >
            <template #columns>
              <Column
                field="name"
                :header="$t('user.grid.name')"
                :sortable="true"
              />
              <Column
                field="email"
                :header="$t('user.grid.email')"
                :sortable="true"
              />
              <Column
                headerStyle="width: 12%"
                :header="$t('grid.columns.actions')"
              >
                <template #body="slotProps">
                  <action-buttons
                    @onEdit="changeToUpdate(slotProps.data.id)"
                    @onDelete="changeToDelete(slotProps.data.id)"
                  />
                </template>
              </Column>
            </template>
          </default-grid>
        </div>
      </div>
    </div>
  </page-content>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import router from '@/router'

import Column from 'primevue/column'

import PageContent from '@/components/page/PageContent.vue'

import DefaultGrid from '@/components/listing/DefaultGrid.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import UserClient from '@/clients/administration/user.client'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'

const loading = ref(false)

const { handleError } = useHttpErrorHandler()

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const userClient = new UserClient()

async function applyFilter() {
  try {
    loading.value = true
    const response = await userClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
  } catch (error) {
    handleError(error.response)
  } finally {
    loading.value = false
  }
}

function onPageChange(event) {
  pageRequest.size = event.pageSize
  pageRequest.current = event.currentPage
  applyFilter()
}

function onTableSorted(event) {
  pageRequest.sortField = event.sortField
  pageRequest.direction = event.direction
  applyFilter()
}

function changeToUpdate(id) {
  router.push({
    name: 'users.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'users.delete',
    params: { id: id },
  })
}

function changeToDetail(event) {
  const { id } = event.data
  router.push({
    name: 'users.detail',
    params: { id: id },
  })
}

function changeToAdd() {
  router.push({ name: 'users.create' })
}

onMounted(() => {
  applyFilter()
})
</script>
