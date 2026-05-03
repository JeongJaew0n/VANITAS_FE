export const formatPrice = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

export const formatCount = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

export const pad2 = (value: number) => String(value).padStart(2, '0');
