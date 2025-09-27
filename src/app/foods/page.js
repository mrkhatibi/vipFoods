"use client"

import Loader from "@/components/modules/loader/Loader"
import FoodsPage from "@/components/templates/FoodsPage"
import { Suspense } from "react"

function Foods() {
  return (
    <Suspense fallback={<Loader />}>
      <FoodsPage />
    </Suspense>
  )
}

export default Foods