# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]
### Added
- Attempts to reconnect to envoy when websocket closes unexpectedly [(#276)]
- Logout button on host switch screen [(#278)]

### Changed
- Updated resolver code to match api changes here: https://github.com/Holo-Host/resolver/pull/71 [(#280)]

### Fixed
- Prevent spurious 'anonymous_no_working_hosts' error [(#278)]
- Allows host switching back to a host you have previously been hosted on [(#278)]
- Clean up unused EnvoyApi instances, reducing unnecessary network calls and noise in logs [(#267)]
- Only store seed and email once for each agent, removing some strange behavior when manually clearing local storage [(#267)]
- Checks envoy version on connection [(#276)]

([#280]): https://github.com/Holo-Host/envoy-chaperone/pull/280
([#278]): https://github.com/Holo-Host/envoy-chaperone/pull/278
([#276]): https://github.com/Holo-Host/envoy-chaperone/pull/276
([#267]): https://github.com/Holo-Host/envoy-chaperone/pull/267

## [0.2.1]
### Added

### Changed
- Handles a missing `document.referrer` and assigns localhost as default domain

### Fixed
- Don't prematurely present host switching when installing
- Incorrect error messages when providing bad email and password or trying to sign up with an already signed up agent

## [0.2.0] - 2023-10-31

### Changed
- Uses the `host_url` and `host_preferences` (within the `hostDetails` struct) instead of only the `host_url` String from `resolveHosts` to form the connect string with envoy.
- Updates envoy-chaperone connection string to include host happ preference hash
- Adds new preference hash field to SL request body and includes in signature

## [0.1.3] - 2023-10-26

### Changed
- heartbeat interval updated to 15sec
- quick load on signin and signup
- @holochain/client bumped to `v0.16.3``


## [0.1.2] - 2023-09-11
### Added 
- Handling and UI for switching hosts in the event that the active host is unreachable [(#174)]

([#174]): https://github.com/Holo-Host/envoy-chaperone/pull/174

## [0.1.1] - 2023-07-18
### Added 
- Added integration_test_mode config flag [(#172)]
- Added agent email to agent status [(#176)]
- Added sign payload method to agent [(#176)]
- Added agent email to local storage [(#176)]

### Changed
- Chaperone checks for host change and switches to new host if it has changed [(#172)]

([#172]): https://github.com/Holo-Host/envoy-chaperone/pull/172
([#176]): https://github.com/Holo-Host/envoy-chaperone/pull/176

## [0.1.0] - 2023-06-09
### Added
- envoy api version check, with error message for incompatible api version [(#170)]
- emits `chaperone-state` and `ui-state` events. `ui-state` when the form becomes visible or hidden, or changes page, `chaperone-state` when either `agent-state` or `ui-state` is emitted. [(#170)]
- `chaperone_version` field to `handshake` [(#170)]

### Changed
- Switched `AgentState` fields to camel case [(#170)]

([#170]): https://github.com/Holo-Host/envoy-chaperone/pull/170

## [0.0.7-prerelease] - 2023-04-03
### Fixed
- Updated Signal emission and call zome signature to align with holochain client ([#168])

### Changed
- Bumped local WebSdk to v0.6.11-prerelease ([#168])

([#168]): https://github.com/Holo-Host/envoy-chaperone/pull/168

## [0.0.6]

### Added
- Support for creating, enabling and disabling dna clone cells. ([#159])
### Changed
- Now explicitly requests 5 holoports when asking for hosts

([#159]): (https://github.com/Holo-Host/envoy-chaperone/pull/159)

## [0.0.5]
### Changed
- Resolver may return multiple holoports. ([#143](https://github.com/Holo-Host/envoy-chaperone/pull/143))
- Agent now tests if holoport is working before connecting and cycles through multiple holoports looking for one that is working ([#143](https://github.com/Holo-Host/envoy-chaperone/pull/143))
- Chaperone notifies the user when it's looking for holoports and if a working one can't be found ([#143](https://github.com/Holo-Host/envoy-chaperone/pull/143))
- Added HOLOPORT_CONNECT_TIMEOUT environment variable ([#143](https://github.com/Holo-Host/envoy-chaperone/pull/143))

## [0.0.4--prerelease]

### Added
- Log of Agent State whenever it's emitted

### Changed
- Updated the api to align with holochain client ([#136](https://github.com/Holo-Host/envoy-chaperone/pull/136))
  - Changes shape of signal so that it contains the full cell, not just the dna hash
  - zome_call can now take either a role id OR a cell ID
- Switched to typescript ([#135](https://github.com/Holo-Host/envoy-chaperone/pull/135))
- No longer appends `register_user` to `membrane_proof_server_url` ([#119](https://github.com/Holo-Host/envoy-chaperone/pull/119))
- Added mobile breakpoints for login and registration form
- Rename skip registration flag to require registration
- Trim whitespace on registration code
- Login form is disabled and a message is displayed to the user if envoy fails to retrieve a happ config ([#130](https://github.com/Holo-Host/envoy-chaperone/pull/130))

## [0.0.3-prerelease]

### Added
- Handling of `happ_config` message from envoy.
- Handling 'No hosts available' error by displaying on AuthPages and returns to web-sdk ([#95](https://github.com/Holo-Host/envoy-chaperone/pull/95))
- Returns an `unrecoverable_error` with type `paused` to `web-sdk` when happ returns a status of `paused` ([#98](https://github.com/Holo-Host/envoy-chaperone/pull/98))
- Logs chaperone version and displays chaperone version on form  ([#105](https://github.com/Holo-Host/envoy-chaperone/pull/105))

### Changed
- Autoformatted all JS and Svelte code and added formatter configuration to the repo. ([#85](https://github.com/Holo-Host/envoy-chaperone/pull/85))
- Updated COMB to v0.3.0 ([#92](https://github.com/Holo-Host/envoy-chaperone/pull/92))
- Auth form converts email to lower case on submit ([#99](https://github.com/Holo-Host/envoy-chaperone/pull/99))
- zomeCall now takes an optional `cap_secret` arg

### Fixed
- Bug when passing a membrane proof directly from chaperone sign up form ([#92](https://github.com/Holo-Host/envoy-chaperone/pull/92))
- Wasn't passing `unrecoverable_error` back to `web-sdk` ([#98](https://github.com/Holo-Host/envoy-chaperone/pull/98))

## [0.0.2-prerelease]

### Changed
- Emits single `agent-state` event when: switching to a new agent, availability changes, or when it receives `app_status` of `'not_hosted'`, `error_getting_app_info`, `error_enabling`. This replaces previous events `available`, `unavailable`, `unrecoverable-agent-state`

## [0.0.1-prerelease]

### Added
- Reporting of some resolver error cases:
  - Failure to resolve happ_id
  - Failure to resolve host for identified agent
- `agentInfo` comb listener returning `{ id, is_anonymous, host_url}`
- `handshake` comb listener which returns null if comb setup was successful, and returns an error message if there was an issue with comb setup (to be called by `WebSdk.connect` before returning)
- Emits `'signal'` event to `parent_window` when it gets a signal from envoy.
- Emits `'available'` and `'unavailable'` events to `parent_window`.
- Can now pass `happ_id` and `host_url` as env values to webpack. See package.json `dev-test-wrapper` for an example.
- Shows a UI error message on `error_installing` message from envoy.
- Assigns host to agent in resolver once agent is successfully installed
- Auth Form now shows a close button when `cancellable` option is passed to `signIn` or `signUp`
- Sends an `app_status` request every 30 seconds to keep the web socket connection alive
- emits `'unrecoverable-agent-state'` event when it receives `app_status` of `'not_hosted'`, `'error_getting_app_info'`, `'error_enabling'`
- Calls `membrane_proof_server_url` if provided to get membrane_proof

### Changed
- signIn, signUp and signOut comb listeners now return agent info
- Envoy websocket connection is now secure

### Fixed
- Loading spinner now shows while form is processing
- Loading spinner now stops showing if there's an error
- Disable form when there are validation errors
- Don't show validation errors until you've touched the field
- Actually signs spec for servicelogger
- Add real `args_hash` to `call_spec`
