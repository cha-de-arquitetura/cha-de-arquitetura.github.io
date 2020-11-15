export function ResolveContentLocale(content, i18n) {
  return content + '/' + i18n.locale;
}

export function FormatDate(date, i18n) {
  let iso = 'en-US';
  if (i18n.locale === 'pt') {
    iso = 'pt-BR';
  }
  return new Intl.DateTimeFormat(iso).format(new Date(date));
}
