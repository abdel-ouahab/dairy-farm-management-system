import React from 'react'

import { useField, ErrorMessage } from 'formik'
import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react'

export default function CustomSelect (props) {
    const [field, meta] = useField(props)
    return (
        <>
            <FormControl>
                <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
                <Select {...field} {...props} value={meta.value} isInvalid={meta.touched && meta.error} errorBorderColor='crimson'>
                    { props.children }
                </Select>
                <Text pt='1' fontSize='sm' color={'crimson'}>
                    <ErrorMessage name={field.name} component="span"/>
                </Text>
            </FormControl>
        </>
    )
}
