import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { setLanguage } from './languageSlice';
import { translations } from './translations';

function LanguageSwitcher() {
  const lang = useSelector((state: RootState) => state.language.current);
  const dispatch = useDispatch<AppDispatch>();
  const t = translations[lang];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{t.title}</h1>
      <label>{t.switchLabel}: </label>
      <select
        value={lang}
        onChange={(e) => dispatch(setLanguage(e.target.value as 'en' | 'vi'))}
      >
        <option value="vi">{t.vietnamese}</option>
        <option value="en">{t.english}</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;