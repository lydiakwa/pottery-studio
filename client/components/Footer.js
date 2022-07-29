import React from 'react';

function Footer() {
  return (
    <footer className="footer mt-auto py-2">
      <div>FAQ | Return Policy</div>
      <div>
        <a href="https://instagram.com">
          <ion-icon name="logo-instagram"></ion-icon>
        </a>
        <ion-icon name="logo-twitter"></ion-icon>
        <ion-icon name="mail-outline"></ion-icon>
      </div>
      <div>© 2022 Pottery Studio LLC</div>
    </footer>
  );
}

export default Footer;
