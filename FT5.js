document.addEventListener('DOMContentLoaded', function() {
    const footerImages = document.querySelectorAll('.footer-img');
    let overlayActive = false;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'fullscreen-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.97)',
        zIndex: '1000',
        transform: 'translateY(100%)',
        transition: 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Montserrat, sans-serif',
        padding: '20px',
        boxSizing: 'border-box'
    });

    // Create container for circular images
    const circlesContainer = document.createElement('div');
    circlesContainer.className = 'circles-container';
    Object.assign(circlesContainer.style, {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        maxWidth: '800px'
    });

    // Image data
    const circleImages = [
        {
            id: 'github',
            src: './SOCIAL/github.png',
            alt: 'GitHub',
            url: 'https://github.com'
        },
        {
            id: 'telegram',
            src: './SOCIAL/telegram.png',
            alt: 'Telegram',
            url: 'https://telegram.org'
        },
        {
            id: 'youtube',
            src: './SOCIAL/youtube.png',
            alt: 'YouTube',
            url: 'https://youtube.com'
        },
        {
            id: 'zfisher',
            src: './IMG/PurpleCAT.jpg',
            alt: 'ZFISHER!',
            url: '#'
        }
    ];

    // Create circular images
    circleImages.forEach(imgData => {
        const circleLink = document.createElement('a');
        circleLink.href = imgData.url;
        circleLink.target = '_blank';
        circleLink.className = 'circle-link';
        
        const circle = document.createElement('div');
        circle.className = 'circle-img';
        circle.id = imgData.id;
        Object.assign(circle.style, {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: `url(${imgData.src}) center/cover no-repeat`,
            border: '3px solid rgba(255,255,255,0.2)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        });

        // Add hover effect
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.1)';
            circle.style.borderColor = 'rgba(255, 0, 221, 0.8)';
            circle.style.boxShadow = '0 15px 30px rgba(247, 79, 171, 0.4)';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1)';
            circle.style.borderColor = 'rgba(255,255,255,0.2)';
            circle.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        });

        circleLink.appendChild(circle);
        circlesContainer.appendChild(circleLink);
    });

    // Add close button
    const closeButton = document.createElement('div');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    Object.assign(closeButton.style, {
        position: 'absolute',
        top: '30px',
        right: '30px',
        fontSize: '30px',
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        transition: 'all 0.3s ease'
    });

    // Add hover effect to close button
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255,255,255,0.2)';
        closeButton.style.transform = 'rotate(90deg)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.transform = 'rotate(0deg)';
    });

    overlay.appendChild(circlesContainer);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);

    // Toggle overlay function
    function toggleOverlay() {
        overlayActive = !overlayActive;
        overlay.style.transform = overlayActive ? 'translateY(0)' : 'translateY(100%)';
        document.body.style.overflow = overlayActive ? 'hidden' : '';
    }

    // Event listeners
    footerImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', toggleOverlay);
    });

    closeButton.addEventListener('click', toggleOverlay);

    // Close when clicking outside circles
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            toggleOverlay();
        }
    });
});