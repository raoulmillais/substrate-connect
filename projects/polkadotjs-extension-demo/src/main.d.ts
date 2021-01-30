declare module '*.vue' {
  import Vue, { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>

  export default Component
}
