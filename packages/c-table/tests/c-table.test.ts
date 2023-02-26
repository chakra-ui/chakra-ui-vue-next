import {
  CTable,
  CTableCaption,
  CThead,
  CTbody,
  CTr,
  CTh,
  CTd,
  CTfoot,
} from "../src"

describe("Table", () => {
  it("should pass a11y test", async () => {
    const renderComponent = () =>
      render({
        components: {
          CTable,
          CTableCaption,
          CThead,
          CTr,
          CTh,
          CTbody,
          CTfoot,
        },
        template: `
      <c-table>
      <c-table-caption>Imperial to metric conversion factors</c-table-caption>
      <c-thead>
        <c-tr>
          <c-th>To convert</c-th>
          <c-th>into</c-th>
          <c-th isNumeric>multiply by</c-th>
        </c-tr>
      </c-thead>
      <c-tbody>
        <c-tr>
          <c-td>inches</c-td>
          <c-td>millimetres (mm)</c-td>
          <c-td isNumeric>25.4</c-td>
        </c-tr>
      </c-tbody>
      <c-tfoot>
        <c-tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </c-tr>
      </c-tfoot>
    </c-table>
      `,
      })

    await testA11y(renderComponent())
  })
})
