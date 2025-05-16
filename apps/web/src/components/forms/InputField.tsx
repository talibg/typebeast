import { JSX } from 'react'
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from '../ui/form'
import { Input } from '../ui/input'
import { PasswordInput } from '../ui/password-input'
import type {
    Path,
    Control,
    ControllerProps,
    FieldValues,
} from 'react-hook-form'

export interface InputFieldProps<TFormValues extends FieldValues>
    extends Omit<
        ControllerProps<TFormValues, Path<TFormValues>>,
        'control' | 'name' | 'render'
    > {
    control: Control<TFormValues>
    name: Path<TFormValues>
    label: string
    type?: 'text' | 'email' | 'password'
    placeholder?: string
    autoComplete?: string
}

export const InputField = <TFormValues extends FieldValues = FieldValues>({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    autoComplete = '',
    ...props
}: InputFieldProps<TFormValues>): JSX.Element => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="grid gap-2">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <FormControl>
                    {type !== 'password' ? (
                        <Input
                            id={name}
                            placeholder={placeholder}
                            type={type}
                            autoComplete={autoComplete}
                            {...field}
                        />
                    ) : (
                        <PasswordInput
                            id={name}
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            {...field}
                            {...props}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
        {...props}
    />
)
