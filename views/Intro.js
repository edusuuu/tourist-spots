const h1 = document.querySelector('.IntroSec h1');
const paragraphs = document.querySelectorAll('.IntroSec p');
const infoBtn = document.querySelector('.infoBtn');

h1.style.fontSize = '55px';
h1.style.marginBottom = '20px';

paragraphs.forEach((p) => {
  p.style.fontSize = '18px';
  p.style.marginBottom = '40px';
});

infoBtn.style.display = 'inline-block';
infoBtn.style.padding = '10px 20px';
infoBtn.style.backgroundColor = 'rgba(0, 0, 0, 0)';
infoBtn.style.color = '#fff';
infoBtn.style.textDecoration = 'none';
infoBtn.style.border = '3px solid #fff';
infoBtn.style.borderRadius = '4px';
infoBtn.style.transition = 'all 0.4s';
infoBtn.style.marginBottom = '260px';

infoBtn.addEventListener('mouseover', () => {
  infoBtn.style.backgroundColor = '#fff';
  infoBtn.style.color = '#000000';
  infoBtn.style.border = '3px solid #000000';
});

infoBtn.addEventListener('mouseout', () => {
  infoBtn.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  infoBtn.style.color = '#fff';
  infoBtn.style.border = '3px solid #fff';
});