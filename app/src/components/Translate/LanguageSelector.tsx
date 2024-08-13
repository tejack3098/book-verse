// LanguageSelector.tsx
import React from 'react';
import i18n from '../../i18n';
import { Container, Button } from './styles';

const LanguageSelector: React.FC = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      <Button onClick={() => changeLanguage('en')}>English</Button>
      <Button onClick={() => changeLanguage('te')}>Telugu</Button>
      <Button onClick={() => changeLanguage('ka')}>Kannada</Button>
      <Button onClick={() => changeLanguage('hi')}>Hindi</Button>
      <Button onClick={() => changeLanguage('ta')}>Tamil</Button>
      <Button onClick={() => changeLanguage('ma')}>Malayalam</Button>
      {/* Add more buttons for other languages as needed */}
    </Container>
  );
};

export default LanguageSelector;
