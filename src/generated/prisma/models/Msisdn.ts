
import type * as runtime from "@prisma/client/runtime/client"
import type * as $Enums from "../enums"
import type * as Prisma from "../internal/prismaNamespace"

/**
 * Model Msisdn
 * 
 */
export type MsisdnModel = runtime.Types.Result.DefaultSelection<Prisma.$MsisdnPayload>

export type AggregateMsisdn = {
  _count: MsisdnCountAggregateOutputType | null
  _avg: MsisdnAvgAggregateOutputType | null
  _sum: MsisdnSumAggregateOutputType | null
  _min: MsisdnMinAggregateOutputType | null
  _max: MsisdnMaxAggregateOutputType | null
}

export type MsisdnAvgAggregateOutputType = {
  id: number | null
  slotSimbank: number | null
  kuota: number | null
  usedQuota: number | null
  remainingQuota: number | null
}

export type MsisdnSumAggregateOutputType = {
  id: number | null
  slotSimbank: number | null
  kuota: number | null
  usedQuota: number | null
  remainingQuota: number | null
}

export type MsisdnMinAggregateOutputType = {
  id: number | null
  msisdn: string | null
  sn: string | null
  slotSimbank: number | null
  linkCekKuota: string | null
  noDus: string | null
  kuota: number | null
  usedQuota: number | null
  remainingQuota: number | null
  lastScrapedAt: Date | null
  isExhausted: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type MsisdnMaxAggregateOutputType = {
  id: number | null
  msisdn: string | null
  sn: string | null
  slotSimbank: number | null
  linkCekKuota: string | null
  noDus: string | null
  kuota: number | null
  usedQuota: number | null
  remainingQuota: number | null
  lastScrapedAt: Date | null
  isExhausted: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
}

export type MsisdnCountAggregateOutputType = {
  id: number
  msisdn: number
  sn: number
  slotSimbank: number
  linkCekKuota: number
  noDus: number
  kuota: number
  usedQuota: number
  remainingQuota: number
  lastScrapedAt: number
  isExhausted: number
  createdAt: number
  updatedAt: number
  _all: number
}


export type MsisdnAvgAggregateInputType = {
  id?: true
  slotSimbank?: true
  kuota?: true
  usedQuota?: true
  remainingQuota?: true
}

export type MsisdnSumAggregateInputType = {
  id?: true
  slotSimbank?: true
  kuota?: true
  usedQuota?: true
  remainingQuota?: true
}

export type MsisdnMinAggregateInputType = {
  id?: true
  msisdn?: true
  sn?: true
  slotSimbank?: true
  linkCekKuota?: true
  noDus?: true
  kuota?: true
  usedQuota?: true
  remainingQuota?: true
  lastScrapedAt?: true
  isExhausted?: true
  createdAt?: true
  updatedAt?: true
}

export type MsisdnMaxAggregateInputType = {
  id?: true
  msisdn?: true
  sn?: true
  slotSimbank?: true
  linkCekKuota?: true
  noDus?: true
  kuota?: true
  usedQuota?: true
  remainingQuota?: true
  lastScrapedAt?: true
  isExhausted?: true
  createdAt?: true
  updatedAt?: true
}

export type MsisdnCountAggregateInputType = {
  id?: true
  msisdn?: true
  sn?: true
  slotSimbank?: true
  linkCekKuota?: true
  noDus?: true
  kuota?: true
  usedQuota?: true
  remainingQuota?: true
  lastScrapedAt?: true
  isExhausted?: true
  createdAt?: true
  updatedAt?: true
  _all?: true
}

export type MsisdnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Msisdn to aggregate.
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Msisdns to fetch.
   */
  orderBy?: Prisma.MsisdnOrderByWithRelationInput | Prisma.MsisdnOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the start position
   */
  cursor?: Prisma.MsisdnWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Msisdns from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Msisdns.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Count returned Msisdns
  **/
  _count?: true | MsisdnCountAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to average
  **/
  _avg?: MsisdnAvgAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to sum
  **/
  _sum?: MsisdnSumAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the minimum value
  **/
  _min?: MsisdnMinAggregateInputType
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
   * 
   * Select which fields to find the maximum value
  **/
  _max?: MsisdnMaxAggregateInputType
}

export type GetMsisdnAggregateType<T extends MsisdnAggregateArgs> = {
  [P in keyof T & keyof AggregateMsisdn]: P extends '_count' | 'count'
  ? T[P] extends true
  ? number
  : Prisma.GetScalarType<T[P], AggregateMsisdn[P]>
  : Prisma.GetScalarType<T[P], AggregateMsisdn[P]>
}




export type MsisdnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  where?: Prisma.MsisdnWhereInput
  orderBy?: Prisma.MsisdnOrderByWithAggregationInput | Prisma.MsisdnOrderByWithAggregationInput[]
  by: Prisma.MsisdnScalarFieldEnum[] | Prisma.MsisdnScalarFieldEnum
  having?: Prisma.MsisdnScalarWhereWithAggregatesInput
  take?: number
  skip?: number
  _count?: MsisdnCountAggregateInputType | true
  _avg?: MsisdnAvgAggregateInputType
  _sum?: MsisdnSumAggregateInputType
  _min?: MsisdnMinAggregateInputType
  _max?: MsisdnMaxAggregateInputType
}

export type MsisdnGroupByOutputType = {
  id: number
  msisdn: string
  sn: string
  slotSimbank: number
  linkCekKuota: string
  noDus: string
  kuota: number
  usedQuota: number
  remainingQuota: number
  lastScrapedAt: Date | null
  isExhausted: boolean
  createdAt: Date
  updatedAt: Date
  _count: MsisdnCountAggregateOutputType | null
  _avg: MsisdnAvgAggregateOutputType | null
  _sum: MsisdnSumAggregateOutputType | null
  _min: MsisdnMinAggregateOutputType | null
  _max: MsisdnMaxAggregateOutputType | null
}

type GetMsisdnGroupByPayload<T extends MsisdnGroupByArgs> = Prisma.PrismaPromise<
  Array<
    Prisma.PickEnumerable<MsisdnGroupByOutputType, T['by']> &
    {
      [P in ((keyof T) & (keyof MsisdnGroupByOutputType))]: P extends '_count'
      ? T[P] extends boolean
      ? number
      : Prisma.GetScalarType<T[P], MsisdnGroupByOutputType[P]>
      : Prisma.GetScalarType<T[P], MsisdnGroupByOutputType[P]>
    }
  >
>



export type MsisdnWhereInput = {
  AND?: Prisma.MsisdnWhereInput | Prisma.MsisdnWhereInput[]
  OR?: Prisma.MsisdnWhereInput[]
  NOT?: Prisma.MsisdnWhereInput | Prisma.MsisdnWhereInput[]
  id?: Prisma.IntFilter<"Msisdn"> | number
  msisdn?: Prisma.StringFilter<"Msisdn"> | string
  sn?: Prisma.StringFilter<"Msisdn"> | string
  slotSimbank?: Prisma.IntFilter<"Msisdn"> | number
  linkCekKuota?: Prisma.StringFilter<"Msisdn"> | string
  noDus?: Prisma.StringFilter<"Msisdn"> | string
  kuota?: Prisma.FloatFilter<"Msisdn"> | number
  usedQuota?: Prisma.FloatFilter<"Msisdn"> | number
  remainingQuota?: Prisma.FloatFilter<"Msisdn"> | number
  lastScrapedAt?: Prisma.DateTimeNullableFilter<"Msisdn"> | Date | string | null
  isExhausted?: Prisma.BoolFilter<"Msisdn"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Msisdn"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Msisdn"> | Date | string
}

export type MsisdnOrderByWithRelationInput = {
  id?: Prisma.SortOrder
  msisdn?: Prisma.SortOrder
  sn?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  linkCekKuota?: Prisma.SortOrder
  noDus?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
  lastScrapedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  isExhausted?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type MsisdnWhereUniqueInput = Prisma.AtLeast<{
  id?: number
  AND?: Prisma.MsisdnWhereInput | Prisma.MsisdnWhereInput[]
  OR?: Prisma.MsisdnWhereInput[]
  NOT?: Prisma.MsisdnWhereInput | Prisma.MsisdnWhereInput[]
  msisdn?: Prisma.StringFilter<"Msisdn"> | string
  sn?: Prisma.StringFilter<"Msisdn"> | string
  slotSimbank?: Prisma.IntFilter<"Msisdn"> | number
  linkCekKuota?: Prisma.StringFilter<"Msisdn"> | string
  noDus?: Prisma.StringFilter<"Msisdn"> | string
  kuota?: Prisma.FloatFilter<"Msisdn"> | number
  usedQuota?: Prisma.FloatFilter<"Msisdn"> | number
  remainingQuota?: Prisma.FloatFilter<"Msisdn"> | number
  lastScrapedAt?: Prisma.DateTimeNullableFilter<"Msisdn"> | Date | string | null
  isExhausted?: Prisma.BoolFilter<"Msisdn"> | boolean
  createdAt?: Prisma.DateTimeFilter<"Msisdn"> | Date | string
  updatedAt?: Prisma.DateTimeFilter<"Msisdn"> | Date | string
}, "id">

export type MsisdnOrderByWithAggregationInput = {
  id?: Prisma.SortOrder
  msisdn?: Prisma.SortOrder
  sn?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  linkCekKuota?: Prisma.SortOrder
  noDus?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
  lastScrapedAt?: Prisma.SortOrderInput | Prisma.SortOrder
  isExhausted?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
  _count?: Prisma.MsisdnCountOrderByAggregateInput
  _avg?: Prisma.MsisdnAvgOrderByAggregateInput
  _max?: Prisma.MsisdnMaxOrderByAggregateInput
  _min?: Prisma.MsisdnMinOrderByAggregateInput
  _sum?: Prisma.MsisdnSumOrderByAggregateInput
}

export type MsisdnScalarWhereWithAggregatesInput = {
  AND?: Prisma.MsisdnScalarWhereWithAggregatesInput | Prisma.MsisdnScalarWhereWithAggregatesInput[]
  OR?: Prisma.MsisdnScalarWhereWithAggregatesInput[]
  NOT?: Prisma.MsisdnScalarWhereWithAggregatesInput | Prisma.MsisdnScalarWhereWithAggregatesInput[]
  id?: Prisma.IntWithAggregatesFilter<"Msisdn"> | number
  msisdn?: Prisma.StringWithAggregatesFilter<"Msisdn"> | string
  sn?: Prisma.StringWithAggregatesFilter<"Msisdn"> | string
  slotSimbank?: Prisma.IntWithAggregatesFilter<"Msisdn"> | number
  linkCekKuota?: Prisma.StringWithAggregatesFilter<"Msisdn"> | string
  noDus?: Prisma.StringWithAggregatesFilter<"Msisdn"> | string
  kuota?: Prisma.FloatWithAggregatesFilter<"Msisdn"> | number
  usedQuota?: Prisma.FloatWithAggregatesFilter<"Msisdn"> | number
  remainingQuota?: Prisma.FloatWithAggregatesFilter<"Msisdn"> | number
  lastScrapedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Msisdn"> | Date | string | null
  isExhausted?: Prisma.BoolWithAggregatesFilter<"Msisdn"> | boolean
  createdAt?: Prisma.DateTimeWithAggregatesFilter<"Msisdn"> | Date | string
  updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Msisdn"> | Date | string
}

export type MsisdnCreateInput = {
  msisdn: string
  sn: string
  slotSimbank: number
  linkCekKuota: string
  noDus: string
  kuota?: number
  usedQuota?: number
  remainingQuota?: number
  lastScrapedAt?: Date | string | null
  isExhausted?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type MsisdnUncheckedCreateInput = {
  id?: number
  msisdn: string
  sn: string
  slotSimbank: number
  linkCekKuota: string
  noDus: string
  kuota?: number
  usedQuota?: number
  remainingQuota?: number
  lastScrapedAt?: Date | string | null
  isExhausted?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type MsisdnUpdateInput = {
  msisdn?: Prisma.StringFieldUpdateOperationsInput | string
  sn?: Prisma.StringFieldUpdateOperationsInput | string
  slotSimbank?: Prisma.IntFieldUpdateOperationsInput | number
  linkCekKuota?: Prisma.StringFieldUpdateOperationsInput | string
  noDus?: Prisma.StringFieldUpdateOperationsInput | string
  kuota?: Prisma.FloatFieldUpdateOperationsInput | number
  usedQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  remainingQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  lastScrapedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  isExhausted?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MsisdnUncheckedUpdateInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  msisdn?: Prisma.StringFieldUpdateOperationsInput | string
  sn?: Prisma.StringFieldUpdateOperationsInput | string
  slotSimbank?: Prisma.IntFieldUpdateOperationsInput | number
  linkCekKuota?: Prisma.StringFieldUpdateOperationsInput | string
  noDus?: Prisma.StringFieldUpdateOperationsInput | string
  kuota?: Prisma.FloatFieldUpdateOperationsInput | number
  usedQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  remainingQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  lastScrapedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  isExhausted?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MsisdnCreateManyInput = {
  id?: number
  msisdn: string
  sn: string
  slotSimbank: number
  linkCekKuota: string
  noDus: string
  kuota?: number
  usedQuota?: number
  remainingQuota?: number
  lastScrapedAt?: Date | string | null
  isExhausted?: boolean
  createdAt?: Date | string
  updatedAt?: Date | string
}

export type MsisdnUpdateManyMutationInput = {
  msisdn?: Prisma.StringFieldUpdateOperationsInput | string
  sn?: Prisma.StringFieldUpdateOperationsInput | string
  slotSimbank?: Prisma.IntFieldUpdateOperationsInput | number
  linkCekKuota?: Prisma.StringFieldUpdateOperationsInput | string
  noDus?: Prisma.StringFieldUpdateOperationsInput | string
  kuota?: Prisma.FloatFieldUpdateOperationsInput | number
  usedQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  remainingQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  lastScrapedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  isExhausted?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MsisdnUncheckedUpdateManyInput = {
  id?: Prisma.IntFieldUpdateOperationsInput | number
  msisdn?: Prisma.StringFieldUpdateOperationsInput | string
  sn?: Prisma.StringFieldUpdateOperationsInput | string
  slotSimbank?: Prisma.IntFieldUpdateOperationsInput | number
  linkCekKuota?: Prisma.StringFieldUpdateOperationsInput | string
  noDus?: Prisma.StringFieldUpdateOperationsInput | string
  kuota?: Prisma.FloatFieldUpdateOperationsInput | number
  usedQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  remainingQuota?: Prisma.FloatFieldUpdateOperationsInput | number
  lastScrapedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  isExhausted?: Prisma.BoolFieldUpdateOperationsInput | boolean
  createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
  updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string
}

export type MsisdnCountOrderByAggregateInput = {
  id?: Prisma.SortOrder
  msisdn?: Prisma.SortOrder
  sn?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  linkCekKuota?: Prisma.SortOrder
  noDus?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
  lastScrapedAt?: Prisma.SortOrder
  isExhausted?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type MsisdnAvgOrderByAggregateInput = {
  id?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
}

export type MsisdnMaxOrderByAggregateInput = {
  id?: Prisma.SortOrder
  msisdn?: Prisma.SortOrder
  sn?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  linkCekKuota?: Prisma.SortOrder
  noDus?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
  lastScrapedAt?: Prisma.SortOrder
  isExhausted?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type MsisdnMinOrderByAggregateInput = {
  id?: Prisma.SortOrder
  msisdn?: Prisma.SortOrder
  sn?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  linkCekKuota?: Prisma.SortOrder
  noDus?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
  lastScrapedAt?: Prisma.SortOrder
  isExhausted?: Prisma.SortOrder
  createdAt?: Prisma.SortOrder
  updatedAt?: Prisma.SortOrder
}

export type MsisdnSumOrderByAggregateInput = {
  id?: Prisma.SortOrder
  slotSimbank?: Prisma.SortOrder
  kuota?: Prisma.SortOrder
  usedQuota?: Prisma.SortOrder
  remainingQuota?: Prisma.SortOrder
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type FloatFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}



export type MsisdnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  msisdn?: boolean
  sn?: boolean
  slotSimbank?: boolean
  linkCekKuota?: boolean
  noDus?: boolean
  kuota?: boolean
  usedQuota?: boolean
  remainingQuota?: boolean
  lastScrapedAt?: boolean
  isExhausted?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}, ExtArgs["result"]["msisdn"]>

export type MsisdnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  msisdn?: boolean
  sn?: boolean
  slotSimbank?: boolean
  linkCekKuota?: boolean
  noDus?: boolean
  kuota?: boolean
  usedQuota?: boolean
  remainingQuota?: boolean
  lastScrapedAt?: boolean
  isExhausted?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}, ExtArgs["result"]["msisdn"]>

export type MsisdnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
  id?: boolean
  msisdn?: boolean
  sn?: boolean
  slotSimbank?: boolean
  linkCekKuota?: boolean
  noDus?: boolean
  kuota?: boolean
  usedQuota?: boolean
  remainingQuota?: boolean
  lastScrapedAt?: boolean
  isExhausted?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}, ExtArgs["result"]["msisdn"]>

export type MsisdnSelectScalar = {
  id?: boolean
  msisdn?: boolean
  sn?: boolean
  slotSimbank?: boolean
  linkCekKuota?: boolean
  noDus?: boolean
  kuota?: boolean
  usedQuota?: boolean
  remainingQuota?: boolean
  lastScrapedAt?: boolean
  isExhausted?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export type MsisdnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "msisdn" | "sn" | "slotSimbank" | "linkCekKuota" | "noDus" | "kuota" | "usedQuota" | "remainingQuota" | "lastScrapedAt" | "isExhausted" | "createdAt" | "updatedAt", ExtArgs["result"]["msisdn"]>

export type $MsisdnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  name: "Msisdn"
  objects: {}
  scalars: runtime.Types.Extensions.GetPayloadResult<{
    id: number
    msisdn: string
    sn: string
    slotSimbank: number
    linkCekKuota: string
    noDus: string
    kuota: number
    usedQuota: number
    remainingQuota: number
    lastScrapedAt: Date | null
    isExhausted: boolean
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["msisdn"]>
  composites: {}
}

export type MsisdnGetPayload<S extends boolean | null | undefined | MsisdnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MsisdnPayload, S>

export type MsisdnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
  Omit<MsisdnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MsisdnCountAggregateInputType | true
  }

export interface MsisdnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Msisdn'], meta: { name: 'Msisdn' } }
  /**
   * Find zero or one Msisdn that matches the filter.
   * @param {MsisdnFindUniqueArgs} args - Arguments to find a Msisdn
   * @example
   * // Get one Msisdn
   * const msisdn = await prisma.msisdn.findUnique({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUnique<T extends MsisdnFindUniqueArgs>(args: Prisma.SelectSubset<T, MsisdnFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find one Msisdn that matches the filter or throw an error with `error.code='P2025'`
   * if no matches were found.
   * @param {MsisdnFindUniqueOrThrowArgs} args - Arguments to find a Msisdn
   * @example
   * // Get one Msisdn
   * const msisdn = await prisma.msisdn.findUniqueOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findUniqueOrThrow<T extends MsisdnFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MsisdnFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Msisdn that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnFindFirstArgs} args - Arguments to find a Msisdn
   * @example
   * // Get one Msisdn
   * const msisdn = await prisma.msisdn.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirst<T extends MsisdnFindFirstArgs>(args?: Prisma.SelectSubset<T, MsisdnFindFirstArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

  /**
   * Find the first Msisdn that matches the filter or
   * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnFindFirstOrThrowArgs} args - Arguments to find a Msisdn
   * @example
   * // Get one Msisdn
   * const msisdn = await prisma.msisdn.findFirstOrThrow({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   */
  findFirstOrThrow<T extends MsisdnFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MsisdnFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Find zero or more Msisdns that matches the filter.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnFindManyArgs} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Msisdns
   * const msisdns = await prisma.msisdn.findMany()
   * 
   * // Get first 10 Msisdns
   * const msisdns = await prisma.msisdn.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const msisdnWithIdOnly = await prisma.msisdn.findMany({ select: { id: true } })
   * 
   */
  findMany<T extends MsisdnFindManyArgs>(args?: Prisma.SelectSubset<T, MsisdnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

  /**
   * Create a Msisdn.
   * @param {MsisdnCreateArgs} args - Arguments to create a Msisdn.
   * @example
   * // Create one Msisdn
   * const Msisdn = await prisma.msisdn.create({
   *   data: {
   *     // ... data to create a Msisdn
   *   }
   * })
   * 
   */
  create<T extends MsisdnCreateArgs>(args: Prisma.SelectSubset<T, MsisdnCreateArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Create many Msisdns.
   * @param {MsisdnCreateManyArgs} args - Arguments to create many Msisdns.
   * @example
   * // Create many Msisdns
   * const msisdn = await prisma.msisdn.createMany({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   *     
   */
  createMany<T extends MsisdnCreateManyArgs>(args?: Prisma.SelectSubset<T, MsisdnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Create many Msisdns and returns the data saved in the database.
   * @param {MsisdnCreateManyAndReturnArgs} args - Arguments to create many Msisdns.
   * @example
   * // Create many Msisdns
   * const msisdn = await prisma.msisdn.createManyAndReturn({
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Create many Msisdns and only return the `id`
   * const msisdnWithIdOnly = await prisma.msisdn.createManyAndReturn({
   *   select: { id: true },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  createManyAndReturn<T extends MsisdnCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MsisdnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

  /**
   * Delete a Msisdn.
   * @param {MsisdnDeleteArgs} args - Arguments to delete one Msisdn.
   * @example
   * // Delete one Msisdn
   * const Msisdn = await prisma.msisdn.delete({
   *   where: {
   *     // ... filter to delete one Msisdn
   *   }
   * })
   * 
   */
  delete<T extends MsisdnDeleteArgs>(args: Prisma.SelectSubset<T, MsisdnDeleteArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Update one Msisdn.
   * @param {MsisdnUpdateArgs} args - Arguments to update one Msisdn.
   * @example
   * // Update one Msisdn
   * const msisdn = await prisma.msisdn.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  update<T extends MsisdnUpdateArgs>(args: Prisma.SelectSubset<T, MsisdnUpdateArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

  /**
   * Delete zero or more Msisdns.
   * @param {MsisdnDeleteManyArgs} args - Arguments to filter Msisdns to delete.
   * @example
   * // Delete a few Msisdns
   * const { count } = await prisma.msisdn.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
   */
  deleteMany<T extends MsisdnDeleteManyArgs>(args?: Prisma.SelectSubset<T, MsisdnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Msisdns.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Msisdns
   * const msisdn = await prisma.msisdn.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
   */
  updateMany<T extends MsisdnUpdateManyArgs>(args: Prisma.SelectSubset<T, MsisdnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>

  /**
   * Update zero or more Msisdns and returns the data updated in the database.
   * @param {MsisdnUpdateManyAndReturnArgs} args - Arguments to update many Msisdns.
   * @example
   * // Update many Msisdns
   * const msisdn = await prisma.msisdn.updateManyAndReturn({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * 
   * // Update zero or more Msisdns and only return the `id`
   * const msisdnWithIdOnly = await prisma.msisdn.updateManyAndReturn({
   *   select: { id: true },
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: [
   *     // ... provide data here
   *   ]
   * })
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * 
   */
  updateManyAndReturn<T extends MsisdnUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MsisdnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

  /**
   * Create or update one Msisdn.
   * @param {MsisdnUpsertArgs} args - Arguments to update or create a Msisdn.
   * @example
   * // Update or create a Msisdn
   * const msisdn = await prisma.msisdn.upsert({
   *   create: {
   *     // ... data to create a Msisdn
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Msisdn we want to update
   *   }
   * })
   */
  upsert<T extends MsisdnUpsertArgs>(args: Prisma.SelectSubset<T, MsisdnUpsertArgs<ExtArgs>>): Prisma.Prisma__MsisdnClient<runtime.Types.Result.GetResult<Prisma.$MsisdnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


  /**
   * Count the number of Msisdns.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnCountArgs} args - Arguments to filter Msisdns to count.
   * @example
   * // Count the number of Msisdns
   * const count = await prisma.msisdn.count({
   *   where: {
   *     // ... the filter for the Msisdns we want to count
   *   }
   * })
  **/
  count<T extends MsisdnCountArgs>(
    args?: Prisma.Subset<T, MsisdnCountArgs>,
  ): Prisma.PrismaPromise<
    T extends runtime.Types.Utils.Record<'select', any>
    ? T['select'] extends true
    ? number
    : Prisma.GetScalarType<T['select'], MsisdnCountAggregateOutputType>
    : number
  >

  /**
   * Allows you to perform aggregations operations on a Msisdn.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
   * @example
   * // Ordered by age ascending
   * // Where email contains prisma.io
   * // Limited to the 10 users
   * const aggregations = await prisma.user.aggregate({
   *   _avg: {
   *     age: true,
   *   },
   *   where: {
   *     email: {
   *       contains: "prisma.io",
   *     },
   *   },
   *   orderBy: {
   *     age: "asc",
   *   },
   *   take: 10,
   * })
  **/
  aggregate<T extends MsisdnAggregateArgs>(args: Prisma.Subset<T, MsisdnAggregateArgs>): Prisma.PrismaPromise<GetMsisdnAggregateType<T>>

  /**
   * Group by Msisdn.
   * Note, that providing `undefined` is treated as the value not being there.
   * Read more here: https://pris.ly/d/null-undefined
   * @param {MsisdnGroupByArgs} args - Group by arguments.
   * @example
   * // Group by city, order by createdAt, get count
   * const result = await prisma.user.groupBy({
   *   by: ['city', 'createdAt'],
   *   orderBy: {
   *     createdAt: true
   *   },
   *   _count: {
   *     _all: true
   *   },
   * })
   * 
  **/
  groupBy<
    T extends MsisdnGroupByArgs,
    HasSelectOrTake extends Prisma.Or<
      Prisma.Extends<'skip', Prisma.Keys<T>>,
      Prisma.Extends<'take', Prisma.Keys<T>>
    >,
    OrderByArg extends Prisma.True extends HasSelectOrTake
    ? { orderBy: MsisdnGroupByArgs['orderBy'] }
    : { orderBy?: MsisdnGroupByArgs['orderBy'] },
    OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>,
    ByFields extends Prisma.MaybeTupleToUnion<T['by']>,
    ByValid extends Prisma.Has<ByFields, OrderFields>,
    HavingFields extends Prisma.GetHavingFields<T['having']>,
    HavingValid extends Prisma.Has<ByFields, HavingFields>,
    ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False,
    InputErrors extends ByEmpty extends Prisma.True
    ? `Error: "by" must not be empty.`
    : HavingValid extends Prisma.False
    ? {
      [P in HavingFields]: P extends ByFields
      ? never
      : P extends string
      ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
      : [
        Error,
        'Field ',
        P,
        ` in "having" needs to be provided in "by"`,
      ]
    }[HavingFields]
    : 'take' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
    ? ByValid extends Prisma.True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "take", you also need to provide "orderBy"'
    : 'skip' extends Prisma.Keys<T>
    ? 'orderBy' extends Prisma.Keys<T>
    ? ByValid extends Prisma.True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
    : 'Error: If you provide "skip", you also need to provide "orderBy"'
    : ByValid extends Prisma.True
    ? {}
    : {
      [P in OrderFields]: P extends ByFields
      ? never
      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
    }[OrderFields]
  >(args: Prisma.SubsetIntersection<T, MsisdnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMsisdnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Msisdn model
   */
  readonly fields: MsisdnFieldRefs;
}

/**
 * The delegate class that acts as a "Promise-like" for Msisdn.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MsisdnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
  readonly [Symbol.toStringTag]: "PrismaPromise"
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
}




/**
 * Fields of the Msisdn model
 */
export interface MsisdnFieldRefs {
  readonly id: Prisma.FieldRef<"Msisdn", 'Int'>
  readonly msisdn: Prisma.FieldRef<"Msisdn", 'String'>
  readonly sn: Prisma.FieldRef<"Msisdn", 'String'>
  readonly slotSimbank: Prisma.FieldRef<"Msisdn", 'Int'>
  readonly linkCekKuota: Prisma.FieldRef<"Msisdn", 'String'>
  readonly noDus: Prisma.FieldRef<"Msisdn", 'String'>
  readonly kuota: Prisma.FieldRef<"Msisdn", 'Float'>
  readonly usedQuota: Prisma.FieldRef<"Msisdn", 'Float'>
  readonly remainingQuota: Prisma.FieldRef<"Msisdn", 'Float'>
  readonly lastScrapedAt: Prisma.FieldRef<"Msisdn", 'DateTime'>
  readonly isExhausted: Prisma.FieldRef<"Msisdn", 'Boolean'>
  readonly createdAt: Prisma.FieldRef<"Msisdn", 'DateTime'>
  readonly updatedAt: Prisma.FieldRef<"Msisdn", 'DateTime'>
}


// Custom InputTypes
/**
 * Msisdn findUnique
 */
export type MsisdnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter, which Msisdn to fetch.
   */
  where: Prisma.MsisdnWhereUniqueInput
}

/**
 * Msisdn findUniqueOrThrow
 */
export type MsisdnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter, which Msisdn to fetch.
   */
  where: Prisma.MsisdnWhereUniqueInput
}

/**
 * Msisdn findFirst
 */
export type MsisdnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter, which Msisdn to fetch.
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Msisdns to fetch.
   */
  orderBy?: Prisma.MsisdnOrderByWithRelationInput | Prisma.MsisdnOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Msisdns.
   */
  cursor?: Prisma.MsisdnWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Msisdns from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Msisdns.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Msisdns.
   */
  distinct?: Prisma.MsisdnScalarFieldEnum | Prisma.MsisdnScalarFieldEnum[]
}

/**
 * Msisdn findFirstOrThrow
 */
export type MsisdnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter, which Msisdn to fetch.
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Msisdns to fetch.
   */
  orderBy?: Prisma.MsisdnOrderByWithRelationInput | Prisma.MsisdnOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for searching for Msisdns.
   */
  cursor?: Prisma.MsisdnWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Msisdns from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Msisdns.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Msisdns.
   */
  distinct?: Prisma.MsisdnScalarFieldEnum | Prisma.MsisdnScalarFieldEnum[]
}

/**
 * Msisdn findMany
 */
export type MsisdnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter, which Msisdns to fetch.
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
   * 
   * Determine the order of Msisdns to fetch.
   */
  orderBy?: Prisma.MsisdnOrderByWithRelationInput | Prisma.MsisdnOrderByWithRelationInput[]
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
   * 
   * Sets the position for listing Msisdns.
   */
  cursor?: Prisma.MsisdnWhereUniqueInput
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Take `±n` Msisdns from the position of the cursor.
   */
  take?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
   * 
   * Skip the first `n` Msisdns.
   */
  skip?: number
  /**
   * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
   * 
   * Filter by unique combinations of Msisdns.
   */
  distinct?: Prisma.MsisdnScalarFieldEnum | Prisma.MsisdnScalarFieldEnum[]
}

/**
 * Msisdn create
 */
export type MsisdnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * The data needed to create a Msisdn.
   */
  data: Prisma.XOR<Prisma.MsisdnCreateInput, Prisma.MsisdnUncheckedCreateInput>
}

/**
 * Msisdn createMany
 */
export type MsisdnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to create many Msisdns.
   */
  data: Prisma.MsisdnCreateManyInput | Prisma.MsisdnCreateManyInput[]
  skipDuplicates?: boolean
}

/**
 * Msisdn createManyAndReturn
 */
export type MsisdnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelectCreateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * The data used to create many Msisdns.
   */
  data: Prisma.MsisdnCreateManyInput | Prisma.MsisdnCreateManyInput[]
  skipDuplicates?: boolean
}

/**
 * Msisdn update
 */
export type MsisdnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * The data needed to update a Msisdn.
   */
  data: Prisma.XOR<Prisma.MsisdnUpdateInput, Prisma.MsisdnUncheckedUpdateInput>
  /**
   * Choose, which Msisdn to update.
   */
  where: Prisma.MsisdnWhereUniqueInput
}

/**
 * Msisdn updateMany
 */
export type MsisdnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * The data used to update Msisdns.
   */
  data: Prisma.XOR<Prisma.MsisdnUpdateManyMutationInput, Prisma.MsisdnUncheckedUpdateManyInput>
  /**
   * Filter which Msisdns to update
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * Limit how many Msisdns to update.
   */
  limit?: number
}

/**
 * Msisdn updateManyAndReturn
 */
export type MsisdnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelectUpdateManyAndReturn<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * The data used to update Msisdns.
   */
  data: Prisma.XOR<Prisma.MsisdnUpdateManyMutationInput, Prisma.MsisdnUncheckedUpdateManyInput>
  /**
   * Filter which Msisdns to update
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * Limit how many Msisdns to update.
   */
  limit?: number
}

/**
 * Msisdn upsert
 */
export type MsisdnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * The filter to search for the Msisdn to update in case it exists.
   */
  where: Prisma.MsisdnWhereUniqueInput
  /**
   * In case the Msisdn found by the `where` argument doesn't exist, create a new Msisdn with this data.
   */
  create: Prisma.XOR<Prisma.MsisdnCreateInput, Prisma.MsisdnUncheckedCreateInput>
  /**
   * In case the Msisdn was found with the provided `where` argument, update it with this data.
   */
  update: Prisma.XOR<Prisma.MsisdnUpdateInput, Prisma.MsisdnUncheckedUpdateInput>
}

/**
 * Msisdn delete
 */
export type MsisdnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
  /**
   * Filter which Msisdn to delete.
   */
  where: Prisma.MsisdnWhereUniqueInput
}

/**
 * Msisdn deleteMany
 */
export type MsisdnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Filter which Msisdns to delete
   */
  where?: Prisma.MsisdnWhereInput
  /**
   * Limit how many Msisdns to delete.
   */
  limit?: number
}

/**
 * Msisdn without action
 */
export type MsisdnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
  /**
   * Select specific fields to fetch from the Msisdn
   */
  select?: Prisma.MsisdnSelect<ExtArgs> | null
  /**
   * Omit specific fields from the Msisdn
   */
  omit?: Prisma.MsisdnOmit<ExtArgs> | null
}
