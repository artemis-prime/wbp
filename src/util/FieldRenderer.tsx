import React, { ReactElement } from 'react'
import selectn from 'selectn'

import { splitCamelOrPascalCase } from '.'

export interface FieldRenderDescriptor {
  name: string          // should contain no spaces... used as a unique id, and / or displayName. See below
  displayName? : string // if absent, splitCamelOrPascalCase() will be called on name
    // result is an array of string, representing desired lines of display.
  accessor: string | ((obj: any) => string[])  // either Selectn access string, or function
  preIcon?: ReactElement | ((obj: any) => ReactElement)   // either Icon, or render function
  render?(obj: any, desc: FieldRenderDescriptor): ReactElement    // renders whole row and icon (overrides default)
}

export interface RenderedFieldProps {
  valueArray: string[],
  name: string,
  displayName: string,
  preIcon?: ReactElement
}

const FieldRenderer: React.FC<{
  obj: any
  descs: FieldRenderDescriptor[]
  RenderedField: React.FC<RenderedFieldProps>
}> = ({
  obj,
  descs,
  RenderedField
}) => {

  const _renderIcon = (rowDesc: FieldRenderDescriptor): ReactElement | undefined => (
    (rowDesc.preIcon) ? 
      (typeof rowDesc.preIcon === 'function') ? rowDesc.preIcon(obj) as ReactElement : rowDesc.preIcon as ReactElement
      : undefined
  )

  const _renderField = (rowDesc: FieldRenderDescriptor): ReactElement => {
    let valueArray: string[] = [] 

    if (typeof rowDesc.accessor === 'string') {
      const accessed: any = selectn(rowDesc.accessor as string, obj)
      if (Array.isArray(accessed)) {
        accessed.forEach((el) => {valueArray.push(el)}) 
      } 
      else {
        valueArray.push(accessed + '')
      }
    }
    else {
      valueArray = rowDesc.accessor(obj)
    }
    const displayName = (rowDesc.displayName) ? rowDesc.displayName : splitCamelOrPascalCase(rowDesc.name)
    return <RenderedField valueArray={valueArray} name={rowDesc.name} displayName={displayName} preIcon={_renderIcon(rowDesc)} />
  }

  return (<>{descs.map((rowDesc) => (
    (rowDesc.render) ? rowDesc.render(obj, rowDesc) : (_renderField(rowDesc))
  ))}</>)
}

export default FieldRenderer