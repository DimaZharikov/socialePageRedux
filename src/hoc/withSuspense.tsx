import React, {ComponentType, ReactNode} from "react"

class Suspense extends React.Component<{ fallback: JSX.Element, children: ReactNode }> {
    render() {
        return null;
    }
}

export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div>loading...</div>} >
            <WrappedComponent {...props} />
        </Suspense>
    }
}
