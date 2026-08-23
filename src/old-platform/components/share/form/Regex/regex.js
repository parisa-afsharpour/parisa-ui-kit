import {FARSI_ALL_CHARACTER_CLASS, FARSI_ALPHABETS, FARSI_NUMBERS, LATIN_ALPHABETS, LATIN_NUMBERS, HYPHEN, UNDERLINE, DOT} from './UnicodeFarsi';

export const farsiHumanName ='^[' + FARSI_ALPHABETS + '\\s]*$';
export const allNumberAndCharacter="^[/\\-_" + FARSI_NUMBERS +LATIN_NUMBERS + LATIN_ALPHABETS + FARSI_ALPHABETS + "\\s]*$";
export const allNumber="^[/\\-_" + FARSI_NUMBERS +LATIN_NUMBERS + "\\s]*$";
export const userName="^[" + LATIN_ALPHABETS + LATIN_NUMBERS + "_" + "]*$";
export const stuffName=("^[" + FARSI_ALPHABETS + FARSI_NUMBERS + LATIN_ALPHABETS + LATIN_NUMBERS + "\\" + HYPHEN + UNDERLINE + "\\s]*$");


