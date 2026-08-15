document.addEventListener('DOMContentLoaded', () => {
  // 1. Логика кастомного курсора
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Прямой точечный курсор
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  // Плавное следование окружности курсора
  function renderCursor() {
    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;

    if (follower) {
      follower.style.left = `${posX - 18}px`;
      follower.style.top = `${posY - 18}px`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // 2. Трекинг мыши над карточками для эффекта свечения (Glow)
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Анимация появления элементов при скролле (Scroll Reveal)
  const reveals = document.querySelectorAll('.reveal');

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Инициализация при первой загрузке
});

// Открытие и закрытие окна обратной связи
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

if (openBtn) {
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

// Закрытие при клике мимо окна
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeModal');

  // Находим ВСЕ ссылки с классом cta-btn и текстом "Связаться"
  const buttons = document.querySelectorAll('.cta-btn');

  buttons.forEach(btn => {
    if (btn.textContent.trim() === 'Связаться') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
          modal.classList.add('active');
        } else {
          alert('Ошибочка: в HTML нет блока с id="contactModal"!');
        }
      });
    }
  });

  // Закрытие на крестик
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Закрытие при клике мимо окна
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeModal');

  const ctaButtons = document.querySelectorAll('.cta-btn');
  ctaButtons.forEach(btn => {
    if (btn.tagName === 'A') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) {
          modal.classList.add('active');
        }
      });
    }
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

// ==========================================
// ЛОГИКА ОКИА "АРЕНДОВАТЬ ДОМ"
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const rentModal = document.getElementById('rentModal');
  const closeRentBtn = document.getElementById('closeRentModal');
  const houseItems = document.querySelectorAll('.house-item');
  const selectedInput = document.getElementById('selectedHouseInput');

  // Выбор дома при клике
  houseItems.forEach(item => {
    item.addEventListener('click', () => {
      houseItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const houseName = item.getAttribute('data-house');
      if (selectedInput) {
        selectedInput.value = houseName;
      }
    });
  });

  // Открытие окна по клику на любую кнопку с текстом "Арендовать"
  const allButtons = document.querySelectorAll('.cta-btn, .btn');
  allButtons.forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes('арендовать')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (rentModal) rentModal.classList.add('active');
      });
    }
  });

  // Закрытие
  if (closeRentBtn && rentModal) {
    closeRentBtn.addEventListener('click', () => rentModal.classList.remove('active'));
  }

  if (rentModal) {
    rentModal.addEventListener('click', (e) => {
      if (e.target === rentModal) rentModal.classList.remove('active');
    });
  }
});

// Автоматический перенаправление формы в ЛС Telegram
document.addEventListener('DOMContentLoaded', () => {
  const tgForm = document.getElementById('tgRedirectForm');

  if (tgForm) {
    tgForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const message = document.getElementById('userMessage').value.trim();

      // Формируем текст для сообщения
      const fullText = `Привет! Меня зовут ${name}.\n${message}`;

      // Кодируем текст для URL-ссылки
      const encodedText = encodeURIComponent(fullText);

      // Открываем диалог с @R_gotW с готовым текстом
      window.open(`https://t.me/R_gotW?text=${encodedText}`, '_blank');
    });
  }
});

// ==========================================
// ЛОГИКА КНОПКИ "УЗНАТЬ БОЛЬШЕ"
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const aboutModal = document.getElementById('aboutModal');
  const closeAboutModal = document.getElementById('closeAboutModal');
  const closeAboutBtn = document.getElementById('closeAboutBtn');
  const moreInfoBtn = document.getElementById('moreInfoBtn');

  // Открытие окна по клику на "Узнать больше"
  if (moreInfoBtn) {
    moreInfoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 1. Плавно скроллим к секции возможностей/преимущества
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }

      // 2. Открываем модальное окно
      if (aboutModal) {
        setTimeout(() => {
          aboutModal.classList.add('active');
        }, 300);
      }
    });
  }

  // Закрытие окна
  const closeModalHandler = () => {
    if (aboutModal) aboutModal.classList.remove('active');
  };

  if (closeAboutModal) closeAboutModal.addEventListener('click', closeModalHandler);
  if (closeAboutBtn) closeAboutBtn.addEventListener('click', closeModalHandler);

  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) closeModalHandler();
    });
  }
});


// ==========================================
// ЛОГИКА АРЕНДЫ С ПЕРЕНАПРАВЛЕНИЕМ В ТЕЛЕГРАМ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const rentModal = document.getElementById('rentModal');
  const closeRentBtn = document.getElementById('closeRentModal');
  const houseItems = document.querySelectorAll('.house-item');
  const selectedInput = document.getElementById('selectedHouseInput');
  const rentForm = document.getElementById('rentTgRedirectForm');

  // Выбор дома при клике
  houseItems.forEach(item => {
    item.addEventListener('click', () => {
      houseItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const houseName = item.getAttribute('data-house');
      if (selectedInput) {
        selectedInput.value = houseName;
      }
    });
  });

  // Открытие модалки аренды при клике на кнопки с текстом "Арендовать"
  const allButtons = document.querySelectorAll('.cta-btn, .btn');
  allButtons.forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes('арендовать')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (rentModal) rentModal.classList.add('active');
      });
    }
  });

  // Перенаправление в Telegram при отправке формы аренды
  if (rentForm) {
    rentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const house = selectedInput.value;
      const nick = document.getElementById('mcNick').value.trim();
      const duration = document.getElementById('rentDuration').value;

      // Сборка сообщения для ТГ
      const text = `🏠 *Заявка на аренду дома с сайта!*\n\n` +
                   `▪ *Выбранный дом:* ${house}\n` +
                   `▪ *Ник в Minecraft:* ${nick}\n` +
                   `▪ *Срок аренды:* ${duration} нед.`;

      const encodedText = encodeURIComponent(text);

      // Открываем диалог с @R_gotW
      window.open(`https://t.me/R_gotW?text=${encodedText}`, '_blank');
      
      if (rentModal) rentModal.classList.remove('active');
    });
  }

  // Закрытие
  if (closeRentBtn && rentModal) {
    closeRentBtn.addEventListener('click', () => rentModal.classList.remove('active'));
  }

  if (rentModal) {
    rentModal.addEventListener('click', (e) => {
      if (e.target === rentModal) rentModal.classList.remove('active');
    });
  }
});



// ==========================================
// ЛОГИКА ОКНА "КУПИТЬ КИТ" С ТЕЛЕГРАМ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const kitModal = document.getElementById('kitModal');
  const openKitBtn = document.getElementById('openKitModalBtn');
  const closeKitBtn = document.getElementById('closeKitModal');
  const kitItems = document.querySelectorAll('.kit-item');
  const selectedKitInput = document.getElementById('selectedKitInput');
  const kitForm = document.getElementById('kitTgRedirectForm');

  // Открытие окна по кнопке
  if (openKitBtn) {
    openKitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (kitModal) kitModal.classList.add('active');
    });
  }

  // Также открываем по любой кнопке с текстом "Купить кит"
  const allButtons = document.querySelectorAll('.cta-btn, .btn');
  allButtons.forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes('купить кит')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (kitModal) kitModal.classList.add('active');
      });
    }
  });

  // Переключение китов при клике
  kitItems.forEach(item => {
    item.addEventListener('click', () => {
      kitItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const kitName = item.getAttribute('data-kit');
      if (selectedKitInput) {
        selectedKitInput.value = kitName;
      }
    });
  });

  // Отправка заявки в Telegram
  if (kitForm) {
    kitForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const kit = selectedKitInput.value;
      const nick = document.getElementById('kitMcNick').value.trim();
      const amount = document.getElementById('kitAmount').value;

      // Текст сообщения для ТГ
      const text = `🛒 *Заявка на покупку кита с сайта!*\n\n` +
                   `▪ *Выбранный кит:* ${kit}\n` +
                   `▪ *Ник в Minecraft:* ${nick}\n` +
                   `▪ *Количество:* ${amount} шт.`;

      const encodedText = encodeURIComponent(text);

      // Переход в чат с @R_gotW
      window.open(`https://t.me/R_gotW?text=${encodedText}`, '_blank');
      
      if (kitModal) kitModal.classList.remove('active');
    });
  }

  // Закрытие
  if (closeKitBtn && kitModal) {
    closeKitBtn.addEventListener('click', () => kitModal.classList.remove('active'));
  }

  if (kitModal) {
    kitModal.addEventListener('click', (e) => {
      if (e.target === kitModal) kitModal.classList.remove('active');
    });
  }
});


// Внутри обработки отправки формы аренды:
const house = selectedInput.value;
const nick = document.getElementById('mcNick').value.trim();
const duration = parseInt(document.getElementById('rentDuration').value) || 1;

// Определяем цену в зависимости от этажа
let pricePerWeek = 100;
if (house.includes('2-4')) pricePerWeek = 150;
if (house.includes('5-ый')) pricePerWeek = 300;

const totalPrice = pricePerWeek * duration;

const text = `🏠 *Заявка на аренду этажа!*\n\n` +
             `▪ *Вариант:* ${house}\n` +
             `▪ *Ник:* ${nick}\n` +
             `▪ *Срок:* ${duration} нед.\n` +
             `▪ *Итого к оплате:* ~${totalPrice}к`;

const encodedText = encodeURIComponent(text);
window.open(`https://t.me/R_gotW?text=${encodedText}`, '_blank');
