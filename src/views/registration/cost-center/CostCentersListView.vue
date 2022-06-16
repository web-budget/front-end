<template>
  <page-content pre-title="cost-center.header.pre-title" title="cost-center.header.title">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <search-controls
            @onFilter="applyFilter()"
            v-model:filter="searchQuery.filter"
            v-model:status="searchQuery.status"
            :placeholder="$t('cost-center.search.filters')"/>
        </div>
        <div class="card-body border-bottom p-0">
          <DataTable
            :value="data"
            dataKey="id"
            sortMode="multiple"
            stateStorage="session"
            responsiveLayout="scroll"
            stateKey="dt-state-session"
            class="table card-table table-vcenter text-nowrap datatable">
            <Column field="active" headerStyle="width: 10%" :header="$t('grid.columns.status')" :sortable="true">
              <template #body="slotProps">
                <status-badge :active="slotProps.data.active" />
              </template>
            </Column>
            <Column field="description" :header="$t('cost-center.grid.description')" :sortable="true" />
            <Column headerStyle="width: 12%" :header="$t('grid.columns.actions')">
              <template #body="slotProps">
                <action-buttons
                  @onEdit="changeToEdit(slotProps.data.id)"
                  @onDelete="changeToDelete(slotProps.data.id)" />
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="card-footer border-0">

        </div>
      </div>
    </div>
  </page-content>
</template>

<script setup>
import { reactive } from 'vue'

import PageContent from '@/components/home/PageContent.vue'
import ActionButtons from '@/components/grid/ActionButtons.vue'
import StatusBadge from '@/components/grid/StatusBadge.vue'
import SearchControls from '@/components/base/SearchControls.vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const searchQuery = reactive({
  status: 'ACTIVE',
  filter: ''
})

const data = [
  {
    id: 1,
    description: 'Alimentação',
    active: true
  },
  {
    id: 2,
    description: 'Educação',
    active: true
  },
  {
    id: 3,
    description: 'Lazer',
    active: true
  },
  {
    id: 4,
    description: 'Carro',
    active: false
  },
  {
    id: 5,
    description: 'Casa',
    active: true
  }
]

function changeToEdit(id) {
  console.log(id)
}

function changeToDelete(id) {
  console.log(id)
}

function applyFilter() {
  console.log(searchQuery)
}
</script>
