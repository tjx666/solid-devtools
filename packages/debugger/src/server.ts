import type * as API from './index'
import { NodeType } from './main/constants'
import type { Solid } from './main/types'

export * from './types'

export const Debugger: typeof API.Debugger = props => props.children

export const attachDebugger: typeof API.attachDebugger = () => void 0

export const useDebugger: typeof API.useDebugger = () =>
  new Proxy(
    {},
    {
      get() {
        throw new Error('Debugger is not available in production/server environment.')
      },
    },
  ) as any

export const enableRootsAutoattach: typeof API.enableRootsAutoattach = () => void 0
export const useLocator: typeof API.useLocator = () => void 0
export const unobserveAllRoots: typeof API.unobserveAllRoots = () => void 0

// update
export const makeSolidUpdateListener: typeof API.makeSolidUpdateListener = () => () => void 0
export const interceptComputationRerun: typeof API.interceptComputationRerun = () => void 0
export const observeValueUpdate: typeof API.observeValueUpdate = () => void 0
export const makeValueUpdateListener: typeof API.makeValueUpdateListener = () => void 0
export const removeValueUpdateObserver: typeof API.removeValueUpdateObserver = () => void 0

// locator
export const markComponentLoc: typeof API.markComponentLoc = () => void 0

// utils
export const getOwner: typeof API.getOwner = () => null
export const getOwnerType: typeof API.getOwnerType = () => NodeType.Computation
export const getNodeType: typeof API.getNodeType = () => NodeType.Computation
export const getNodeName: typeof API.getNodeName = () => '(unnamed)'
export const isSolidComputation: typeof API.isSolidComputation = (o): o is Solid.Computation =>
  false
export const isSolidMemo: typeof API.isSolidMemo = (o): o is Solid.Memo => false
export const isSolidOwner: typeof API.isSolidOwner = (o): o is Solid.Owner => false
export const isSolidRoot: typeof API.isSolidRoot = (o): o is Solid.Root => false
export const isSolidStore: typeof API.isSolidStore = (o): o is Solid.Store => false
export const onOwnerCleanup: typeof API.onOwnerCleanup = () => () => void 0
export const onParentCleanup: typeof API.onParentCleanup = () => () => void 0
export const getFunctionSources: typeof API.getFunctionSources = () => []
export const createInternalRoot: typeof API.createInternalRoot = fn => fn(() => {})
export const lookupOwner: typeof API.lookupOwner = () => null
