<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import CostCenterClient from '@/http/registration/cost-center.client'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import SearchControls from '@/components/listing/SearchControls.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'
import CurrencyValue from '@/components/common/CurrencyValue.vue'

const router = useRouter()

const loading = ref(false)

const pageRequest = reactive(new PageRequest())
const pageResponse = reactive(new PageResponse())

const costCenterClient = new CostCenterClient()

function changeToAdd() {
  router.push({ name: 'cost-centers.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'cost-centers.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'cost-centers.delete',
    params: { id: id },
  })
}

function changeToDetail(event) {
  const { id } = event.data
  router.push({
    name: 'cost-centers.detail',
    params: { id: id },
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
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filter"
        :placeholder="$t('cost-centers.search.placeholder')"
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
        <Column field="name" :header="$t('cost-centers.items-table.name')" :sortable="true" />
        <Column headerStyle="width: 15%" :header="$t('cost-centers.items-table.income-budget')">
          <template #body="slotProps">
            <currency-value :value="slotProps.data.incomeBudget"/>
          </template>
        </Column>
        <Column headerStyle="width: 15%" :header="$t('cost-centers.items-table.expense-budget')">
          <template #body="slotProps">
            <currency-value :value="slotProps.data.expenseBudget"/>
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
