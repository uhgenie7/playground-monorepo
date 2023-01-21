## data.js

10000개의 Product ${i+1}

## App.js

input의 value 값이 바뀔 때마다 `updateFilterHandler`함수로 `filterTerm`가 update 되고, 이 value를 `filteredProducts`가 함수가 받는다.

`filteredProducts`는 10000개의 Product를 value 문자가 포함된 리스트로 필터한다.

이후, `ProductList 컴포넌트` 리스트가 렌더된다.

## 성능을 조절하여 확인하는 법

개발자도구의 Performance tab 선택, CPU를 `6x slowdown` 으로 변경한다. 그러면 input에 입력을 가할 때마다 'laggy input field'를 느낄 수 있다.

이렇게 하면 입력필드 목록이 업데이트 되길 기다려야 한다.

laggy해진 input에 문자가 바로바로 표시되지 않으면 사용자 경험이 매우 나빠진다.

input을 먼저 업데이트하고 목록이 업데이트 되는 것을 지연시키는 것이 낫다.

## 해결법

react18 이전에는 한번에 10000개의 데이터를 불러오기 보다, 페이지네이션, 서버측에서 필터링 수행, setTimeout 등을 사용하여 사용자 경험을 개선했다.

이젠 react18에서 `startTransition`을 사용하여 일부 상태 업데이트를 지연시켜 사용자에게 더 나은 경험을 제공한다.

이것이 바로 react18의 concurrency이다.

## useTransition

hook을 사용할 수 없는 경우에는 `import {startTransition } from 'react';` 을 사용하면 되지만, 그런 경우가 아니면 이같은 `useTransition`을 쓰자.

```tsx
const [isPending, startTransition] = useTransition();

// isPending: boolean
// startTransition: React.TransitionStartFunction
```

- isPending은 우선 순위가 낮은 일부 상태 업데이트가 여전히 실행 보류 중인 지 알려준다. 이를 활용하여 사용자에게 표시할 수 있다.
- startTransition: 낮은 우선 순위로 처리되어야 하는 경우 startTransition로 상태업데이트를 랩핑할 수 있다.

```tsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState('');

  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    startTransition(() => {
      setFilterTerm(event.target.value);
    });
  }

  return (
    <div id="app">
      <input type="text" onChange={updateFilterHandler} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
```

어떻게 이렇게 개선되는 걸까?

`startTransition`를 씀으로써 사용자 입력 필드에 표시되는 내용의 업데이트가 데이터 목록의 업데이트와 분리되었기 때문이다.

list of Products는 filterTerm이 표시된 제품 목록 변경을 담당하므로 낮은 우선 순위로 처리된다.

따라서 input 필드와 관련된 UI 업데이트는 필터된 UI 업데이트보다 더 높은 우선 순위로 처리된다.

## 유의점

언제나 그렇듯 성능 개선을 위해 마구 남용하지 말라.
모든 상태 업데이트를 `startTransition`로 래핑해선 안 된다.

laggy한 사용자 인터페이스, 구형 디바이스, 서버에서 처리하지 못하는 경우 등 특수한 상황에 놓인 시나리오가 있는 곳에서만 사용해라.

useCase에서는 특히 주의해서 사용해야 한다.

## useDeferredValue

일반적으로 상태 호출을 **제어할 수 없을 때**, 타사 라이브러리 등을 사용할 때 `useTransition`와 같은 기능을 한다.
