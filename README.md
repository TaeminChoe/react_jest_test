# Jest

-   코드가 의도대로 잘 동작하는지 확인하는 test case를 만드는 testing framework
-   TDD(Test Driven Develop)방식으로 개발할 때 유용함
-   **CRA(Create React App)을 통해 앱 생성시, 기존에 설치되어 있기 때문에 진행하지 않는다.**

## Jest global functions

-   beforeEach(fn) : 모든 테스트의 시작 전에 fn을 실행
-   describe(name, fn) : 테스트 블록 형성
-   describe.skip(name, fn) : 테스트 블록에 속한 모든 테스트 검사하지 않고 넘어감.
-   test(name, fn, timeout) : 테스트 항목 만들기 fn은 나중에 실행
-   it(name, fn, timeout) : test와 동일
-   test.skip(name, fn) : 테스트 항목 건너뛰기
-   it.skip(name, fn) : test.skip과 동일
-   xtest(name, fn) : it.skip과 동일
-   xit(name, fn) : it.skip과 동일

### Jest matchers

다음 함수들은 js에서 다음과 같은 기능을 얘기한다.

-   toBeNull() : ===
-   toEquals : \_.isEqual
-   toBeNull : === null
-   toBeUndefined : === undefined
-   toBeDefined : !== undefined
-   toContain : Array.prototype.includes(result)
-   ...

참조 : [https://velog.io/@jonghunbok/웹개발-TDD-입문-Jest의-Matchers-정리](https://velog.io/@jonghunbok/%EC%9B%B9%EA%B0%9C%EB%B0%9C-TDD-%EC%9E%85%EB%AC%B8-Jest%EC%9D%98-Matchers-%EC%A0%95%EB%A6%AC)

---

## Jest module test

### 사용법

-   모듈 코드를 작성한다.
    ```jsx
    // calculate.js

    function add(a, b) {
    	return a + b;
    }

    module.exports = {
    	add,
    };
    ```
-   test용 js파일을 생성한다.
    -   생성할 파일의 형식을 지켜야 한다. ⇒ [filename].test.js
    ```jsx
    // calculate.test.js
    const { add } = require("../modules/caculate");

    describe("calculate 모듈의 테스트", () => {
    	test("1 + 2 = 3", () => {
    		expect(add(1, 2)).toBe(3);
    		//expect(function()).matcher(result);
    	});
    });
    ```
    -   require : 외부 모듈을 불러오는 방법
    -   expect(function()).matcher(result);
        -   function() : 테스트할 함수와 입력 인자를 넣는다.
        -   matcher : 적합한 matcher을 선택해 사용한다.
        -   result : function()을 거쳐 나올 결과값을 입력한다.
-   terminal 에 다음 명령어 입력
    `npm test`
    ![image](https://user-images.githubusercontent.com/92558961/148911988-05a5a20e-2377-4a14-be6d-06f496f67a97.png)

---

## Jest mocked test

-   API를 활용하는 fetch등의 hook함수 테스팅 기법
-   API를 호출하기 어려운 상황(네트워크 문제, API호출 횟수)에 적합
-   실제 API를 모형화하여 실제 개발 환경과 격리시킬 수 있음
-   해당 API가 어떤 값을 반환하는지 먼저 파악해 두어야 함

### hook 함수

```jsx
// getData.js

function getData(url) {
	fetch(url)
		.then(res => res.json())
		.then(data => data);
}
```

파악한 API 반환 값

```jsx
// GET https://jsonplaceholder.typicode.com/todos/1
{
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
}

// GET https://jsonplaceholder.typicode.com/todos/2
{
  userId: 1,
  id: 2,
  title: "quis ut nam facilis et officia qui",
  completed: false,
}
```

테스트 작성(getData.test.js)

![image](https://user-images.githubusercontent.com/92558961/148912029-3c11d682-eaf4-4410-86c4-2f9b3bcd753b.png)

-   1: 미리 파악된 API의 결과값
-   19: mockedGetData : 미리 파악된 API값을 반환하는 테스트용 함수 생성
-   20: data : 테스트용 함수 호출
-   22: expect : data 검증

## ![image](https://user-images.githubusercontent.com/92558961/148912054-cfda5904-5f34-4127-9a18-39cb2795a845.png)

## Jest component test

### testing-library/react

-   컴포넌트가 제대로 렌더링 되는지 테스팅할 수 있는 테스팅 라이브러리
-   CRA(Create react app)환경에서는 설치가 되어있다.
-   API를 통해 html의 모든 값을 얻어 test할 수 있다.
    -   참조 : [https://testing-library.com/docs/dom-testing-library/cheatsheet/](https://testing-library.com/docs/dom-testing-library/cheatsheet/)

### 사용법

-   컴포넌트 작성
    -   name props를 받아 name이 적힌 button컴포넌트
    ![image](https://user-images.githubusercontent.com/92558961/148912087-8810ffac-6938-4da5-87ab-aa15e9094d81.png)
-   테스트 코드 작성
    ![image](https://user-images.githubusercontent.com/92558961/148912166-cb31aef0-9cc6-43ad-b445-8a6e8bed7cc8.png)
    -   2: Button 컴포넌트 import
    -   6: render() : 테스트하고자 하는 컴포넌트를 작성
    -   7: linkElement : “test”값을 가지고 있는 element를 가져온다.
        -   위 경우는 button을 얻을 수 있음
    -   button element가 Dom안에 존재하는지 검증
-   테스트

![image](https://user-images.githubusercontent.com/92558961/148912206-edc48b21-2cfe-4f59-92a2-5253ea57c7e6.png)

## Jest 실습 프로젝트 - Counting app

-   간단한 counting 앱을 작성하여 테스트 해보는 앱
-   Event를 테스트 해보기 위해 패키지 설치
    `npm install -D @testing-library/user-evevnt`
-   프로젝트 파일 구조

![image](https://user-images.githubusercontent.com/92558961/148912239-d3bd3866-9190-4e7b-b786-94472e8be95e.png)

-   App.js
    ![image](https://user-images.githubusercontent.com/92558961/148912265-154817ce-e922-4a05-9378-244bbf872454.png)
    -   7: Counting 컴포넌트 호출
-   Counting.js
    ![image](https://user-images.githubusercontent.com/92558961/148912291-9dcd7d56-010c-4a24-9005-907f2e006dd3.png)
    -   4: count : 카운트 숫자 state
    -   6: increase : 카운트를 증가시키는 함수
    -   9: decrease : 카운트를 감소시키는 함수
    -   13: count state 와 증가/감소 버튼 렌더링
-   실행결과

![image](https://user-images.githubusercontent.com/92558961/148912315-7cc50f65-5813-4f5c-937a-9881dc4c25f3.png)

-   Counting.test.js
    ![image](https://user-images.githubusercontent.com/92558961/148912342-289f4e67-1bf6-4375-a24f-f67d6a3a5c1d.png)
    -   7: render() : 테스트할 컴포넌트를 렌더링한다.
        -   다른 테스트를 진행할 때마다 render을 해주어야 합니다.(ex 7: 16:)
    -   8: screen.getByText : “+”값을 가진 element를 찾는다.
    -   9: count : “count”를 클래스로 가진 element를 찾는다.
        -   screen의 함수로는 class나 id로 element를 찾을 수 없다.
    -   11: userEvent : “click” 등의 이벤트를 동작시킨다.
    -   12: increase 버튼이 클릭된 count의 값을 검증
-   test가 실패했을 때,
    ![image](https://user-images.githubusercontent.com/92558961/148912376-206f55f5-6b5b-45bd-8db3-f41d779b5242.png)
    -   틀린 경우, 자세한 설명이 나온다.
-   test가 성공했을 때,
    ![image](https://user-images.githubusercontent.com/92558961/148912407-50770d69-ed4d-4b80-ad60-f24f40359375.png)
