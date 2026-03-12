

import * as runtime from "@prisma/client/runtime/client"
import type * as Prisma from "./prismaNamespace"


const config: runtime.GetPrismaClientConfig = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": "generator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Msisdn {\n  id             Int       @id @default(autoincrement())\n  msisdn         String\n  sn             String\n  slotSimbank    Int       @map(\"slot_simbank\")\n  linkCekKuota   String    @map(\"link_cek_kuota\")\n  noDus          String    @map(\"no_dus\")\n  kuota          Float     @default(0)\n  usedQuota      Float     @default(0) @map(\"used_quota\")\n  remainingQuota Float     @default(0) @map(\"remaining_quota\")\n  lastScrapedAt  DateTime? @map(\"last_scraped_at\")\n  isExhausted    Boolean   @default(false) @map(\"is_exhausted\")\n  createdAt      DateTime  @default(now()) @map(\"created_at\")\n  updatedAt      DateTime  @updatedAt @map(\"updated_at\")\n\n  @@map(\"msisdn\")\n}\n\nmodel ActivityLog {\n  id             Int      @id @default(autoincrement())\n  recordedAt     DateTime @default(now()) @map(\"recorded_at\")\n  totalSimCards  Int      @map(\"total_sim_cards\")\n  statusActive   Int      @map(\"status_active\")\n  statusHabis    Int      @map(\"status_habis\")\n  newlyExhausted Int      @map(\"newly_exhausted\")\n\n  @@map(\"activity_log\")\n}\n",
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Msisdn\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"msisdn\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sn\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"slotSimbank\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"slot_simbank\"},{\"name\":\"linkCekKuota\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"link_cek_kuota\"},{\"name\":\"noDus\",\"kind\":\"scalar\",\"type\":\"String\",\"dbName\":\"no_dus\"},{\"name\":\"kuota\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"usedQuota\",\"kind\":\"scalar\",\"type\":\"Float\",\"dbName\":\"used_quota\"},{\"name\":\"remainingQuota\",\"kind\":\"scalar\",\"type\":\"Float\",\"dbName\":\"remaining_quota\"},{\"name\":\"lastScrapedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"last_scraped_at\"},{\"name\":\"isExhausted\",\"kind\":\"scalar\",\"type\":\"Boolean\",\"dbName\":\"is_exhausted\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"created_at\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"updated_at\"}],\"dbName\":\"msisdn\"},\"ActivityLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"recordedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\",\"dbName\":\"recorded_at\"},{\"name\":\"totalSimCards\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"total_sim_cards\"},{\"name\":\"statusActive\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"status_active\"},{\"name\":\"statusHabis\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"status_habis\"},{\"name\":\"newlyExhausted\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"newly_exhausted\"}],\"dbName\":\"activity_log\"}},\"enums\":{},\"types\":{}}")
config.parameterizationSchema = {
  strings: JSON.parse("[\"where\",\"Msisdn.findUnique\",\"Msisdn.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Msisdn.findFirst\",\"Msisdn.findFirstOrThrow\",\"Msisdn.findMany\",\"data\",\"Msisdn.createOne\",\"Msisdn.createMany\",\"Msisdn.createManyAndReturn\",\"Msisdn.updateOne\",\"Msisdn.updateMany\",\"Msisdn.updateManyAndReturn\",\"create\",\"update\",\"Msisdn.upsertOne\",\"Msisdn.deleteOne\",\"Msisdn.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Msisdn.groupBy\",\"Msisdn.aggregate\",\"ActivityLog.findUnique\",\"ActivityLog.findUniqueOrThrow\",\"ActivityLog.findFirst\",\"ActivityLog.findFirstOrThrow\",\"ActivityLog.findMany\",\"ActivityLog.createOne\",\"ActivityLog.createMany\",\"ActivityLog.createManyAndReturn\",\"ActivityLog.updateOne\",\"ActivityLog.updateMany\",\"ActivityLog.updateManyAndReturn\",\"ActivityLog.upsertOne\",\"ActivityLog.deleteOne\",\"ActivityLog.deleteMany\",\"ActivityLog.groupBy\",\"ActivityLog.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"recordedAt\",\"totalSimCards\",\"statusActive\",\"statusHabis\",\"newlyExhausted\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"msisdn\",\"sn\",\"slotSimbank\",\"linkCekKuota\",\"noDus\",\"kuota\",\"usedQuota\",\"remainingQuota\",\"lastScrapedAt\",\"isExhausted\",\"createdAt\",\"updatedAt\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
  graph: "YBUgECwAAEsAMC0AAAQAEC4AAEsAMC8CAAAAAT0BAEwAIT4BAEwAIT8CADwAIUABAEwAIUEBAEwAIUIIAE0AIUMIAE0AIUQIAE0AIUVAAE4AIUYgAE8AIUdAAD0AIUhAAD0AIQEAAAABACABAAAAAQAgECwAAEsAMC0AAAQAEC4AAEsAMC8CADwAIT0BAEwAIT4BAEwAIT8CADwAIUABAEwAIUEBAEwAIUIIAE0AIUMIAE0AIUQIAE0AIUVAAE4AIUYgAE8AIUdAAD0AIUhAAD0AIQFFAABXACADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACANLwIAAAABPQEAAAABPgEAAAABPwIAAAABQAEAAAABQQEAAAABQggAAAABQwgAAAABRAgAAAABRUAAAAABRiAAAAABR0AAAAABSEAAAAABAQgAAAkAIA0vAgAAAAE9AQAAAAE-AQAAAAE_AgAAAAFAAQAAAAFBAQAAAAFCCAAAAAFDCAAAAAFECAAAAAFFQAAAAAFGIAAAAAFHQAAAAAFIQAAAAAEBCAAACwAwAQgAAAsAMA0vAgBWACE9AQBdACE-AQBdACE_AgBWACFAAQBdACFBAQBdACFCCABeACFDCABeACFECABeACFFQABfACFGIABgACFHQABVACFIQABVACECAAAAAQAgCAAADgAgDS8CAFYAIT0BAF0AIT4BAF0AIT8CAFYAIUABAF0AIUEBAF0AIUIIAF4AIUMIAF4AIUQIAF4AIUVAAF8AIUYgAGAAIUdAAFUAIUhAAFUAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBhUAAFgAIBYAAFkAIBcAAFwAIBgAAFsAIBkAAFoAIEUAAFcAIBAsAAA-ADAtAAAXABAuAAA-ADAvAgA0ACE9AQA_ACE-AQA_ACE_AgA0ACFAAQA_ACFBAQA_ACFCCABAACFDCABAACFECABAACFFQABBACFGIABCACFHQAA1ACFIQAA1ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAksAAA7ADAtAAAdABAuAAA7ADAvAgAAAAEwQAA9ACExAgA8ACEyAgA8ACEzAgA8ACE0AgA8ACEBAAAAGgAgAQAAABoAIAksAAA7ADAtAAAdABAuAAA7ADAvAgA8ACEwQAA9ACExAgA8ACEyAgA8ACEzAgA8ACE0AgA8ACEAAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgBi8CAAAAATBAAAAAATECAAAAATICAAAAATMCAAAAATQCAAAAAQEIAAAiACAGLwIAAAABMEAAAAABMQIAAAABMgIAAAABMwIAAAABNAIAAAABAQgAACQAMAEIAAAkADAGLwIAVgAhMEAAVQAhMQIAVgAhMgIAVgAhMwIAVgAhNAIAVgAhAgAAABoAIAgAACcAIAYvAgBWACEwQABVACExAgBWACEyAgBWACEzAgBWACE0AgBWACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAUVAABQACAWAABRACAXAABUACAYAABTACAZAABSACAJLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMEAANQAhMQIANAAhMgIANAAhMwIANAAhNAIANAAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAJLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMEAANQAhMQIANAAhMgIANAAhMwIANAAhNAIANAAhDRUAADcAIBYAADoAIBcAADcAIBgAADcAIBkAADcAIDUCAAAAATYCAAAABDcCAAAABDgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCADkAIQsVAAA3ACAYAAA4ACAZAAA4ACA1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA2ACELFQAANwAgGAAAOAAgGQAAOAAgNUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAANgAhCDUCAAAAATYCAAAABDcCAAAABDgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCADcAIQg1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA4ACENFQAANwAgFgAAOgAgFwAANwAgGAAANwAgGQAANwAgNQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPAIAOQAhCDUIAAAAATYIAAAABDcIAAAABDgIAAAAATkIAAAAAToIAAAAATsIAAAAATwIADoAIQksAAA7ADAtAAAdABAuAAA7ADAvAgA8ACEwQAA9ACExAgA8ACEyAgA8ACEzAgA8ACE0AgA8ACEINQIAAAABNgIAAAAENwIAAAAEOAIAAAABOQIAAAABOgIAAAABOwIAAAABPAIANwAhCDVAAAAAATZAAAAABDdAAAAABDhAAAAAATlAAAAAATpAAAAAATtAAAAAATxAADgAIRAsAAA-ADAtAAAXABAuAAA-ADAvAgA0ACE9AQA_ACE-AQA_ACE_AgA0ACFAAQA_ACFBAQA_ACFCCABAACFDCABAACFECABAACFFQABBACFGIABCACFHQAA1ACFIQAA1ACEOFQAANwAgGAAASgAgGQAASgAgNQEAAAABNgEAAAAENwEAAAAEOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEASQAhSQEAAAABSgEAAAABSwEAAAABDRUAADcAIBYAADoAIBcAADoAIBgAADoAIBkAADoAIDUIAAAAATYIAAAABDcIAAAABDgIAAAAATkIAAAAAToIAAAAATsIAAAAATwIAEgAIQsVAABGACAYAABHACAZAABHACA1QAAAAAE2QAAAAAU3QAAAAAU4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QABFACEFFQAANwAgGAAARAAgGQAARAAgNSAAAAABPCAAQwAhBRUAADcAIBgAAEQAIBkAAEQAIDUgAAAAATwgAEMAIQI1IAAAAAE8IABEACELFQAARgAgGAAARwAgGQAARwAgNUAAAAABNkAAAAAFN0AAAAAFOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAARQAhCDUCAAAAATYCAAAABTcCAAAABTgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCAEYAIQg1QAAAAAE2QAAAAAU3QAAAAAU4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QABHACENFQAANwAgFgAAOgAgFwAAOgAgGAAAOgAgGQAAOgAgNQgAAAABNggAAAAENwgAAAAEOAgAAAABOQgAAAABOggAAAABOwgAAAABPAgASAAhDhUAADcAIBgAAEoAIBkAAEoAIDUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAEkAIUkBAAAAAUoBAAAAAUsBAAAAAQs1AQAAAAE2AQAAAAQ3AQAAAAQ4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQBKACFJAQAAAAFKAQAAAAFLAQAAAAEQLAAASwAwLQAABAAQLgAASwAwLwIAPAAhPQEATAAhPgEATAAhPwIAPAAhQAEATAAhQQEATAAhQggATQAhQwgATQAhRAgATQAhRUAATgAhRiAATwAhR0AAPQAhSEAAPQAhCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAEoAIUkBAAAAAUoBAAAAAUsBAAAAAQg1CAAAAAE2CAAAAAQ3CAAAAAQ4CAAAAAE5CAAAAAE6CAAAAAE7CAAAAAE8CAA6ACEINUAAAAABNkAAAAAFN0AAAAAFOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAARwAhAjUgAAAAATwgAEQAIQAAAAAAAUxAAAAAAQVMAgAAAAFNAgAAAAFOAgAAAAFPAgAAAAFQAgAAAAEAAAAAAAABTAEAAAABBUwIAAAAAU0IAAAAAU4IAAAAAU8IAAAAAVAIAAAAAQFMQAAAAAEBTCAAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAFFQAQFgARFwASGAATGQAUAAAAAAAFFQAQFgARFwASGAATGQAUAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkLHBsMHRwMHh8MHyAMICEMISMMIiUCIyYNJCgMJSoCJisOJywMKC0MKS4CKjEPKzIV"
}

async function decodeBase64AsWasm(wasmBase64: string): Promise<WebAssembly.Module> {
  const { Buffer } = await import('node:buffer')
  const wasmArray = Buffer.from(wasmBase64, 'base64')
  return new WebAssembly.Module(wasmArray)
}

config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),

  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js")
    return await decodeBase64AsWasm(wasm)
  },

  importName: "./query_compiler_fast_bg.js"
}



export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> =
  'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never

export interface PrismaClientConstructor {
  /**
 * ## Prisma Client
 * 
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Msisdns
 * const msisdns = await prisma.msisdn.findMany()
 * ```
 * 
 * Read more in our [docs](https://pris.ly/d/client).
 */

  new <
    Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    LogOpts extends LogOptions<Options> = LogOptions<Options>,
    OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends { omit: infer U } ? U : Prisma.PrismaClientOptions['omit'],
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>
}

/**
 * ## Prisma Client
 * 
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Msisdns
 * const msisdns = await prisma.msisdn.findMany()
 * ```
 * 
 * Read more in our [docs](https://pris.ly/d/client).
 */

export interface PrismaClient<
  in LogOpts extends Prisma.LogLevel = never,
  in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined,
  in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
     * Executes a prepared raw query and returns the number of affected rows.
     * @example
     * ```
     * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>

  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
    extArgs: ExtArgs
  }>>

  /**
* `prisma.msisdn`: Exposes CRUD operations for the **Msisdn** model.
* Example usage:
* ```ts
* // Fetch zero or more Msisdns
* const msisdns = await prisma.msisdn.findMany()
* ```
*/
  get msisdn(): Prisma.MsisdnDelegate<ExtArgs, { omit: OmitOpts }>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, { omit: OmitOpts }>;
}

export function getPrismaClientClass(): PrismaClientConstructor {
  return runtime.getPrismaClient(config) as unknown as PrismaClientConstructor
}
