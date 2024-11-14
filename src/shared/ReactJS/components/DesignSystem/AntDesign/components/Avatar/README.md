# Overview

The `Avatar` component extends the functionality of the Ant Design Avatar component. It provides additional customization and support for stricter type safety. It ensures that all props are type-checked more rigorously compared to the standard Ant Design Avatar component.

# Props

| Prop      | Type        | Default | Description                                           |
| --------- | ----------- | ------- | ----------------------------------------------------- | ----------------------- |
| className | `string`    | -       | Custom CSS class for styling the avatar.              |
| gap       | `number`    | -       | The gap between the avatar and its text.              |
| icon      | `ReactNode` | -       | The icon to be displayed inside the avatar.           |
| shape     | `string`    | -       | The shape of the avatar, can be 'circle' or 'square'. |
| size      | `number     | string` | -                                                     | The size of the avatar. |
| src       | `string`    | -       | The source of the avatar image.                       |
| srcSet    | `string`    | -       | The source set for the avatar image.                  |

# Usage

```jsx
import { Avatar } from "path-to-Avatar";

// Example usage
<Avatar className="custom-class" gap={4} icon={<YourIcon />} shape="circle" size="large" src="https://example.com/avatar.png" srcSet="https://example.com/avatar@2x.png 2x">
  Username
</Avatar>;
```
