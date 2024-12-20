import React, { useState } from "react";

const arr = [
  "cricket",
  "football",
  "hockey",
  "chess",
  "shuttle",
  "tennis",
  "badminton",
];

export default function Check() {
  const [myMovies, setMyMovies] = useState(
    arr.map((movies) => ({ name: movies, selected: false }))
  );

  console.log(myMovies);

  const deleteFun = (index) => {
    setMyMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
  };
  const toggleSelection = (index) => {
    console.log(index);

    setMyMovies(
      myMovies.map((movies, i) => {
        if (i === index) {
          return { ...movies, selected: !movies.selected };
        }
        return movies;
      })
    );
  };

  return (
    <div className="App">
      <ul>
        {myMovies.map((movies, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={movies.selected}
                onChange={() => toggleSelection(index)}
              />
              {movies.name}

              {movies.selected && (
                <button onClick={(e) => deleteFun(index)}>Delete</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
