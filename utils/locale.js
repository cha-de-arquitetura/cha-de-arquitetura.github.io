export function ResolveContentLocale(content, i18n) {
  return content + '/' + i18n.locale;
}

export function FormatDate(date, locale) {
  let iso = 'en-us';
  if (locale === 'pt') {
    iso = 'pt-br';
  }
  return new Intl.DateTimeFormat(iso).format(new Date(date));
}
