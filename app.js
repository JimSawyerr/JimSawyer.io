document.addEventListener('DOMContentLoaded', () => {
  const noButton = document.querySelector('button.button--no');
  const yesButton = document.querySelector('button.button--yes');
  const container = document.querySelector('.container');

  noButton.addEventListener("click", clickNo);
  yesButton.addEventListener("click", clickYes);

  function clickNo() {
      let position;
      let isOverlapping;

      do {
          position = getRandomPosition();
          isOverlapping = checkOverlap(position.x, position.y, noButton.offsetWidth, noButton.offsetHeight);
      } while (isOverlapping);

      noButton.style.left = position.x + "px";
      noButton.style.top = position.y + "px";

      displayRandomGIF();
  }

  function getRandomPosition() {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      const buffer = 20; // Buffer zone size in pixels

      const randomEdge = Math.floor(Math.random() * 4); // Randomly choose the edge (0, 1, 2, or 3)
      let x, y;

      switch (randomEdge) {
          case 0: // Top edge
              x = Math.floor(Math.random() * (containerWidth - buffer * 2)) + buffer;
              y = buffer;
              break;
          case 1: // Right edge
              x = containerWidth - buffer;
              y = Math.floor(Math.random() * (containerHeight - buffer * 2)) + buffer;
              break;
          case 2: // Bottom edge
              x = Math.floor(Math.random() * (containerWidth - buffer * 2)) + buffer;
              y = containerHeight - buffer;
              break;
          case 3: // Left edge
              x = buffer;
              y = Math.floor(Math.random() * (containerHeight - buffer * 2)) + buffer;
              break;
      }

      return { x, y };
  }

  function checkOverlap(x, y, width, height) {
      const gifs = document.querySelectorAll('.random-gif');
      for (const gif of gifs) {
          const gifRect = gif.getBoundingClientRect();
          const buttonRect = {
              left: x,
              top: y,
              right: x + width,
              bottom: y + height,
          };

          const isOverlapping = !(buttonRect.right < gifRect.left ||
                                  buttonRect.left > gifRect.right ||
                                  buttonRect.bottom < gifRect.top ||
                                  buttonRect.top > gifRect.bottom);

          if (isOverlapping) {
              return true;
          }
      }
      return false;
  }

  function clickYes() {
      const gifUrl = "https://media1.tenor.com/m/_PGpcJXlpEoAAAAC/yay-mochi.gif"; // Replace with the direct URL of the desired Tenor GIF
      const gifElement = document.createElement("img");
      gifElement.src = gifUrl;
      gifElement.classList.add('yes-gif');
      
      // Append the GIF element to the body or any desired container
      document.body.appendChild(gifElement);

      setTimeout(function() {
          // Remove the GIF element after a certain delay (e.g., 3 seconds)
          gifElement.remove();

          // Show the alert message
          alert("heyy, i forgot to give you a flower so this is the digital flower for you, thanks for giving me a butterflies, for making my day always thanks.. click the ok please");

          // Navigate to the specified URL
          window.location.href = "flower.html";
      }, 1500); // Adjust the delay as needed (in milliseconds)
  }

  const gifUrls = [
      "https://media1.tenor.com/m/GRL3MSb5dOMAAAAC/mad.gif",
      "https://media.giphy.com/media/4QxQgWZHbeYwM/giphy.gif",
      "https://media.giphy.com/media/bSm7ui6ExVru4qamhf/giphy.gif",
      "https://media.giphy.com/media/ftqLysT45BJMagKFuk/giphy.gif",
      "https://media.giphy.com/media/wkW0maGDN1eSc/giphy.gif",
      "https://media.tenor.com/zD_Vu-5ohlAAAAAC/coffee-morning.gif",
      "https://media.giphy.com/media/QTrG6mjkHEkpFR3DqX/giphy.gif",
      "https://media3.giphy.com/media/iIYtEOyM8oRkodXUUX/giphy.gif?cid=ecf05e47zaizcgngg757obk3yd14t2kras55gbt554kvhe3h&ep=v1_gifs_related&rid=giphy.gif&ct=g"
  ];

  let gifIndex = 0;

  function displayRandomGIF() {
      const gifUrl = gifUrls[gifIndex];
      const gif = document.createElement('img');
      gif.src = gifUrl;
      gif.classList.add('random-gif');

      gif.onload = function () {
          const containerRect = container.getBoundingClientRect();
          const containerWidth = containerRect.width;
          const containerHeight = containerRect.height;
          const buffer = 20; // Buffer zone size in pixels

          let randomX, randomY, isOverlapping;

          do {
              const randomEdge = Math.floor(Math.random() * 4); // Randomly choose the edge (0, 1, 2, or 3)
              
              switch (randomEdge) {
                  case 0: // Top edge
                      randomX = Math.floor(Math.random() * (containerWidth - gif.width - buffer * 2)) + buffer;
                      randomY = buffer;
                      break;
                  case 1: // Right edge
                      randomX = containerWidth - gif.width - buffer;
                      randomY = Math.floor(Math.random() * (containerHeight - gif.height - buffer * 2)) + buffer;
                      break;
                  case 2: // Bottom edge
                      randomX = Math.floor(Math.random() * (containerWidth - gif.width - buffer * 2)) + buffer;
                      randomY = containerHeight - gif.height - buffer;
                      break;
                  case 3: // Left edge
                      randomX = buffer;
                      randomY = Math.floor(Math.random() * (containerHeight - gif.height - buffer * 2)) + buffer;
                      break;
              }

              isOverlapping = checkOverlap(randomX, randomY, gif.width, gif.height);
          } while (isOverlapping);

          gif.style.left = randomX + "px";
          gif.style.top = randomY + "px";
      };

      const existingGifs = document.querySelectorAll('.random-gif');
      existingGifs.forEach(existingGif => existingGif.remove());

      container.appendChild(gif);

      gifIndex++;
      if (gifIndex === gifUrls.length) {
          gifIndex = 0;
      }
  }
});
