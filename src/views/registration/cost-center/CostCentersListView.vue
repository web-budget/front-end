<template>
  <page-content title="cost-center.title" action="pages.actions.listing">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <search-controls
            @onAdd="changeToAdd()"
            @onStatusChange="applyFilter()"
            v-model:filter="pageRequest.filter"
            v-model:status="pageRequest.status"
            :placeholder="$t('cost-center.search.filters')"/>
        </div>
        <div class="card-body border-bottom p-0">
          <default-grid
            :loading="loading"
            :data="pageResponse.content"
            @page-changed="onPageChange($event)"
            @table-sorted="onTableSorted($event)"
            @row-selected="changeToDetail($event)"
            :total-elements="pageResponse.totalElements">
            <template #columns>
              <Column field="name" :header="$t('cost-center.grid.name')" :sortable="true" />
              <Column headerStyle="width: 12%" :header="$t('grid.columns.actions')">
                <template #body="slotProps">
                  <action-buttons
                    @onEdit="changeToUpdate(slotProps.data.id)"
                    @onDelete="changeToDelete(slotProps.data.id)" />
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
import { reactive, ref, onMounted } from 'vue'

import router from '@/router'

import Column from 'primevue/column'

import PageContent from '@/components/base/PageContent.vue'

import DefaultGrid from '@/components/listing/DefaultGrid.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import CostCenterClient from '@/clients/registration/cost-center.client'

import { useHttpErrorHandler } from '@/composables/useHttpErrorHandler.js'

const loading = ref(false)

const { handleError } = useHttpErrorHandler()

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const costCenterClient = new CostCenterClient()

async function applyFilter() {
  try {
    loading.value = true
    const response = await costCenterClient.findAll(pageRequest)
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
  router.push({ name: 'cost-centers.update', params: { id: id } })
}

function changeToDelete(id) {
  router.push({ name: 'cost-centers.delete', params: { id: id } })
}

function changeToDetail(event) {
  router.push({ name: 'cost-centers.detail', params: { id: event.id } })
}

function changeToAdd() {
  router.push({ name: 'cost-centers.create' })
}

onMounted(() => {
  applyFilter()
})
</script>
