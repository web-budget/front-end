<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import MovementClassClient from '@/http/registration/movement-class.client'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'

const router = useRouter()

const loading = ref(false)

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const costCenterClient = new MovementClassClient()

function changeToAdd() {
  router.push({ name: 'movement-classes.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'movement-classes.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'movement-classes.delete',
    params: { id: id },
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'movement-classes.detail',
    params: { id: data.id },
  })
}

async function applyFilters() {
  try {
    loading.value = true
    const response = await costCenterClient.findAll(pageRequest)
    PageResponse.applyValues(response.data, pageResponse)
  } catch (error) {
    console.log(error) // FIXME
  } finally {
    loading.value = false
  }
}

function onPageChange(event) {
  pageRequest.size = event.pageSize
  pageRequest.current = event.currentPage
  applyFilters()
}

function onTableSorted(event) {
  pageRequest.sortField = event.sortField
  pageRequest.direction = event.sortOrder
  applyFilters()
}

onMounted(() => {
  applyFilters()
})
</script>

<template>
  <div class="card">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <search-controls
        @onNew="changeToAdd()"
        @onFilterChange="applyFilters()"
        @onFilterReset="applyFilters()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filter"
        :placeholder="$t('movement-classes.search.placeholder')"
      />
    </div>
    <items-table
      :loading="loading"
      :data="pageResponse.content"
      @pageChanged="onPageChange($event)"
      @tableSorted="onTableSorted($event)"
      @rowSelected="changeToDetail($event)"
      :totalElements="pageResponse.totalElements"
    >
      <template #columns>
        <Column field="name" :header="$t('movement-classes.items-table.name')" :sortable="true" />
        <Column
          :sortable="true"
          field="costCenter.name"
          :header="$t('movement-classes.items-table.cost-center')"
        />
        <Column field="type" :header="$t('cards.items-table.type')" :sortable="true">
          <template #body="slotProps">
            {{ $t(`movement-classes.types.${slotProps.data.type.toLowerCase()}`) }}
          </template>
        </Column>
        <Column headerStyle="width: 12%" :header="$t('items-table.columns.actions')">
          <template #body="slotProps">
            <action-buttons
              @onEdit="changeToUpdate(slotProps.data.id)"
              @onDelete="changeToDelete(slotProps.data.id)"
            />
          </template>
        </Column>
      </template>
    </items-table>
  </div>
</template>
