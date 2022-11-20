import { SubmissionHandler, useField, useForm } from "vee-validate";
import * as yup from "yup";

export function useRequestForm(fn: SubmissionHandler<Record<string, any>, unknown>) {
    const { isSubmitting, handleSubmit } = useForm<Record<string, any>>({
        initialValues: {
            status: "active",
        },
    });

    const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
        "fio",
        yup
            .string()
            .trim()
            .required("Обязательное поле")
    );
    const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
        "phone",
        yup
            .string()
            .trim()
            .required("Обязательное поле")
    );
    const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
        "amount",
        yup
            .number()
            .required("Обязательное поле")
            .min(0, "Сумма не может быть меньше нуля")
    );
    const { value: status } = useField<string>("status");

    const onSubmit = handleSubmit(fn);

    return {
        isSubmitting,
        onSubmit,
        fio,
        fError,
        fBlur,
        phone,
        pError,
        pBlur,
        amount,
        aError,
        aBlur,
        status,
    };
}
