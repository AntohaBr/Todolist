import React from 'react'
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'
import {App} from './App';

export default {
    title: 'Application Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = (props: any) => {
    return (<App demo={true}/>)
}
