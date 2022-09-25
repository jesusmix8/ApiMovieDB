//numero de pagina que se va a mostrar
let page = 1;

//almacenar los botones de html para darle funcionalidad
const btnPrevious = document.getElementById("btnPrevious");
const btnNext = document.getElementById("btnNext");

// botones para cambiar de pagina
btnNext.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    loadMovies();
  }
});

// botones para cambiar de pagina
btnPrevious.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadMovies();
  }
});

//funcion para cargar las peliculas
const loadMovies = async () => {
  try {
    const answer = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=bce85b622216191f7b760e99e0a8bf77&page=${page}`
    );

    console.log(answer);

    if (answer.status === 200) {
      //si la respuesta es correcta carga los datos en la variabke data
      const data = await answer.json();
      //variable para insertar los datos en el html
      let movies = "";
      //recorre el array de peliculas dentro de la variable data
      data.results.forEach((movie) => {
        //inserta los datos en la variable movies en formato html
        movies += `
					<div class= "movie">
						<img class= "poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
						<h1 class ="title"> ${movie.title}</h1>
						<p> ${movie.release_date} <br> Adults only : ${movie.adult}</p>
					</div>
				
				`;
      });

      document.getElementById("container").innerHTML = movies;
    } else if (answer.status === 401) {
      console.log("Key error");
    } else if (answer.status === 404) {
      console.log("The movie doesn't exist");
    } else {
      console.log("something gone wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

loadMovies();
