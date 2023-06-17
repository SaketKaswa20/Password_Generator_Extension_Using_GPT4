document.addEventListener('DOMContentLoaded', function() {
  const lengthInput = document.getElementById('length');
  const specialCheckbox = document.getElementById('special');
  const numbersCheckbox = document.getElementById('numbers');
  const generateButton = document.getElementById('generate');
  const passwordOutput = document.getElementById('password');
  const copyButton = document.getElementById('copy');

  generateButton.addEventListener('click', function() {
    const length = parseInt(lengthInput.value);
    const includeSpecial = specialCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;

    const generatedPassword = generatePassword(length, includeSpecial, includeNumbers);
    passwordOutput.innerText = generatedPassword;

    if (generatedPassword) {
      copyButton.classList.remove('hidden');
    } else {
      copyButton.classList.add('hidden');
    }
  });

  copyButton.addEventListener('click', function() {
    const password = passwordOutput.innerText;
    navigator.clipboard.writeText(password)
      .then(function() {
        alert('Password copied to clipboard!');
      })
      .catch(function() {
        alert('Failed to copy password to clipboard.');
      });
  });
});

function generatePassword(length, includeSpecial, includeNumbers) {
  if (length < 8 || length > 128) {
    return 'Password length must be between 8 and 128';
  }

  let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  if (includeSpecial) charset += '!@#$%^&*';
  if (includeNumbers) charset += '0123456789';

  let generatedPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    generatedPassword += charset.charAt(randomIndex);
  }

  return generatedPassword;
}

