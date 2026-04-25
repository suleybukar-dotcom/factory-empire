export const formatNumber = (value = 0) => {
  const num = Number(value) || 0;
  if (num < 1000) return `${Math.floor(num)}`;

  const suffixes = ['K', 'M', 'B', 'T'];
  let index = -1;
  let display = num;

  while (display >= 1000 && index < suffixes.length - 1) {
    display /= 1000;
    index += 1;
  }

  return `${display.toFixed(display >= 10 ? 0 : 1)}${suffixes[index]}`;
};

export const formatPercent = (value = 0) => `${Math.round((Number(value) || 0) * 100)}%`;
