import type {
    ValidationRule,
    ValidationResult, FormFieldValue,
} from "./Form.types";

export const validateRules = (
    value: FormFieldValue,
    rules?: ValidationRule[],
): ValidationResult => {

    if (!rules || rules.length === 0) {
        return {
            isValid: true,
        };
    }

    for (const rule of rules) {

        // required
        if (rule.type === "required") {

            const invalid =
                value === undefined ||
                value === null ||
                value === "";

            if (invalid) {
                return {
                    isValid: false,
                    message:
                        rule.message ||
                        "این فیلد الزامی است",
                    type: "error",
                };
            }
        }

        // min
        if (rule.type === "min") {

            if (
                typeof value === "string" &&
                value.length < rule.value
            ) {
                return {
                    isValid: false,
                    message:
                        rule.message ||
                        `حداقل ${rule.value} کاراکتر`,
                    type: "error",
                };
            }
        }

        // max
        if (rule.type === "max") {

            if (
                typeof value === "string" &&
                value.length > rule.value
            ) {
                return {
                    isValid: false,
                    message:
                        rule.message ||
                        `حداکثر ${rule.value} کاراکتر`,
                    type: "error",
                };
            }
        }

        if (rule.type === "email") {
            if ( typeof value !== "string" ||
                !/^\S+@\S+\.\S+$/.test(value)) {
                return {
                    isValid: false,
                    message: rule.message || "ایمیل نامعتبر است",
                    type: "error",
                };
            }
        }

        if (rule.type === "mobile") {
            if ( typeof value !== "string" ||
                !/^09\d{9}$/.test(value)) {
                return {
                    isValid: false,
                    message: rule.message || "شماره موبایل نامعتبر است",
                    type: "error",
                };
            }
        }
        // -------------------------
        // regex
        // -------------------------
        if (rule.type === "regex") {

            if (rule.value &&  (typeof value !== "string" || !rule.value.test(value))) {
                return {
                    isValid: false,
                    message: rule.message || "فرمت ورودی اشتباه است",
                    type: "error",
                };
            }
        }

        // -------------------------
        // number
        // -------------------------
        if (rule.type === "number") {

            if (isNaN(Number(value))) {
                return {
                    isValid: false,
                    message: rule.message || "فقط عدد قابل قبول است",
                    type: "error",
                };
            }
        }

        // -------------------------
        // int
        // -------------------------
        if (rule.type === "int") {

            if ( typeof value !== "string" ||
                !/^-?\d+$/.test(value)) {
                return {
                    isValid: false,
                    message: rule.message || "فقط عدد صحیح قابل قبول است",
                    type: "error",
                };
            }
        }

        // -------------------------
        // float
        // -------------------------
        if (rule.type === "float") {

            if ( typeof value !== "string" ||
                !/^-?\d+(\.\d+)?$/.test(value)) {
                return {
                    isValid: false,
                    message: rule.message || "فقط عدد اعشاری قابل قبول است",
                    type: "error",
                };
            }
        }

        // -------------------------
        // positive number
        // -------------------------
        if (rule.type === "positiveNumber") {

            if (Number(value) < 0) {
                return {
                    isValid: false,
                    message: rule.message || "فقط عدد مثبت قابل قبول است",
                    type: "error",
                };
            }
        }


        //custom
        if (rule.type === "custom") {

            const message = rule.value?.(value);

            if (message) {
                return {
                    isValid: false,
                    message,
                    type: "error",
                };
            }
        }
    }

    return {
        isValid: true,
    };
};