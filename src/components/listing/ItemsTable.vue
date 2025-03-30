<script setup>
import { useI18n } from 'vue-i18n'

import StatusBadge from '@/components/listing/StatusBadge.vue'

const translation = useI18n()

const emit = defineEmits(['pageChanged', 'rowSelected', 'tableSorted'])

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
    default: false,
  },
  showStatus: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  totalElements: {
    type: Number,
    required: true,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 15,
  },
})

function translatePageReport() {
  return (
    '{first}' +
    translation.t('items-table.footer.until') +
    '{last}' +
    translation.t('items-table.footer.total') +
    '{totalRecords}'
  )
}

function fireTableSorted({ order, field }) {
  emit('tableSorted', {
    sortField: field == null ? 'createdOn' : field,
    sortOrder: order == null || order > 0 ? 'asc' : 'desc',
  })
}
</script>

<template>
  <DataTable
    :lazy="true"
    dataKey="id"
    rowHover
    paginator
    autoLayout
    :value="props.data"
    removableSort
    selectionMode="single"
    :rows="props.pageSize"
    :loading="props.loading"
    @sort="fireTableSorted({ field: $event.sortField, order: $event.sortOrder })"
    :rowsPerPageOptions="[15, 30, 60]"
    :totalRecords="props.totalElements"
    :currentPageReportTemplate="translatePageReport()"
    @row-select="$emit('rowSelected', $event)"
    @page="$emit('pageChanged', { currentPage: $event.page, pageSize: $event.rows })"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
  >
    <template #empty>
      {{ $t('items-table.state.empty') }}
    </template>
    <template #loading>
      {{ $t('items-table.state.loading') }}
    </template>

    <Column
      field="active"
      :sortable="true"
      v-if="props.showStatus"
      headerStyle="width: 10%"
      :header="$t('items-table.columns.status')"
    >
      <template #body="slotProps">
        <status-badge :active="slotProps.data.active" />
      </template>
    </Column>

    <slot name="columns" />
  </DataTable>
</template>
