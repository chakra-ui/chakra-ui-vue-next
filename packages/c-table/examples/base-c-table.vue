<template>
  <c-table-container :maxW="{ base: '300px', lg: 'unset' }">
    <c-table variant="striped" colorScheme="teal">
      <c-table-caption>Imperial to metric conversion factors</c-table-caption>
      <c-thead>
        <c-tr>
          <c-th>To Convert</c-th>
          <c-th>into</c-th>
          <c-th>multiply by</c-th>
        </c-tr>
      </c-thead>
      <c-tbody>
        <c-tr>
          <c-td>inches</c-td>
          <c-td>millimeters (mm)</c-td>
          <c-td isNumeric>25.4</c-td>
        </c-tr>
        <c-tr>
          <c-td>feet</c-td>
          <c-td>centimeters (cm)</c-td>
          <c-td isNumeric>30.48</c-td>
        </c-tr>
        <c-tr>
          <c-td>yards</c-td>
          <c-td>metres (m)</c-td>
          <c-td isNumeric>0.91444</c-td>
        </c-tr>
      </c-tbody>
      <c-tfoot>
        <c-tr>
          <c-th>To convert</c-th>
          <c-th>into</c-th>
          <c-th>multiply by</c-th>
        </c-tr>
      </c-tfoot>
    </c-table>
  </c-table-container>
</template>
<script setup lang="ts">
import {
  CTable,
  CTableContainer,
  CTableCaption,
  CThead,
  CTr,
  CTh,
  CTbody,
  CTd,
  CTfoot,
} from "../index"
</script>
