const Movie = require("../models/movie");

const newMovie = (req, res) => {
  res.render("movies/new");
};

const create = (req, res) => {
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ",");
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(",");

  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const movie = new Movie(req.body);
  movie.save(err => {
    if (err) return console.log(err);
    res.redirect("/movies");
  });
};

const index = (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      return console.log(err);
    }
    res.render("movies/index", {
      movies
    });
  });
};

module.exports = {
  new: newMovie,
  create,
  index
};
