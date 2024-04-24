<script lang="ts">
  import createHoloKeyManager from '@holo-host/holo-key-manager-js-client'

  const randomBytes = (length = 32) => {
    const is_browser =
      typeof window === 'object' && (<any>window).constructor.name === 'Window'
    if (is_browser) {
      let array = new Uint8Array(length)
      ;(<any>window).crypto.getRandomValues(array)
      return array
    } else {
      return (<any>crypto).randomBytes(length)
    }
  }

  const handleClick = async () => {
    const { KeyManager: CryptolibKeyManager } = await import(
      '@holo-host/cryptolib'
    )

    const extension_client = createHoloKeyManager({
      happId: 'any_happ_id',
      happName: 'any_happ_name',
      happLogo: 'https://example.com/ui',
      happUiUrl: 'https://example.com/ui',
      requireEmail: false,
      requireRegistrationCode: false
    })

    const signUpResults = await extension_client.signUp()

    const extension_pubkey = signUpResults.pubKey

    // any message
    const message = new Uint8Array([19, 20, 1, 43, 92, 57, 38, 14, 29])

    console.log('Verifying extension signature')

    const extension_signature = await extension_client.signMessage(message)

    const extension_verified = CryptolibKeyManager.verifyWithPublicKey(
      message,
      extension_signature,
      extension_pubkey
    )

    console.log(
      extension_verified ? 'Extension Verified' : 'Extension Failed to verify'
    )

    console.log('Verifying CryptolibKeyManager signature')

    const key_pair = new CryptolibKeyManager(randomBytes(32))
    const clkm_pubkey = key_pair.publicKey()
    const clkm_signature = key_pair.sign(message)

    const clkm_verified = CryptolibKeyManager.verifyWithPublicKey(
      message,
      clkm_signature,
      clkm_pubkey
    )

    console.log(
      clkm_verified
        ? 'CryptolibKeyManager Verified'
        : 'CryptolibKeyManager Failed to verify'
    )
  }
</script>

<button on:click={handleClick}>Verify signature</button>
