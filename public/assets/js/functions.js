/* alters the button status on the login/register forms */
function setBtnLoadStatus(id, text, to) {
  /* if loading, disable and show bootstrap spinner class */
  let btn = document.getElementById(id);
  btn.setAttribute("disabled", to);
  btn.innerText = text;
  let span = document.createElement("span");
  span.setAttribute("class", "spinner-border spinner-border-sm");
  btn.append(span);

  if (to === true) {
    span.setAttribute("style", "display: flex;");
  } else {
    btn.removeAttribute("disabled");
    span.setAttribute("style", "display: none;");
  }
}

/* send ajax request to check user database */

function ajaxRequest(action, form) {
  /* default is to check just the username */
  let dataToSubmit = {
    checkTheseCredentials: true,
    username: $("#username").val()
  };

  /* default btn and btnMsg is register form */
  let btn = "btn-register";
  let btnMsg = "Register";

  /* change mode to login, add the password the data being sent */
  if (action === "login") {
    dataToSubmit = {
      checkTheseCredentials: true,
      username: $("#username").val(),
      password: $("#password").val()
    };

    btn = "btn-login";
    btnMsg = "Log In";
  }

  setBtnLoadStatus(btn, "", true);

  $.ajax({
    method: "POST",
    url: HOME_URL + "/utilities/check.php",
    data: dataToSubmit,
    success: function(response) {
      let data = JSON.parse(response);

      if (data.error) {
        alert(data.error);
        return false;
      }

      let found = data.found;
      let ready = false;

      if (action === "login") {
        ready = checkLogin(found, data);
      } else if (action === "register") {
        ready = checkRegister(found);
      }

      if (ready) {
        form.submit();
      }
    }
  }); //ajax

  /* inner functions of ajaxRequest */
  function checkLogin(found, data) {
    if (found === false) {
      alert("User does not exist!");
      $("#username").val("");
      setBtnLoadStatus(btn, btnMsg, false);
      return false;
    } else if (dataToSubmit.password && data.passwordMatch === false) {
      alert("Password for that user does not match!");
      $("#password").val("");
      setBtnLoadStatus(btn, btnMsg, false);
      return false;
    }
    return true;
  } //checklogin

  function checkRegister(found) {
    if (found === true) {
      alert("Username already exists");
      $("#username").val("");
      setBtnLoadStatus(btn, btnMsg, false);
      return false;
    }
    return true;
  } //checkRegister
} //ajaxRequest



/*** News card functions ***/


/* 
function to get the news from data source
type === "api" - sends to news API
type === "stub" - returns preset data, no loading 

*/

function getNewsFromDataSource(type) {

  if (type === "stub") return addNewsToDOM(getStubNews());

  $.ajax({
    method: 'GET',
    url: NEWS_URL,
    success(data) {
        $(document).ready(function() {
            //debug
            //console.log(data);
            //debugger;
            let articles = data.articles;
            addNewsToDOM(articles);
            

        });

    },
    error(err) {
        console.log(err);
    }
});
}//getNewsFromApi

/* function to create news cards */
function createNewsCard(div, article) {
  let area = document.getElementById(div);
  let card = document.createElement("div");
    card.setAttribute("class", "card col-md-4 col-sm-12");
  area.append(card);
        let img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", article.urlToImage);
    card.append(img);
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
    card.append(cardBody);
            let h5 = document.createElement("h5");
            h5.setAttribute("class", "card-title");
            h5.innerText = article.title;
            let p = document.createElement("p");
            p.setAttribute("class", "card-text");
            p.innerText = (article.content) ? article.content.substr(0, 75) : "News API encountered an error loading this article content";
            let a = document.createElement("a");
            a.setAttribute("href", article.url);
            a.setAttribute("target", "_blank");
            a.innerText = "Read More...";
        cardBody.append(h5);
        cardBody.append(p);
        cardBody.append(a);
}

/* reusable function to create a new row of news */
function createNewsRow(id) {
  let news = document.getElementById("news-card-area");
  let div = document.createElement("div");
  div.setAttribute("class", "row");
  div.setAttribute("id", "news-row-" + id + "");
  news.append(div);
}//createNewsRow

/* stub news data, in case the API breaks or has an error */
function getStubNews() {
  return [
    {
      source: {
      id: null,
      name: "Hollywoodlife.com"
      },
      author: "Cassie Gill",
      title: "Kylie Jenner Rocks Pink Bikini Top While Grabbing Lunch With Travis Scott & Stormi - Hollywood Life",
      description: "The cosmetics CEO is on a luxe vacation in Italy to celebrate her 22nd birthday -- and Kylie's been keeping the sexy looks coming since she arrived!",
      url: "https://hollywoodlife.com/2019/08/09/kylie-jenner-bikini-italy-lunch-travis-scott-stormi-see-pic-photo/",
      urlToImage: "https://pmchollywoodlife.files.wordpress.com/2019/08/kylie-wears-a-pink-lace-top-with-travis-and-stormi-ftr.jpg",
      publishedAt: "2019-08-10T02:13:00Z",
      content: "The cosmetics CEO is on a luxe vacation in Italy to celebrate her 22nd birthday — and Kylie’s been keeping the sexy looks coming since she arrived! Kylie Jenner is enjoying her last day as a 21-year-old! The billionaire stepped out in a plunging pink crochet… [+1686 chars]"
    },
    {
      source: {
        id: "cnn",
        name: "CNN"
      },
      author: "Tamara Qiblawi and Nada Altaher, CNN",
      title:
        "They survived the Christchurch attacks. In Mecca, they're finding peace as Hajj pilgrims - CNN",
      description:
        "Two hundred Christchurch mosque attack survivors and relatives of those slain have arrived in Mecca at the invitation of Saudi King Salman. They say the pilgrimage has been a means to healing from the violence that changed their lives.",
      url:
        "https://www.cnn.com/2019/08/10/middleeast/christchurch-hajj-intl/index.html",
      urlToImage:
        "https://cdn.cnn.com/cnnnext/dam/assets/190809134603-christchurch-hajj-intl-split-super-tease.jpg",
      publishedAt: "2019-08-10T04:11:00Z",
      content:
        "(CNN)When 31-year-old Maryam Gul laid eyes on the Kaaba this week, it was a moment of complete peace. The cube-shaped structure, and most sacred shrine of Islam, felt a world away from the Linwood mosque at Christchurch, New Zealand where her mother, father a… [+5601 chars]"
    },
    {
      source: {
        id: null,
        name: "Steelers.com"
      },
      author: "Teresa Varley",
      title:
        "Steelers hold on, win 30-28 The Steelers opened the preseason with - Steelers.com",
      description:
        "The Steelers opened the preseason with a win over the Tampa Bay Buccaneers",
      url: "https://www.steelers.com/news/steelers-hold-on-win-30-28",
      urlToImage:
        "https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/steelers/fl0tsuy2d6xecyl137hp",
      publishedAt: "2019-08-10T03:59:32Z",
      content:
        "The Buccaneers drove down the field on the opening drive against a defense that was void of many of their starters in the preseason opener. Terrell Edmunds and Javon Hargrave were the only returning starters to get the nod, while Devin Bush, who is expected t… [+1649 chars]"
    },
    {
      source: {
        id: null,
        name: "Ky3.com"
      },
      author: "Braden Berg",
      title:
        "Family of armed man at Walmart say he was never going to harm anybody - KY3",
      description:
        "'I would be worried myself. What they had to go through with their families and children, we are very sorry that this has happened.'",
      url:
        "https://www.ky3.com/content/news/Family-of-armed-man-at-Wal-mart-say-he-was-never-going-to-harm-anybody-531467781.html",
      urlToImage:
        "https://media.graytvinc.com/images/435*315/download+(3)139.jpg",
      publishedAt: "2019-08-10T03:38:51Z",
      content:
        "SPRINGFIELD, Mo -- 20 year old Dmitriy Andreychenko is charged with making a terrorist threat, which is a felony, after walking into a Springfield Walmart heavily armed, wearing a tactical vest. His family says he was trying to do a social experiment."
    },
    {
      source: {
        id: null,
        name: "Vikings.com"
      },
      author: "Chris Corso",
      title: "Game Highlights: Vikings 34, Saints 25 - Vikings.com",
      description: "",
      url: "https://www.vikings.com/news/game-highlights-vikings-34-saints-25",
      urlToImage:
        "https://static.clubs.nfl.com/image/private/t_editorial_landscape_12_desktop/vikings/afrdhy71hvdp5gjhgdcc",
      publishedAt: "2019-08-10T03:17:15Z",
      content:
        "The Vikings had a night of highlights in the first game of the 2019 preseason. Minnesota defeated the Saints 34-25 at the Mercedes Benz Superdome on Friday night. View the best game highlights below:"
    },
    {
      source: {
        id: null,
        name: "Dallasnews.com"
      },
      author: "David Moore",
      title:
        "Less is Moore: In Cowboys' preseason opener vs. 49ers, don't expect Kellen's offense to be very revealing - Dallas News",
      description:
        "SANTA CLARA, Calif. -- Heading into camp, before Ezekiel Elliott's holdout became the focus, one of the biggest questions involved Kellen Moore's...",
      url:
        "https://sportsday.dallasnews.com/dallas-cowboys/cowboys/2019/08/09/less-moore-cowboys-preseason-opener-vs-49ers-dont-expect-kellens-offense-veryrevealing",
      urlToImage:
        "https://sportsdaydfw.imgix.net/1565403337-CowboysCamp080819_AL011.JPG?w=1200&h=630&format=jpg&crop=faces&fit=crop",
      publishedAt: "2019-08-10T02:18:00Z",
      content:
        "SANTA CLARA, Calif. -- Heading into camp, before Ezekiel Elliott's holdout became the focus, one of the biggest questions involved Kellen Moore's impact on this offense. Fans crave new ideas for what has become something of a stale attack and wonder what cre… [+4531 chars]"
    }
  ];
}//getStubNews

/* function to put the news onto the DOM */
function addNewsToDOM(news, howMany=6) {
  //number of news rows
  let rows = 0;
            
  for (let i = 0; i < howMany; i++) {
      //check to see if we ned to make a new row
      if (i%3 === 0 || i === 0) {
          rows++; //increment the number of rows
          createNewsRow(rows);
      }
      let rowID = 'news-row-' + rows + '';
      createNewsCard(rowID, news[i]);
  }
}//addNewsToDOM
