# Overview

Custom React hook to handle deferred loading and fetching of data. This hook is useful in cases where data is loaded in stages or fetched on-demand, and it provides a mechanism to manage this data and any associated errors.

# Options

| Option     | Type                                         | Description                                                                |
| ---------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| loaderData | `T extends ReturnType<typeof useLoaderData>` | The initial data loaded by the loader function, typically used during SSR. |

# Usage

```jsx
import { useDeferData } from "...";

export default function DeferredDataComponent() {
  const loaderData = useLoaderData(); // Example of obtaining loader data

  const { data, fetcherData, isError } = useDeferData({
    loaderData,
  });

  return <div>{isError ? <p>Error loading data.</p> : <ul>{data ? data.items.map((item) => <li key={item.id}>{item.name}</li>) : <p>Loading...</p>}</ul>}</div>;
}
```
