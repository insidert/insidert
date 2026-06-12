/**
 * Client-side prose enhancements — callouts, drop cap, code copy, lightbox
 */
export function enhanceArticle() {
  const prose = document.querySelector('.prose');
  if (!prose) return;

  enhanceDropCap(prose);
  enhanceCallouts(prose);
  enhanceCodeBlocks(prose);
  enhanceImages(prose);
}

const CALLOUT_PATTERNS: Array<{ match: RegExp; type: string; icon: string; label: string }> = [
  { match: /lesson learned/i, type: 'lesson', icon: '💡', label: 'Lesson Learned' },
  { match: /key takeaway/i, type: 'takeaway', icon: '→', label: 'Key Takeaway' },
  { match: /experiment/i, type: 'experiment', icon: '🧪', label: 'Experiment' },
  { match: /observation/i, type: 'observation', icon: '👁', label: 'Observation' },
  { match: /warning/i, type: 'warning', icon: '⚠', label: 'Warning' },
  { match: /\btip\b/i, type: 'tip', icon: '✦', label: 'Tip' },
  { match: /\bnote\b/i, type: 'note', icon: '📝', label: 'Note' },
];

function enhanceDropCap(prose: Element) {
  const firstP = prose.querySelector(':scope > p');
  if (firstP) firstP.classList.add('drop-cap');
}

function enhanceCallouts(prose: Element) {
  prose.querySelectorAll('blockquote').forEach((bq) => {
    if (bq.classList.contains('callout')) return;

    const firstP = bq.querySelector('p:first-child');
    const strong = firstP?.querySelector('strong');
    if (!strong) return;

    const labelText = strong.textContent?.trim() ?? '';
    const pattern = CALLOUT_PATTERNS.find((p) => p.match.test(labelText));
    if (!pattern) return;

    bq.classList.add('callout', `callout--${pattern.type}`);

    const label = document.createElement('p');
    label.className = 'callout__label';
    label.textContent = `${pattern.icon} ${pattern.label}`;

    strong.remove();
    if (firstP && firstP.textContent?.trim() === '') firstP.remove();

    bq.insertBefore(label, bq.firstChild);
  });

  prose.querySelectorAll('.insight, [data-insight]').forEach((el) => {
    el.classList.add('insight');
  });
}

function enhanceCodeBlocks(prose: Element) {
  prose.querySelectorAll('pre').forEach((pre) => {
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      } catch { /* noop */ }
    });
    wrapper.appendChild(btn);
  });
}

function enhanceImages(prose: Element) {
  let lightbox: HTMLButtonElement | null = null;

  prose.querySelectorAll('img').forEach((img) => {
    if (img.closest('figure')) return;

    const figure = document.createElement('figure');
    img.parentNode?.insertBefore(figure, img);
    figure.appendChild(img);

    img.addEventListener('click', () => {
      if (!lightbox) {
        lightbox = document.createElement('button');
        lightbox.className = 'image-lightbox';
        lightbox.setAttribute('aria-label', 'Close image');
        lightbox.hidden = true;
        lightbox.addEventListener('click', () => { lightbox!.hidden = true; });
        document.body.appendChild(lightbox);
      }
      lightbox.innerHTML = '';
      const clone = img.cloneNode(true) as HTMLImageElement;
      clone.style.cursor = 'default';
      lightbox.appendChild(clone);
      lightbox.hidden = false;
    });
  });
}
