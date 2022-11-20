import { useForm, useField } from "vee-validate";
import { watch, computed } from "vue";
import * as yup from "yup";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export function useLoginForm() {
    const store = useStore();
    const router = useRouter();

    const { handleSubmit, isSubmitting, submitCount } = useForm();

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
        "email",
        yup
            .string()
            .trim()
            .required("Обязательное поле")
            .email()
    );
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
        "password",
        yup
            .string()
            .trim()
            .required("Обязательное поле")
            .min(6)
    );

    const isTooManyAttempts = computed(() => submitCount.value >= 3);
    watch(isTooManyAttempts, (val) => {
        if (val) {
            setTimeout(() => (submitCount.value = 0), 1500);
        }
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await store.dispatch("auth/login", values);
            router.push("/");
        } catch (error) {}
    });

    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    };
}
