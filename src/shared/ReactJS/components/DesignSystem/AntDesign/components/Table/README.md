# Overview

The `Table` component extends the functionality of the Ant Design Table component. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Table component.

# Props

| Prop                       | Type                              | Default       | Description                                                                            |
| -------------------------- | --------------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `className`                | `string`                          | -             | Custom CSS class for the table.                                                        |
| `dataSource`               | `Array<RecordType>`               | -             | Data source array for the table.                                                       |
| `expandable`               | `Object`                          | -             | Configuration for expandable rows.                                                     |
| `direction`                | `'ltr' \| 'rtl'`                  | -             | Table layout direction (`ltr` or `rtl`).                                               |
| `indentSize`               | `number`                          | -             | Size of the indent for tree data.                                                      |
| `loading`                  | `boolean`                         | -             | Whether the table is in a loading state.                                               |
| `rowKey`                   | `string \| Function`              | -             | Unique key for each row.                                                               |
| `size`                     | `'small' \| 'middle' \| 'large'`  | -             | Size of the table.                                                                     |
| `currentPage`              | `number`                          | `1`           | The current page number.                                                               |
| `pageSize`                 | `number`                          | -             | The number of items per page.                                                          |
| `totalRecords`             | `number`                          | `0`           | The total number of records in the data source.                                        |
| `plural`                   | `Function`                        | -             | Function to generate a plural label for the total count, based on the visible range.   |
| `singular`                 | `Function`                        | -             | Function to generate a singular label for the total count, based on the visible range. |
| `paginationMode`           | `'sticky' \| 'none'`              | `'sticky'`    | The pagination mode.                                                                   |
| `columns`                  | `Array`                           | `[]`          | An array of columns to be displayed in the table.                                      |
| `nonePagination`           | `boolean`                         | `false`       | Whether to disable pagination entirely.                                                |
| `showSizeChanger`          | `boolean`                         | `false`       | Whether to display a size changer dropdown in the pagination controls.                 |
| `paginationClassName`      | `string`                          | -             | Custom CSS class for the pagination controls.                                          |
| `locale`                   | `Object`                          | -             | Locale settings for the pagination controls.                                           |
| `sizeChangerOptions`       | `Array`                           | `[]`          | Options for the number of items per page in the size changer dropdown.                 |
| `onPaginationChange`       | `Function`                        | -             | Callback function triggered when the page or `pageSize` changes.                       |
| `onSortChange`             | `Function`                        | -             | Callback function triggered when the sort values change.                               |
| `sortIcon`                 | `Function`                        | -             | Function to render a custom sort icon based on the current sort order.                 |
| `sortValues`               | `Object`                          | -             | Current sort values for the columns.                                                   |
| `offsetHeader`             | `number`                          | -             | Offset value for the sticky header, in pixels.                                         |
| `tableHeight`              | `number`                          | -             | Fixed height for the table in pixels, used to make the table scrollable.               |
| `autoIndex`                | `boolean`                         | `false`       | Automatically add row indices as the first column of the table.                        |
| `renderStickyAction`       | `Function`                        | -             | Function to render a custom sticky action element based on the selected rows.          |
| `rowKey`                   | `Function`                        | -             | Function to generate a unique key for each row in the table.                           |
| `checkMode`                | `'autoClear' \| 'keepPagination'` | `'autoClear'` | Mode for handling row selection when paginating.                                       |
| `title`                    | `ReactNode`                       | -             | The title to be displayed above the table.                                             |
| `displayColumnsConfigable` | `Object`                          | -             | Configuration for enabling and customizing the display of columns.                     |

# Usage

```jsx
import { Table } from "path/to/Table";

// Example usage
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

<Table currentPage={1} pageSize={10} totalRecords={100} dataSource={dataSource} columns={columns} onChange={(page, pageSize) => console.log(page, pageSize)} />;
```
