// @ts-check
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import * as tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  /** @see https://github.com/standard/eslint-config-standard/issues/411 */
  ...compat.extends('eslint-config-standard'),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsxA11y.flatConfigs.recommended,
  prettierPluginRecommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
        /** @see https://github.com/vitejs/vite/issues/13747#issuecomment-1636870022 */
        project: ['tsconfig.node.json', 'tsconfig.app.json'],
      },
      globals: { ...globals.browser },
    },
  },
  {
    /** @see https://typescript-eslint.io/packages/typescript-eslint/#flat-config-extends */
    files: ['**/*.{js,mjs,cjs,jsx}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    plugins: {
      'react': reactPlugin,
      /** @see https://github.com/facebook/react/issues/28313 */
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      /** @see https://github.com/TanStack/query/issues/7544 */
      '@tanstack/query': tanstackQueryPlugin,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'import-plugin': importPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tanstackQueryPlugin.configs?.recommended.rules,
      'prettier/prettier': 'warn',
      'react-refresh/only-export-components': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'camelcase': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports: Place imports with side effects first.
            ['^\\u0000'],
            // Node.js built-in modules.
            ['^(assert|buffer|child_process|crypto|dns|events|fs|http|https|net|os|path|querystring|stream|tls|url|util|zlib)(/|$)'],
            // Packages: react related packages come first, then other packages.
            ['^react', '^@?\\w'],
            // Aliased imports: Project path aliases.
            ['^@/types', '^@/constants'],
            ['^@/libs', '^@/utils'],
            ['^@/stores', '^@/hooks'],
            ['^@/components'],
            // Relative imports: Imports from the same folder first, then parent folders.
            ['^\\./', '^\\.\\./'],
            // Static asset imports: SVG files, JSON files.
            ['^.+\\.svg$', '^.+\\.json$'],
            // Style imports: SCSS and CSS files.
            ['^.+\\.scss$', '^.+\\.css$'],
          ],
        },
      ],
      // export를 정렬하여 가독성을 높입니다.
      'simple-import-sort/exports': 'error',

      // import 문을 문서의 상단에 위치시켜 코드 구조를 일관되게 유지합니다.
      'import/first': 'error',

      // import 문 다음에 빈 줄을 삽입하여 코드의 가독성을 높입니다.
      'import/newline-after-import': 'error',

      // 중복된 import를 허용하지 않습니다.
      'import/no-duplicates': 'error',

      // import할 때 js/jsx/ts/tsx 파일에는 확장자를 붙이지 않고, json 파일에는 항상 확장자를 붙이도록 합니다.
      'import/extensions': [
        'error',
        {
          ignorePackages: true,
          pattern: {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            json: 'always',
          },
        },
      ],

      // import 플러그인으로도 정렬을 강제할 수 있지만, order group 지정을 더 간편하게 할 수 있는 simple-import-sort 플러그인을 대신 사용합니다.
      'import/order': 'off',

      // 한 파일에 여러 개의 export가 늘어날 가능성을 고려하여 default export를 사용하지 않습니다.
      // 이는 명명된 export를 사용하여 모듈의 재사용성을 높이고, 코드의 가독성을 향상시킵니다.
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',

      // Type 만 사용하는 경우 import 문에 type을 명시적으로 붙여줍니다.
      '@typescript-eslint/consistent-type-imports': 'error',

      // 함수의 return type은 명시적으로 적는 대신 타입 추론을 이용합니다.
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Promise 는 async/await 또는 then/catch 로 처리되야 합니다.
      '@typescript-eslint/no-floating-promises': 'off',

      //
      '@typescript-eslint/no-unsafe-return': 'off',

      // 인터페이스를 강제화하지 않음.
      '@typescript-eslint/consistent-type-definitions': 'off',

      // void 연산자를 사용하지 않습니다.
      'no-void': [
        'error',
        {
          allowAsStatement: true,
        },
      ],

      // typescript Enum 을 사용할 때 eslint에서는 에러가 나는 걸 방지합니다.
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      // type이 잘못 추론됐을 때 쉽게 개발할 수 있도록 no-null-assertion(!)을 허용합니다.
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/camelcase': 'off',

      // 인터페이스, 타입 이름은 무조건 PascalCase로 작성되도록 합니다.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: null,
        },
      ],

      // 'as'를 사용한 타입 단언이 발생할 때마다 경고를 발생시키며, 객체 리터럴에 대해서는 타입 단언을 허용하지 않습니다.
      '@typescript-eslint/consistent-type-assertions': 'off',
      // '@typescript-eslint/consistent-type-assertions': [
      //   'warn',
      //   {
      //     assertionStyle: 'as',
      //     objectLiteralTypeAssertions: 'never',
      //   },
      // ],

      // 안전하지 않은 함수 호출에 대해 ESLint가 경고하지 않도록 비활성화합니다.
      '@typescript-eslint/no-unsafe-call': 'off',

      '@typescript-eslint/no-unsafe-member-access': 'off',

      // 비상호작용 엘리먼트에 상호작용 역할을 할당하는 것을 허용합니다.
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',

      // click 이벤트에 key 이벤트가 없을 때 허용합니다.
      'jsx-a11y/click-events-have-key-events': 'off',

      // 비상호작용 엘리먼트에서 상호작용을 허용합니다.
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // devDependencies 사용을 허용합니다.
      'no-extraneous-dependencies': 'off',

      // div에 onClick 이벤트 사용을 허용합니다.
      'jsx-a11y/no-static-element-interactions': 'off',

      // console.log(), console.warn(), console.error()를 사용할 때 경고를 표시합니다.
      'no-console': 'warn',

      // 가능한 경우 dot notation을 사용하도록 경고를 표시합니다.
      'dot-notation': 'warn',

      // 사용하지 않는 변수에 대해 경고를 표시합니다.
      'no-unused-vars': 'warn',

      '@typescript-eslint/no-explicit-any': 'off',

      // 3항연산자 중첩 허용: 적절하게 쓰면 가독성을 해치지 않기 때문입니다.
      'no-nested-ternary': 'off',

      // 무조건 typescript를 쓸 것을 가정하고 있기 때문에 defaultProps 정의할 필요 없음
      'react/require-default-props': 'off',

      // props spreading 허용합니다. 이는 재사용성 높은 컴포넌트를 만들 때 유용합니다.
      'react/jsx-props-no-spreading': 'off',

      // 리액트 컴포넌트 파일을 만들 때 .jsx 나 .tsx 확장자를 사용해야만 합니다.
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],

      // label 태그는 관련 control 태그를 감싸고 있어야 합니다. (assert: 'both'를 'either'로 변경하여 유연성을 높입니다)
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          labelComponents: [],
          labelAttributes: [],
          controlComponents: [],
          assert: 'either',
          depth: 25,
        },
      ],

      // React 컴포넌트는 function 키워드를 사용하는 named function으로 선언합니다.
      // 콜백이나 함수의 반환 값으로 사용되는 unnamed component는 arrow function으로 작성합니다.
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],

      // 함수의 인자나 콜백으로 사용되는 컴포넌트를 named function으로 작성하기 위해 예외를 허용합니다. (e.g. React.forwardRef)
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

      // React 17 이상에서는 JSX를 사용할 때 React를 명시적으로 import할 필요가 없습니다.
      'react/react-in-jsx-scope': 'off',

      // React 컴포넌트 내에서 state와 props에 구조분해 할당을 사용하도록 경고합니다.
      'react/destructuring-assignment': 'warn',

      // React 컴포넌트 이름은 PascalCase로 작성하도록 강제합니다.
      'react/jsx-pascal-case': 'error',

      // 사용되지 않는 state가 있을 경우 경고를 표시합니다.
      'react/no-unused-state': 'warn',

      // 반복문으로 생성하는 요소에는 key 속성을 반드시 포함해야 합니다.
      'react/jsx-key': 'warn',

      // 가능한 경우 셀프 클로징 태그를 사용하도록 경고합니다.
      'react/self-closing-comp': 'warn',

      // 배열의 인덱스를 key로 사용하는 것을 허용합니다.
      'react/no-array-index-key': 'off',

      // React Hook 규칙을 비활성화합니다.
      'react-hooks/rules-of-hooks': 'off',
    },
  },
);
