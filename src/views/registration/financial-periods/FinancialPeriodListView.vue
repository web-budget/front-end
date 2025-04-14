<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import FinancialPeriodClient from '@/services/registration/financial-period.client'

import PageRequest from '@/models/page-request'
import PageResponse from '@/models/page-response'

import ItemsTable from '@/components/listing/ItemsTable.vue'
import ActionButtons from '@/components/listing/ActionButtons.vue'
import DateTimeDisplay from '@/components/common/DateTimeDisplay.vue'
import SearchControls from '@/components/listing/SearchControls.vue'

const statusOptions = [
  { label: 'financial-periods.options.all', value: 'ALL' },
  { label: 'financial-periods.options.accounted', value: 'ACCOUNTED' },
  { label: 'financial-periods.options.open', value: 'OPEN' },
]

const router = useRouter()

const loading = ref(false)

const pageRequest = reactive(new PageRequest('', 'OPEN', 0, 15, 'asc', 'createdOn'))
const pageResponse = reactive(new PageResponse())

const financialPeriodClient = new FinancialPeriodClient()

function changeToAdd() {
  router.push({ name: 'financial-periods.create' })
}

function changeToUpdate(id) {
  router.push({
    name: 'financial-periods.update',
    params: { id: id },
  })
}

function changeToDelete(id) {
  router.push({
    name: 'financial-periods.delete',
    params: { id: id },
  })
}

function changeToDetail({ data }) {
  router.push({
    name: 'financial-periods.detail',
    params: { id: data.id },
  })
}

async function applyFilters() {
  try {
    loading.value = true
    const response = await financialPeriodClient.findAll(pageRequest)
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
        status-initial-value="OPEN"
        :status-options="statusOptions"
        @onFilterChange="applyFilters()"
        @onFilterReset="applyFilters()"
        v-model:status="pageRequest.status"
        v-model:filter="pageRequest.filter"
        :placeholder="$t('financial-periods.search.placeholder')"
      />
    </div>
    <items-table
      :loading="loading"
      :show-status="false"
      :data="pageResponse.content"
      @pageChanged="onPageChange($event)"
      @tableSorted="onTableSorted($event)"
      @rowSelected="changeToDetail($event)"
      :totalElements="pageResponse.totalElements"
    >
      <template #columns>
        <Column
          :sortable="true"
          headerStyle="width: 13%"
          :header="$t('financial-periods.items-table.status')"
        >
          <template #body="slotProps">
            <Tag
              v-if="slotProps.data.status === 'ACTIVE'"
              :value="$t('financial-periods.status.active')"
              severity="success"
            />
            <Tag
              v-if="slotProps.data.status === 'ENDED'"
              :value="$t('financial-periods.status.ended')"
              severity="warn"
            />
            <Tag
              v-if="slotProps.data.status === 'ACCOUNTED'"
              :value="$t('financial-periods.status.accounted')"
              severity="danger"
            />
          </template>
        </Column>
        <Column field="name" :header="$t('financial-periods.items-table.name')" :sortable="true" />
        <Column headerStyle="width: 15%" :header="$t('financial-periods.items-table.starting-at')">
          <template #body="slotProps">
            <date-time-display :fix-time="true" :value="slotProps.data.startingAt" />
          </template>
        </Column>
        <Column headerStyle="width: 15%" :header="$t('financial-periods.items-table.ending-at')">
          <template #body="slotProps">
            <date-time-display :fix-time="true" :value="slotProps.data.endingAt" />
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
