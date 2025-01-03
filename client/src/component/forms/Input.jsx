import React from 'react'

import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
import { useField, ErrorMessage } from 'formik'

export default function CustomInput ({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <FormControl id={field.name} isInvalid={meta.touched && meta.error} pb='1'>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} />
            <FormErrorMessage>
                {
                    meta.touched && meta.error ? <ErrorMessage name={field.name} component="span"/> : null
                }
            </FormErrorMessage>
        </FormControl>
    )
}
