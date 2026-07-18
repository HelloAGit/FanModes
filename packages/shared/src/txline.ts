export function createTxlineClient(opts: { host: string; guestJwtSecret?: string; apiToken?: string; network?: string }) {
  return {
    async startGuestSession() {
      // call host /guest/start to obtain JWT
      // return jwt string
    },
    async activateApiToken(jwt: string) {
      // call host /activate with jwt and X-Api-Token
    },
    async fetchFixtureSnapshots() {
      // GET /fixtures/snapshot with both headers
    },
    on(event: string, cb: (payload: any) => void) {
      // subscribe to websocket or SSE
    },
    connect() {
      // open websocket
    }
  };
}
