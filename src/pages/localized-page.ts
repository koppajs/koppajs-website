import {
  getKoppaLocale,
  KOPPAJS_LOCALE_CHANGE_EVENT,
} from "koppajs-documentation/i18n";

type LocaleChangeEvent = CustomEvent<{
  locale?: string;
}>;

export const createLocalizedPage = (contentDe: string) => ({
  state: {
    locale: getKoppaLocale(),
    contentDe,
  },
  methods: {
    handleLocaleChange(this: { locale: string }, event: Event) {
      this.locale =
        (event as LocaleChangeEvent).detail?.locale ?? getKoppaLocale();
    },
  },
  created(this: {
    locale: string;
    handleLocaleChange: (event: Event) => void;
  }) {
    this.locale = getKoppaLocale();
    window.addEventListener(KOPPAJS_LOCALE_CHANGE_EVENT, this.handleLocaleChange);
  },
  beforeDestroy(this: {
    handleLocaleChange: (event: Event) => void;
  }) {
    window.removeEventListener(
      KOPPAJS_LOCALE_CHANGE_EVENT,
      this.handleLocaleChange,
    );
  },
});
