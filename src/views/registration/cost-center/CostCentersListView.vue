<template>
  <page-content pre-title="cost-center.header.pre-title" title="cost-center.header.title">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
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
            <Column field="active" headerStyle="width: 10%" header="Status" :sortable="true">
              <template #body="slotProps">
                <status-badge :active="slotProps.data.active"></status-badge>
              </template>
            </Column>
            <Column field="description" header="Descrição" :sortable="true" />
            <Column header="Actions" headerStyle="width: 12%">
              <template #body="slotProps">
                <action-buttons
                  @edit-action="changeToEdit(slotProps.data.id)"
                  @delete-action="changeToDelete(slotProps.data.id)" />
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
import PageContent from '@/components/home/PageContent.vue'
import ActionButtons from '@/components/grid/ActionButtons.vue'
import StatusBadge from '@/components/grid/StatusBadge.vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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
</script>
