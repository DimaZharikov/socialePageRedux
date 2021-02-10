
import {ComponentType, Suspense} from "react"

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div>loading...</div>} >
            <WrappedComponent {...props} />
        </Suspense>
    }
}