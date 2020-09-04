// const { default: Axios } = require("axios");

import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios
	.get(
		"https://cors-anywhere.herokuapp.com/https://api.github.com/users/KindredSoul"
	)
	.then((res) => {
		console.log(res.data);
		let cardData = res.data;
		const newUserCard = document.querySelector(".cards");
		const userCard = userCardMaker(cardData);
		newUserCard.prepend(userCard);
	})
	.catch((err) => {
		console.log(err);
	});

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
	"tetondan",
	"dustinmyers",
	"justsml",
	"luishrd",
	"bigknell",
];

followersArray.forEach((item) => {
	axios
		.get(
			`https://cors-anywhere.herokuapp.com/https://api.github.com/users/${item}`
		)
		.then((res) => {
			console.log(res.data);
			let cardData = res.data;
			const newUserCard = document.querySelector(".cards");
			const userCard = userCardMaker(cardData);
			newUserCard.appendChild(userCard);
		})
		.catch((err) => {
			console.log(err);
		});
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan,
    dustinmyers,
    justsml,
    luishrd,
    bigknell
*/

function userCardMaker(cardObj) {
	// A function to create each element
	// Excessive? Probably! Efficient? Idk! Hotel? Trivago!
	function elementCreator({
		element = "",
		myClass = "",
		src = "",
		text = "",
		pend = "",
		pendTarget,
	}) {
		// Create the element
		const newElement = document.createElement(`${element}`);

		// Give it a class
		myClass !== "" ? newElement.classList.add(`${myClass}`) : (myClass = null);

		// Give it some text
		text !== "" ? (newElement.textContent = `${text}`) : (text = null);

		// Give it some sauce
		src !== "" && element === "img"
			? (newElement.src = `${src}`)
			: src !== "" && element === "a"
			? newElement.setAttribute("href", `${src}`)
			: (src = null);

		// Prepending or appending, my child?
		pend === "prepend"
			? pendTarget.prepend(newElement)
			: pend === "appendChild"
			? pendTarget.appendChild(newElement)
			: pend === "append"
			? pendTarget.append(newElement)
			: (pend = null);

		// console.log(newElement);
		return newElement;
	}

	const cardContainer = elementCreator({ element: "div", myClass: "card" });
	console.log(cardContainer);

	const cardImg = elementCreator({
		element: "img",
		src: `${cardObj.avatar_url}`,
		pend: "appendChild",
		pendTarget: cardContainer,
	});

	const cardInfo = elementCreator({
		element: "div",
		myClass: "card-info",
		pend: "appendChild",
		pendTarget: cardContainer,
	});

	const infoName = elementCreator({
		element: "h3",
		myClass: "name",
		text: `${cardObj.name}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	const infoUsername = elementCreator({
		element: "p",
		myClass: "username",
		text: `${cardObj.login}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	const infoLocation = elementCreator({
		element: "p",
		text: `Location: ${
			cardObj.location !== null
				? cardObj.location
				: (cardObj.location = "Unknown")
		}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	const infoProfile = elementCreator({
		element: "p",
		text: `Profile: ${profileLink !== undefined ? profileLink : ""}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	const profileLink = elementCreator({
		element: "a",
		text: `${cardObj.html_url}`,
		src: `${cardObj.html_url}`,
		pend: "appendChild",
		pendTarget: infoProfile,
	});

	const infoFollowers = elementCreator({
		element: "p",
		text: `Followers: ${cardObj.followers}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	const infoFollowing = elementCreator({
		element: "p",
		text: `Following: ${cardObj.following}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});
	const infoBio = elementCreator({
		element: "p",
		text: `Bio: ${
			cardObj.bio !== null
				? cardObj.bio
				: "I've yet to write myself a bio, so here is some filler text for you to read. Enjoy"
		}`,
		pend: "appendChild",
		pendTarget: cardInfo,
	});

	return cardContainer;
}
{
	/* <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div> */
}
