export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random())
export const buildUrl = (url, params) => {
    let urlWirhParams = url;
    Object.entries(params).forEach(([key, value], i) => {
        const sign = !i ? '?' : '&';
        urlWirhParams += `${sign}${key}=${value}`;
    })
    return urlWirhParams;
}

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);