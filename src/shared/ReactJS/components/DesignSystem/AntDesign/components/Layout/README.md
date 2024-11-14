# Overview

This package provides custom React components that extend the functionality of the Ant Design Layout components, offering additional customization and support for stricter type safety.

## Components

- `LayoutHeader`
- `LayoutSider`
- `LayoutContent`
- `LayoutContainer`

# LayoutHeader

The `LayoutHeader` component extends the `AntLayout.Header` component from Ant Design by providing additional customization and support for stricter type safety.

## Props

| Prop      | Type        | Default | Description                                    |
| --------- | ----------- | ------- | ---------------------------------------------- |
| children  | `ReactNode` | -       | The content to be displayed inside the header. |
| className | `string`    | -       | Custom CSS class for styling the header.       |

# LayoutSider

The `LayoutSider` component extends the `AntLayout.Sider` component from Ant Design by providing additional customization and support for stricter type safety.

## Props

| Prop      | Type               | Default | Description                                   |
| --------- | ------------------ | ------- | --------------------------------------------- |
| children  | `ReactNode`        | -       | The content to be displayed inside the sider. |
| className | `string`           | -       | Custom CSS class for styling the sider.       |
| width     | `string \| number` | -       | The width of the sider.                       |
| collapsed | `boolean`          | -       | Whether the sider is collapsed.               |

# LayoutContent

The `LayoutContent` component extends the `AntLayout.Content` component from Ant Design by providing additional customization and support for stricter type safety.

## Props

| Prop      | Type        | Default | Description                                          |
| --------- | ----------- | ------- | ---------------------------------------------------- |
| children  | `ReactNode` | -       | The content to be displayed inside the content area. |
| className | `string`    | -       | Custom CSS class for styling the content area.       |

# LayoutContainer

The `LayoutContainer` component extends the `AntLayout` component from Ant Design by providing additional customization and support for stricter type safety.

## Props

| Prop      | Type        | Default | Description                                       |
| --------- | ----------- | ------- | ------------------------------------------------- |
| children  | `ReactNode` | -       | The content to be displayed inside the container. |
| className | `string`    | -       | Custom CSS class for styling the container.       |
