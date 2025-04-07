const apiKey = 'YOUR_API_KEY'; // Replace with your TMDB API key

function searchMovies() {
  const query = document.getElementById('movie-input').value;
  if (!query) {
    alert("Please enter a movie name!");
    return;
  }

  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayMovies(data.results))
    .catch(err => console.error("Error fetching data:", err));
}

function displayMovies(movies) {
  const container = document.getElementById('movie-results');
  container.innerHTML = '';

  if (movies.length === 0) {
    container.innerHTML = '<p class="text-center">No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const poster = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : 'https://via.placeholder.com/300x450?text=No+Image';

    const card = `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow">
          <img src="${poster}" class="card-img-top" alt="${movie.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview.slice(0, 100)}...</p>
            <p class="text-muted">⭐ ${movie.vote_average}</p>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}" target="_blank" class="btn btn-danger mt-auto">Watch Trailer</a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function toggleTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById("toggle-theme");
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleBtn.innerText = "🌙 Dark Mode";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleBtn.innerText = "☀️ Light Mode";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("light-mode");
});
