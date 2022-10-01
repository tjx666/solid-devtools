import { Component, Show } from "solid-js"
import { Entries } from "@solid-primitives/keyed"
import { NodeType } from "@solid-devtools/shared/graph"
import { SignalContextProvider, Scrollable, Signals, ValueNode, Badge } from "@/ui"
import inspector, { Inspector } from "../state/inspector"
import * as styles from "./inspector.css"

const DetailsContent: Component<{ details: Inspector.Details }> = ({ details }) => {
  const { name, id, type, signals, props: componentProps, value: nodeValue } = details
  return (
    <div class={styles.root}>
      <header class={styles.header}>
        <h1 class={styles.h1}>
          {name} <span class={styles.id}>#{id}</span>
        </h1>
        <div class={styles.type}>{NodeType[type]}</div>
      </header>
      <div class={styles.content}>
        {componentProps && (
          <div>
            <h2 class={styles.h2}>Props {componentProps.proxy && <Badge>PROXY</Badge>}</h2>
            <Entries of={componentProps.record}>
              {(name, value) => (
                <ValueNode
                  name={name}
                  value={value().value}
                  selected={value().selected}
                  onClick={() => inspector.togglePropSelection(name)}
                  onElementHover={inspector.toggleHoveredElement}
                />
              )}
            </Entries>
          </div>
        )}
        <div>
          <h2 class={styles.h2}>Signals</h2>
          <SignalContextProvider
            value={{
              isUpdated: inspector.isUpdated,
              toggleSignalFocus: inspector.toggleSignalSelection,
              toggleHoveredElement: inspector.toggleHoveredElement,
            }}
          >
            <Signals each={Object.values(signals)} />
          </SignalContextProvider>
        </div>
        {nodeValue && (
          <div>
            <ValueNode
              name="Value"
              nameIsTitle
              value={nodeValue}
              selected={details.valueSelected}
              onClick={() => inspector.toggleValueSelection()}
              onElementHover={inspector.toggleHoveredElement}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Details() {
  return (
    <Show when={inspector.inspectedNode()}>
      <div class={styles.scrollWrapper}>
        <Scrollable>
          <Show when={inspector.details()} keyed>
            {details => <DetailsContent details={details} />}
          </Show>
        </Scrollable>
      </div>
    </Show>
  )
}
