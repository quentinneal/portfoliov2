document.addEventListener("DOMContentLoaded", function() {

  // Immediately scroll to the top of the page
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });

  const video = document.getElementById('video');
  const body = document.body;
  const spinner = document.querySelector('.spinner');
  const container = document.querySelector('.container');
  const header = document.querySelector('.header');

  let loadTimeout = setTimeout(() => {
    // Code to execute if page takes more than 2 seconds to load
    body.classList.remove('no-scroll');
    spinner.classList.remove('spinner');
    container.classList.remove('hidden-site');
  }, 3000);
  
  // Function to remove no-scroll class
  const startSiteTransition = () => {
    if (!video.paused && video.readyState >= 3) { // Check if video is playing and has enough data
      clearTimeout(loadTimeout); // Cancel the timeout if video is ready
      body.classList.remove('no-scroll');
      spinner.classList.remove('spinner');
      container.classList.remove('hidden-site');
    }
  };

  // Attach event listeners 
  video.addEventListener('canplay', startSiteTransition);
  video.addEventListener('play', startSiteTransition);
  video.addEventListener('playing', startSiteTransition);
  video.addEventListener('canplaythrough', startSiteTransition);

  // Immediate check to handle cases where video is already playing
  startSiteTransition();

  // Function to add 'active' class to the current section link in the navigation menu
  function setActiveLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navigation a");

    let index = sections.length;

    while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[index].classList.add('active');
  }

  // Listen for scroll events to update the active navigation link
  window.addEventListener('scroll', setActiveLink);

  // Call setActiveLink on page load in case the page is not starting at the top
  setActiveLink();

   // Function to toggle 'menu-active' class on header when page is scrolled
   function toggleHeaderClassOnScroll() {
    const scrollThreshold = 10; // Set a threshold for when to add/remove the class

    if (window.scrollY > scrollThreshold) {
      header.classList.add('menu-active');
    } else {
      header.classList.remove('menu-active');
    }
  }

  // Listen for scroll events to toggle 'menu-active' class on header
  window.addEventListener('scroll', toggleHeaderClassOnScroll);
  
});