export const numPatterns = {
    'pos_int_number' : /^[0-9]*$/,
    'int_number': /^-?[0-9]*$/,
    'float_number' : /^-?[0-9]*(\.[0-9]+)?$/,
    'pos_float_number' : /^[0-9]*(\.[0-9]+)?$/,
};

export const restrictedNumPatterns = {
    'pos_int_number' : /^[0-9]*$/,
    'int_number': /^-?[0-9]*$/,
    'float_number' : /^-?[0-9]*(\.[0-9]*)?$/,
    'pos_float_number' : /^[0-9]*(\.[0-9]*)?$/,
};

export const alphabetPatterns = {
    'alphabet' : /^[A-z]|[Ø§-Û]/,
    'en_alphabet': /^[A-z]/,
    'fa_alphabet' : /^[Ø§-Û]/,
    'alphabet_and_number' : /^[0-9]|[A-z]|[Ø§-Û]/,
};







