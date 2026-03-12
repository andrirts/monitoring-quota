

import * as runtime from "@prisma/client/runtime/index-browser"

export type * from '../models'
export type * from './prismaNamespace'

export const Decimal = runtime.Decimal


export const NullTypes = {
  DbNull: runtime.NullTypes.DbNull as (new (secret: never) => typeof runtime.DbNull),
  JsonNull: runtime.NullTypes.JsonNull as (new (secret: never) => typeof runtime.JsonNull),
  AnyNull: runtime.NullTypes.AnyNull as (new (secret: never) => typeof runtime.AnyNull),
}
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const DbNull = runtime.DbNull

/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const JsonNull = runtime.JsonNull

/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export const AnyNull = runtime.AnyNull


export const ModelName = {
  Msisdn: 'Msisdn',
  ActivityLog: 'ActivityLog'
} as const

export type ModelName = (typeof ModelName)[keyof typeof ModelName]

/*
 * Enums
 */

export const TransactionIsolationLevel = runtime.makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
} as const)

export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


export const MsisdnScalarFieldEnum = {
  id: 'id',
  msisdn: 'msisdn',
  sn: 'sn',
  slotSimbank: 'slotSimbank',
  linkCekKuota: 'linkCekKuota',
  noDus: 'noDus',
  kuota: 'kuota',
  usedQuota: 'usedQuota',
  remainingQuota: 'remainingQuota',
  lastScrapedAt: 'lastScrapedAt',
  isExhausted: 'isExhausted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
} as const

export type MsisdnScalarFieldEnum = (typeof MsisdnScalarFieldEnum)[keyof typeof MsisdnScalarFieldEnum]


export const ActivityLogScalarFieldEnum = {
  id: 'id',
  recordedAt: 'recordedAt',
  totalSimCards: 'totalSimCards',
  statusActive: 'statusActive',
  statusHabis: 'statusHabis',
  newlyExhausted: 'newlyExhausted'
} as const

export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


export const SortOrder = {
  asc: 'asc',
  desc: 'desc'
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export const QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
} as const

export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


export const NullsOrder = {
  first: 'first',
  last: 'last'
} as const

export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]

