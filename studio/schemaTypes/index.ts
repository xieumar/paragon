import {blockTypes} from './blocks'
import {documentTypes} from './documents'
import {objectTypes} from './objects'

export const schemaTypes = [...documentTypes, ...blockTypes, ...objectTypes]
