import { type RenderOptions, render } from "@testing-library/react"
import { setupStore, type AppStore, type RootState } from "../app/store"
import React, { type PropsWithChildren } from "react"
import { Provider } from "react-redux"

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: RootState
  store?: AppStore
}

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{ children }</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions})}
}