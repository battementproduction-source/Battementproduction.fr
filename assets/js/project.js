document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || urlParams.get('slug');

  const loadingEl = document.getElementById('project-loading');
  const errorEl = document.getElementById('project-error');
  const contentEl = document.getElementById('project-content');

  if (!projectId) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = "Aucun projet spécifié.";
    }
    return;
  }

  try {
    const response = await fetch('projects-data.json');
    if (!response.ok) throw new Error("Erreur de chargement des données");

    const data = await response.json();
    const projects = data.projects || data;
    const project = projects.find(p => p.id === projectId || p.slug === projectId);

    if (!project) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = "Projet introuvable.";
      }
      return;
    }

    document.title = `${project.title} — Battement Production`;

    const cardHeader = document.getElementById('card-brand-header');
    if (cardHeader && project.brandColor) {
      cardHeader.style.background = `linear-gradient(135deg, ${project.brandColor}, rgba(243,244,227,0.5))`;
    }

    const cardTitle = document.getElementById('card-project-title');
    if (cardTitle) cardTitle.textContent = project.title;

    const logoImg = document.getElementById('project-logo');
    if (logoImg) {
      if (project.logo) {
        logoImg.src = project.logo;
        logoImg.style.display = 'block';
      } else {
        logoImg.style.display = 'none';
      }
    }

    const capsuleEl = document.getElementById('project-capsule');
    if (capsuleEl) {
      if (project.excerpt && project.excerpt !== "À compléter") {
        capsuleEl.textContent = project.excerpt.replace(/\*/g, '');
        capsuleEl.style.display = 'inline-flex';
      } else {
        capsuleEl.style.display = 'none';
      }
    }

    const descEl = document.getElementById('project-description');
    if (descEl) {
      let rawText = project.description || project.intro || "";
      descEl.textContent = rawText.replace(/\*/g, '');
    }

    const highlightsContainer = document.getElementById('project-highlights');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = '';
      if (project.highlights && project.highlights.length > 0) {
        project.highlights.forEach(h => {
          const row = document.createElement('div');
          row.className = 'highlight-row';
          row.innerHTML = `
            <span class="highlight-label">${h.label}</span>
            <span class="highlight-text">${h.text}</span>
          `;
          highlightsContainer.appendChild(row);
        });
      }
    }

    const galleryGrid = document.getElementById('project-gallery-grid');
    if (galleryGrid) {
      galleryGrid.innerHTML = '';
      if (project.gallery && project.gallery.length > 0) {
        for (const item of project.gallery) {

          let thumbSrc = item.thumbnail || '';
          let ytFallback = '';

          if (!thumbSrc) {
            if (item.type === 'image') {
              thumbSrc = item.src || '';
            } else if (item.type === 'video') {
              thumbSrc = item.src || '';
            } else if (item.type === 'link') {
              const ytMatch = item.url && item.url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
              const ttMatch = item.url && item.url.match(/tiktok\.com/);

              if (ytMatch) {
                thumbSrc = `https://i.ytimg.com/vi/${ytMatch[1]}/hqdefault.jpg`;
                ytFallback = `https://i.ytimg.com/vi/${ytMatch[1]}/0.jpg`;
              } else if (ttMatch) {
                try {
                  const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(item.url)}`);
                  const json = await res.json();
                  thumbSrc = json.thumbnail_url || '';
                } catch (e) {
                  thumbSrc = `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=640&h=360`;
                }
              } else {
                thumbSrc = `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(item.url)}?w=640&h=360`;
              }
            }
          }

          const isYoutube   = item.type === 'link' && item.url && /youtube\.com|youtu\.be/.test(item.url);
          const isDrive     = item.type === 'link' && item.url && /drive\.google\.com/.test(item.url);
          const isTiktok    = item.type === 'link' && item.url && /tiktok\.com/.test(item.url);
          const isInstagram = item.type === 'link' && item.url && /instagram\.com/.test(item.url);
          const isFacebook  = item.type === 'link' && item.url && /facebook\.com/.test(item.url);
          const isVideoLink = isYoutube || isDrive || isTiktok || isInstagram || isFacebook;

          const icons = {
            image: `<svg viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
            video: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`,
            link:  `<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>`
          };

          let badgeClass = 'media-badge-link';
          let icon = icons.link;
          if (item.type === 'image') { badgeClass = 'media-badge-image'; icon = icons.image; }
          else if (item.type === 'video' || isVideoLink) { badgeClass = 'media-badge-video'; icon = icons.video; }

          const defaultTitles = {
            image: 'Visuel',
            video: 'Vidéo',
            link: isVideoLink ? 'Vidéo' : 'Site internet'
          };
          const mediaTitle = item.title || defaultTitles[item.type] || 'Contenu';

          const hoverLabels = {
            image: "l'image",
            video: 'la vidéo',
            link: isVideoLink ? 'la vidéo' : 'le site'
          };
          const hoverLabel = hoverLabels[item.type] || 'ce contenu';

          const wrapper = document.createElement('div');
          wrapper.className = 'media-wrapper';

          const mediaDiv = document.createElement('div');
          mediaDiv.className = 'media-item';
          mediaDiv.innerHTML = `
            ${thumbSrc ? `<img src="${thumbSrc}" alt="${mediaTitle}" onerror="this.src=this.dataset.fb;this.onerror=null;" data-fb="${ytFallback}">` : ''}
            <span class="media-badge ${badgeClass}">${icon}</span>
            <p class="media-title">${mediaTitle}</p>
            <div class="media-hover"><span>Cliquer pour découvrir ${hoverLabel}</span></div>
          `;

          mediaDiv.style.cursor = 'pointer';
          mediaDiv.addEventListener('click', () => {
            const modal = document.querySelector('.video-modal');
            const modalContainer = document.querySelector('.video-modal-container');
            if (!modal || !modalContainer) return;

            function openModal() {
              modal.classList.add('active');
              modal.style.display = 'flex';
              modal.style.opacity = '1';
              modal.style.pointerEvents = 'auto';
            }

            if (item.type === 'image') {
              modalContainer.innerHTML = `<img src="${thumbSrc}" style="width:auto; height:auto; max-width:90vw; max-height:90vh; object-fit:contain; border-radius:12px;">`;
              openModal();

            } else if (item.type === 'video') {
              modalContainer.innerHTML = `<video src="${item.src}" autoplay loop playsinline controls style="width:100%; max-height:90vh; border-radius:12px;"></video>`;
              openModal();

                        } else if (item.url) {
              const ytEmbedMatch = item.url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
              const driveMatch = item.url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);

                            const ratio = item.aspectRatio || (item.vertical ? '9/16' : '16/9');
              const [ratioW, ratioH] = ratio.split('/').map(Number);
              const heightFloor = window.innerWidth < 700 ? '45vh' : '0px'; // Espace mini pour la barre d'outils Drive sur mobile
              const fitStyle = `width:min(90vw, calc(90vh * ${ratioW} / ${ratioH})); height:max(${heightFloor}, min(90vh, calc(90vw * ${ratioH} / ${ratioW}))); display:block; border-radius:12px; border:none;`;

              if (ytEmbedMatch) {
                const videoId = ytEmbedMatch[1];
                modalContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" style="${fitStyle}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
                openModal();

              } else if (driveMatch) {
                const driveId = driveMatch[1];
                modalContainer.innerHTML = `<iframe src="https://drive.google.com/file/d/${driveId}/preview" style="${fitStyle}" allow="autoplay" allowfullscreen></iframe>`;
                openModal();

              } else {
                window.open(item.url, '_blank');
              }
            }
          });

          wrapper.appendChild(mediaDiv);
          galleryGrid.appendChild(wrapper);
        }
      }

      const modal = document.querySelector('.video-modal');
      const modalContainer = document.querySelector('.video-modal-container');
      const closeBtns = document.querySelectorAll('.video-modal-close, .video-modal-backdrop');
      closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (modal) {
            modal.classList.remove('active');
            modal.removeAttribute('style');
            if (modalContainer) {
              modalContainer.innerHTML = '';
              modalContainer.removeAttribute('style');
            }
          }
        });
      });
    }

    if (loadingEl) loadingEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';

  } catch (error) {
    console.error(error);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = "Erreur lors du chargement du projet.";
    }
  }
});