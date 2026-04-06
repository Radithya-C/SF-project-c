// ============================
//  SHIFT MALAM — index.js
//  Simple, beginner-friendly JS
// ============================

// --- Wait until the page is fully loaded ---
document.addEventListener("DOMContentLoaded", function () {

  // ============================
  // 1. MOBILE NAVBAR TOGGLE
  // ============================
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      navMobile.classList.toggle("open");
    });

    // Close mobile nav when a link is clicked
    var mobileLinks = navMobile.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("open");
      });
    });
  }


  // ============================
  // 2. CATEGORY FILTER
  // ============================
  var categoryButtons = document.querySelectorAll(".cat-btn");
  var cards = document.querySelectorAll(".card");
  var noResults = document.getElementById("noResults");

  // Keep track of active category and search text
  var activeCategory = "semua";
  var searchText = "";

  // Function to show/hide cards based on category and search
  function filterCards() {
    var visibleCount = 0;

    cards.forEach(function (card) {
      var cardCategory = card.getAttribute("data-category");
      var cardTitle = card.getAttribute("data-title").toLowerCase();
      var cardDesc = card.querySelector(".card-desc").textContent.toLowerCase();

      // Check if card matches the active category
      var matchCategory = (activeCategory === "semua") || (cardCategory === activeCategory);

      // Check if card matches the search text
      var matchSearch = (searchText === "") ||
        cardTitle.includes(searchText) ||
        cardDesc.includes(searchText);

      if (matchCategory && matchSearch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    // Show "no results" message if nothing is visible
    if (visibleCount === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }

  // Add click event to each category button
  categoryButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Remove "active" class from all buttons
      categoryButtons.forEach(function (b) {
        b.classList.remove("active");
      });

      // Add "active" class to the clicked button
      btn.classList.add("active");

      // Update active category
      activeCategory = btn.getAttribute("data-category");

      // Run the filter
      filterCards();
    });
  });


  // ============================
  // 3. SEARCH / FILTER INPUT
  // ============================
  var searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      // Get the current search text (lowercase for easy comparison)
      searchText = searchInput.value.toLowerCase().trim();

      // Run the filter
      filterCards();
    });
  }


  // ============================
  // 4. CONTACT FORM SUBMIT
  // ============================
  var contactForm = document.getElementById("contactForm");
  var formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // Prevent the page from reloading
      event.preventDefault();

      // Get form values
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var message = document.getElementById("message").value.trim();

      // Simple check: make sure all fields are filled
      if (name === "" || email === "" || message === "") {
        alert("Harap isi semua field sebelum mengirim pesan.");
        return;
      }

      // Log the data to the console (simulating a submit)
      console.log("=== Pesan Baru dari Shift Malam ===");
      console.log("Nama    :", name);
      console.log("Email   :", email);
      console.log("Pesan   :", message);
      console.log("===================================");

      // Show success message
      if (formSuccess) {
        formSuccess.classList.add("visible");
      }

      // Reset the form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(function () {
        if (formSuccess) {
          formSuccess.classList.remove("visible");
        }
      }, 5000);
    });
  }


  // ============================
  // 5. SMOOTH ACTIVE NAV LINK
  //    (Highlight nav link based
  //     on scroll position)
  // ============================
  var sections = document.querySelectorAll("section[id]");
  var navLinksList = document.querySelectorAll(".nav-links a");

  function updateActiveNavLink() {
    var scrollPos = window.scrollY + 80; // offset for navbar height

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksList.forEach(function (link) {
          link.style.color = "";
          if (link.getAttribute("href") === "#" + sectionId) {
            link.style.color = "#e8e4dc"; // text-primary color
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

}); // end DOMContentLoaded

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id
    window.location.href = "artikel.html?id=" + id
  })
})



