<script setup lang="ts">
import ErrorMessage from "@/components/ErrorMessage.vue";
import {
    NxtButton,
    NxtDropdown,
    NxtInput,
    NxtSlider,
} from "@future-harry/nxt-styles";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import {
    email,
    minLength,
    required,
    requiredIf,
    sameAs,
} from "../utils/i18n-validators";

const { t, locale } = useI18n();

const formValues = ref({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    acceptTheTruth: "",
});

const gender = ref<"male" | "female" | "other">("male");

const genders = [{ id: "male" }, { id: "female" }, { id: "other" }];

const rules = computed(() => ({
    formValues: {
        name: {
            required,
        },
        email: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(8),
        },
        passwordConfirmation: {
            required,
            sameAs: sameAs(formValues.value.password),
        },
        acceptTheTruth: {
            requiredIf: requiredIf(() => {
                const randomNames = ["wout", "jens", "jonathan"];
                return randomNames.includes(
                    formValues.value.name.toLowerCase()
                );
            }),
            sameAs: sameAs("Ik ga akkoord dat ik TypeScript moet leren"),
        },
    },
    gender: {
        required,
        isRightGender: helpers.withMessage(
            () => t("validations.isRightGender"),
            (value: "male" | "female" | "other") => {
                const randomNames = ["wout", "jens", "jonathan"];
                return (
                    !randomNames.includes(
                        formValues.value.name.toLowerCase()
                    ) || value !== "male"
                );
            }
        ),
    },
}));

const validationValues = useVuelidate(rules, {
    formValues,
    gender,
});

function onSubmit() {
    validationValues.value.$validate();
    if (validationValues.value.$invalid) return;
}

// #region Language
const languageOptions = ref([
    { id: 0, name: "nl" },
    { id: 1, name: "en" },
    { id: 2, name: "fr" },
]);

const language = ref(
    languageOptions.value.find((l) => l.name === locale.value)?.id || 0
);

watch(language, changeLanguage);

function changeLanguage(languageId: number) {
    locale.value =
        languageOptions.value.find((l) => l.id === languageId)?.name || "nl";
}
// #endregion
</script>

<template>
    <div class="huge-form">
        <h1>Vuelidate</h1>
        <pre>The only date I can get</pre>
        <form @submit.prevent="onSubmit">
            <div>
                <NxtInput v-model="formValues.name" name="name" label="Naam" />
                <ErrorMessage
                    :errors="validationValues.formValues.name.$errors"
                />
            </div>
            <div>
                <NxtInput
                    v-model="formValues.email"
                    name="email"
                    label="E-mail"
                />
                <ErrorMessage
                    :errors="validationValues.formValues.email.$errors"
                />
            </div>
            <div>
                <NxtDropdown
                    v-model="gender"
                    label="Geslacht"
                    name="gender"
                    :options="genders"
                    :display-key="'id'"
                />
                <ErrorMessage :errors="validationValues.gender.$errors" />
            </div>
            <div>
                <NxtInput
                    v-model="formValues.password"
                    name="password"
                    label="Wachtwoord"
                    type="password"
                />
                <ErrorMessage
                    :errors="validationValues.formValues.password.$errors"
                />
            </div>
            <div>
                <NxtInput
                    v-model="formValues.passwordConfirmation"
                    name="password-confirmation"
                    label="Herhaal wachtwoord"
                    type="password"
                />
                <ErrorMessage
                    :errors="
                        validationValues.formValues.passwordConfirmation.$errors
                    "
                />
            </div>
            <div>
                <NxtInput
                    v-model="formValues.acceptTheTruth"
                    name="accept-the-truth"
                    label="Typ hier: Ik ga akkoord dat ik TypeScript moet leren"
                />
                <ErrorMessage
                    :errors="validationValues.formValues.acceptTheTruth.$errors"
                />
            </div>
            <NxtButton type="submit">Submit</NxtButton>
        </form>
        <NxtSlider
            v-model="language"
            class="language"
            name="language"
            :label="`Taal errors: ${languageOptions[language].name}`"
            :min="0"
            :max="2"
            :step="1"
        />
    </div>
</template>

<style scoped lang="scss">
.huge-form {
    margin: 0 auto;
    max-width: 450px;
}
form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

h1 {
    margin-bottom: unset;
}

pre {
    margin-top: unset;
}

:deep(.nxt-button) {
    margin-top: 1rem;
}
.language {
    position: absolute;
    bottom: 2rem;
    width: 450px;
}
</style>
