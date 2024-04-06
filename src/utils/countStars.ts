import { MILLION, THOUSAND } from "./constants";

// Функція для отримання кількості зірок у зручному форматі
// Наприклад, якщо num = 1500, поверне "1.5K"
 const countStars = (num: number): string => {
    let countedStars = "";

    if (num >= MILLION) {
        countedStars = Math.trunc(num / MILLION) + "M";
    }

    else if (num >= THOUSAND) {
        countedStars = Math.trunc(num / THOUSAND) + "K";
    }

    else {
        countedStars = num.toString();
    }

    return countedStars;
};

export default countStars;