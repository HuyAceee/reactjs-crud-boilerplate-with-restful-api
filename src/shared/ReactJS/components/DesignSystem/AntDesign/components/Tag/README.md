# Overview

The Tag component extends the functionality of the Ant Design Tag component by providing additional customization options and support for stricter type safety.

# Props

| Prop      | Type      | Default | Description                           |
| --------- | --------- | ------- | ------------------------------------- |
| children  | ReactNode | -       | The content of the tag.               |
| className | string    | -       | Custom CSS class for styling the tag. |
| color     | string    | -       | Color of the tag.                     |
| bordered  | boolean   | true    | Whether the tag has a border.         |
| icon      | ReactNode | -       | Icon to be displayed in the tag.      |

# Usage

```jsx
import { Tag } from "path/to/Tag";

// Example usage
<Tag color="blue" bordered={false} icon={<UserOutlined />}>
  Blue Tag
</Tag>;
```
