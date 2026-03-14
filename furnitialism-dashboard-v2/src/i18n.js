import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useStore } from './store'

const I18nContext = createContext({ t: (key) => key, locale: 'en', loading: true })

function parseTranslationsXML(xmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'text/xml')
  const entries = doc.querySelectorAll('entry')
  const map = {}
  entries.forEach((entry) => {
    const key = entry.getAttribute('key')
    if (!key) return
    map[key] = entry.textContent || ''
  })
  return map
}

export function I18nProvider({ children }) {
  const locale = useStore((state) => state.locale)
  const [translations, setTranslations] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetch(`/locales/${locale}.xml`)
      .then((res) => res.text())
      .then((xml) => {
        if (!isMounted) return
        setTranslations(parseTranslationsXML(xml))
        setLoading(false)
      })
      .catch(() => {
        if (!isMounted) return
        setTranslations({})
        setLoading(false)
      })
    return () => { isMounted = false }
  }, [locale])

  const t = useMemo(() => {
    return (key, params = undefined) => {
      let value = translations[key] || key
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          value = value.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue))
        })
      }
      return value
    }
  }, [translations])

  return <I18nContext.Provider value={{ t, locale, loading }}>{children}</I18nContext.Provider>
}

export function useTranslation() { return useContext(I18nContext) }
