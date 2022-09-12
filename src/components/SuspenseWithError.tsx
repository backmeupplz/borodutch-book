import { ComponentChildren } from 'preact'
import { Suspense } from 'react'
import ChildrenProp from 'models/ChildrenProp'
import ErrorBoundary from 'components/ErrorBoundary'
import Loading from 'components/Loading'

export default function ({
  errorText,
  children,
  fallback,
}: ChildrenProp & { errorText: string; fallback?: ComponentChildren }) {
  return (
    <ErrorBoundary fallbackText={errorText}>
      <Suspense fallback={fallback || <Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
