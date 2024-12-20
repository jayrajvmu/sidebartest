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
  const [myMovies, setMyMovies] = useState(arr);
  const [isTrue, setIsTrue] = useState({});

  const deleteFun = (index) => {
    const newMovies = myMovies.filter((_, i) => i !== index);
    setMyMovies(newMovies);

    console.log(myMovies);

    console.log(isTrue);
  };

  console.log(myMovies);

  console.log(isTrue);

  return (
    <div className="App">
      <ul>
        {myMovies.map((movies, index) => {
          return (
            <li key={movies}>
              <input
                type="checkbox"
                onChange={() =>
                  setIsTrue({ ...isTrue, [index]: !isTrue[index] })
                }
              />
              {movies}

              {isTrue[index] && (
                <button onClick={(e) => deleteFun(index)}>Delete</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
