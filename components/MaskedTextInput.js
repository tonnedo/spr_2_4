import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

export default function MaskedTextInput({ mask, value, onChangeText, placeholder, style }) {
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleTextChange = (text) => {
    let result = '';
    let index = 0;

    for (let char of text) {
      if (index >= mask.length) break;
      if (mask[index] === '9') {
        // Only digits
        if (/\d/.test(char)) {
          result += char;
          index++;
        }
      } else {
        // Static symbol
        if (char === mask[index]) {
          result += char;
          index++;
        } else {
          // Replace incorrect static character
          result += mask[index];
          if (/\d/.test(char)) {
            result += char;
            index++;
          }
        }
      }
    }

    while (index < mask.length && mask[index] !== '9') {
      result += mask[index];
      index++;
    }

    onChangeText(result);
    setCursorPosition(text.length);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      keyboardType="numeric"
      style={style}
    />
  );
}