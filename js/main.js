
const navEl = document.querySelector('.nav');
const hamburgerEl = document.querySelector('.hamburger');
const navItems = document.querySelectorAll('.nav__item');

document.addEventListener('click', (event) => {

  const isClickInsideNav = navEl.contains(event.target);
  const isClickInsideHamburger = hamburgerEl.contains(event.target);

  if (!isClickInsideNav && !isClickInsideHamburger) {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  }
});

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('nav--open');
  hamburgerEl.classList.toggle('hamburger--open');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  });
});


if (window.matchMedia("(max-width: 435px)").matches) {
  const columns = document.querySelectorAll('article');
  const appearOptions = {
    rootMargin: "0px",
    threshold: 0.75
  };

  const appearOnScroll = new IntersectionObserver(
    (entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove( "active"); 
        }
        else {
          entry.target.classList.add( "active"); 
        }
      });
    },
    appearOptions
  );

  columns.forEach(wrap => {
    appearOnScroll.observe(wrap);
  });
}
  

const accordionHeaders = document.querySelectorAll('.accordion-header');
const accordionTexts = document.querySelectorAll('.accordion-text');
const progressBarSteps = document.querySelectorAll('.progress-bar__step');

let activeIndex = -1; // index of currently active accordion text

accordionHeaders.forEach((header, index) => {
  header.addEventListener('click', () => {
    if (index === activeIndex) {
      // clicked on currently active header, do nothing
      return;
    }
    
    if (index === activeIndex + 1) {
      // clicked on next header in sequence, activate it
      activateAccordion(index);
    } else {
      // clicked on non-sequential header, deactivate all and activate clicked header
      deactivateAll();
      activateAccordion(index);
    }
  });
});

progressBarSteps.forEach((step, index) => {
  step.addEventListener('click', () => {
    activateAccordion(index);
  });
});

function activateAccordion(index) {
  // deactivate all other accordion texts and progress bar steps
  deactivateAll();
  
  // activate clicked accordion text and corresponding progress bar step
  accordionTexts[index].classList.add('opened');
  progressBarSteps[index].classList.add('colored');
  accordionHeaders[index].classList.add('colored');
  
  activeIndex = index;
}

function deactivateAll() {
  // deactivate all accordion texts and progress bar steps
  accordionTexts.forEach(text => {
    text.classList.remove('opened');
  });
  
  progressBarSteps.forEach(step => {
    step.classList.remove('colored');
  });

  accordionHeaders.forEach(header => {
    header.classList.remove('colored');
  });
  
  activeIndex = -1;
}