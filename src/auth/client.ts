import { NodeOAuthClient, NodeSavedState, NodeSavedSession, Session } from '@atproto/oauth-client-node'

import { isValidHandle } from "@atproto/syntax";
import { SessionStore, StateStore } from './session';

export function createNewClient () {
  return new NodeOAuthClient({
      // This object will be used to build the payload of the /client-metadata.json
      // endpoint metadata, exposing the client metadata to the OAuth server.
      clientMetadata: {
        // Must be a URL that will be exposing this metadata
        client_id: 'http://localhost?scope=atproto transition:generic&redirect_uri=http://127.0.0.1:8080/callback',
        client_name: 'DeckSky',
        redirect_uris: ['https://127.0.0.1:8080/callback'],
        grant_types: ['authorization_code', 'refresh_token'],
        scope: 'atproto transition:generic',
        response_types: ['code'],
        application_type: 'web',
        token_endpoint_auth_method: 'none',
        dpop_bound_access_tokens: true,
      },

      // Used to authenticate the client to the token endpoint. Will be used to
      // build the jwks object to be exposed on the "jwks_uri" endpoint.

      // Interface to store authorization state data (during authorization flows)
      stateStore: new StateStore(),

      // Interface to store authenticated session data
      sessionStore: new SessionStore()

  })
}

export async function resolveHandle (handle: string): Promise<string | null>{
      // make an api call to bluesky to see if it is successful
      const response = await fetch(
        `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(handle)}`
      );

      if (!isValidHandle(handle)) {
        return "Invalid handle format";
      }

      // if not, return null
      if (!response.ok){
        return null!;
      }

      //
      const data = await response.json() as { did: string };
      return data.did;
}
