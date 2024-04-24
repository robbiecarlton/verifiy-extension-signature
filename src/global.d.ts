/// <reference types="svelte" />

import { HostDetails } from './resolver'

// The following types (AgentState, UIState and ChaperoneState) is duplicated in web-sdk, so if you change it there, make sure you update web-sdk as well

export type AgentState = {
  id: string
  isAnonymous: boolean
  host: HostDetails
  isAvailable: boolean
  unrecoverableError: any
  email: string
}

export type UIState = {
  isVisible: boolean
  uiMode: UIMode
}

export type UIMode =
  | 'login'
  | 'signup'
  | 'outdated-host-pref'
  | 'no-hosts-anonymous'
  | 'switch-hosts'
  | 'switch-hosts-confirmed'
  | 'switch-hosts-error'
  | 'hidden'

export type ChaperoneState = {
  agentState: AgentState
  uiState: UIState
}

export type HoloKeyManagerConfig = {
	happId: string;
	happName: string;
	happLogo: string;
	happUiUrl: string;
	requireRegistrationCode: boolean;
	requireEmail: boolean;
}

// This type should ultimately be provided by Cryptolib
export type KeyPair = {
  publicKey: () => Uint8Array
  sign: (Uint8Array) => Uint8Array
}
