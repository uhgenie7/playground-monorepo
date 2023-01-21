import { useDeferredValue } from 'react';

function ProductList({ products }) {
  const def = useDeferredValue(products);

  return (
    <ul>
      {def.map((product) => (
        <li>{product}</li>
      ))}
    </ul>
  );
}

export default ProductList;
