<template>
  <c-table-container :maxW="{ base: '300px', lg: 'unset' }">
    <c-table variant="striped" colorScheme="teal">
      <c-table-caption>Imperial to metric conversion factors</c-table-caption>
      <c-thead>
        <c-tr>
          <c-th aria-hidden />
          <c-th>To Convert</c-th>
          <c-th>into</c-th>
          <c-th>multiply by</c-th>
        </c-tr>
      </c-thead>
      <c-tbody>
        <c-tr>
          <c-th rowSpan="4">Length</c-th>
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
        <c-tr>
          <c-td>miles</c-td>
          <c-td>kilometres (km)</c-td>
          <c-td isNumeric>1.61</c-td>
        </c-tr>
        <c-tr>
          <c-th rowSpan="4">Area</c-th>
          <c-td>square inches</c-td>
          <c-td>sq. millimeters (mm²)</c-td>
          <c-td isNumeric>645</c-td>
        </c-tr>
        <c-tr>
          <c-td>square feet</c-td>
          <c-td>sq. metres (m²)</c-td>
          <c-td isNumeric>0.0929</c-td>
        </c-tr>
        <c-tr>
          <c-td>square yards</c-td>
          <c-td>sq. metres (m²)</c-td>
          <c-td isNumeric>.0836</c-td>
        </c-tr>
        <c-tr>
          <c-td>acres</c-td>
          <c-td>hectares</c-td>
          <c-td isNumeric>2.47</c-td>
        </c-tr>
        <c-tr>
          <c-th rowSpan="4">Volume</c-th>
          <c-td>cubic inches</c-td>
          <c-td>millilitres (ml)</c-td>
          <c-td isNumeric>25.4</c-td>
        </c-tr>
        <c-tr>
          <c-td>cubic feet</c-td>
          <c-td>litres</c-td>
          <c-td isNumeric>28.3</c-td>
        </c-tr>
        <c-tr>
          <c-td>imperial gallons</c-td>
          <c-td>litres</c-td>
          <c-td isNumeric>4.55</c-td>
        </c-tr>
        <c-tr>
          <c-td> <abbr>US</abbr> barrels </c-td>
          <c-td>cubic metres (m³)</c-td>
          <c-td isNumeric>0.159</c-td>
        </c-tr>
      </c-tbody>
      <c-tfoot>
        <c-tr>
          <c-th aria-hidden />
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
