function onPageLoad() {
    const cookie = getCookie("username");

    if (cookie != "") {
        window.location.href = "homepage.html"
    }
}

function handleLogin() {
    // Grab username and password
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;


    // Grab the validation messages
    const userValidation = document.getElementById("usernameValidation");
    const passValidation = document.getElementById("passwordValidation");

    const errorText = document.getElementById("errorText");

    // Reset the validation messages
    userValidation.textContent = ""
    passValidation.textContent = ""
    errorText.textContent = "";

    // If either field is empty display a warning
    if (username === "") {
        userValidation.textContent = "Please enter a username"
    }
    if (password === "") {
        passValidation.textContent = "Please enter a password"
    }

    if (username === "" || password === "") {
        return;
    }

    // Send an object containing the username and a hashed password
    const data = {
        "username": username,
        "password": md5(password)
    }

    const payload = JSON.stringify(data);

    function handleResponse (responseText) {
        const response = JSON.parse(responseText);
        if (response.code === 200) {
            let date = new Date();
            date.setTime(date.getTime() + (30 * 60 * 1000));
            document.cookie = "username="+response.username+";expires="+date.toGMTString();
            window.location.href = "homepage.html";
            return;
        }
        if (response.code === 401) {
            errorText.textContent = response.message;
            return;
        } else {
            errorText.textContent = "Sorry, we had an unexpected error, please try again";
            return;
        }
    }

    sendRequest("/backend/Login.php", payload, handleResponse);
}

tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
      number: {
        value: 0,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ff0000",
        animation: {
          enable: true,
          speed: 180,
          sync: true
        }
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: "",
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 3,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 50,
        random: {
          enable: true,
          minimumValue: 10
        },
        animation: {
          enable: true,
          speed: 5,
          minimumValue: 10,
          sync: true,
          startValue: "min",
          destroy: "max"
        }
      },
      links: {
        enable: false
      },
      move: {
        enable: true,
        speed: 10,
        direction: "none",
        random: false,
        straight: false,
        outMode: "destroy",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onhover: {
          enable: true,
          mode: "trail"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 200
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        },
        trail: {
          delay: 0.005,
          quantity: 5
        }
      }
    },
    retina_detect: true,
    background: {
      color: "#000000",
      image: "url('https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    },
    backgroundMask: {
      enable: true,
      cover: {
        color: "#000000"
      }
    }
  });