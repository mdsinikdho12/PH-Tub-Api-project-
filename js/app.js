const filterBtnall = document.getElementById("filter-all");
const filterBtnMusic = document.getElementById("filter-Music");
const filterBtnComedy = document.getElementById("filter-Comedy");
const filterBtnDrowing = document.getElementById("filter-Drowing");


const Api = "https://openapi.programming-hero.com/api/phero-tube/category/";
let currentFilter = 'All' ;

// fetch video from Api 

async function loadVideo() {
     let url = '';

    if (currentFilter === 'Music') {
        url = `${Api}1001`;
    } else if (currentFilter === 'Comedy') {
        url = `${Api}1003`;
    } else if (currentFilter === 'Drowing') {
        url = `${Api}1005`;
    } else {
        
        url = "https://openapi.programming-hero.com/api/phero-tube/videos"; 
    }

    try{
        const res = await fetch(url);
        const videos = await res.json();
     
       if (currentFilter === 'All' && videos.videos) {
        renderallvideo(videos);
    } else {
        renderVideo(videos); 
    }
    } catch(error){
         const videoContainer = document.getElementById("video-container");
          videoContainer.innerHTML = ""; 
 
        videoContainer.className = "w-full min-h-screen flex flex-col items-center justify-center text-center space-y-6";

        const maindiv = document.createElement("div");

        const images = document.createElement('img');
        images.src = "../images/icon.png";
        images.className = "w-48 mx-auto";

        const text = document.createElement("p");
        text.className = "text-3xl font-bold text-red-600";
        text.textContent = "Faild to fetch video ";

        maindiv.appendChild(images);
        maindiv.appendChild(text);
        videoContainer.appendChild(maindiv);
    }
    
}

// add Event Listeners

filterBtnall.addEventListener("click",async() => {
    currentFilter ="All";
    loadVideo();
    setActiveButton();
})
filterBtnMusic.addEventListener("click",async() => {
    currentFilter ="Music";
    loadVideo();
    setActiveButton();
})

filterBtnComedy.addEventListener("click",async() => {
    currentFilter ="Comedy";
    loadVideo();
    setActiveButton();
})


filterBtnDrowing.addEventListener("click",async() => {
    currentFilter ="Drowing";
    loadVideo();
    setActiveButton();
})

async function renderVideo(videos) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ""; 

  const allVideos = videos.data || videos.category;

if (!allVideos || allVideos.length === 0) {
  const videoContainer = document.getElementById("video-container");
  
 
  videoContainer.className = "w-full min-h-screen flex flex-col items-center justify-center text-center space-y-6";

  const maindiv = document.createElement("div");

  const images = document.createElement('img');
  images.src = "../images/icon.png";
  images.className = "w-48 mx-auto";

  const text = document.createElement("p");
  text.className = "text-3xl font-bold text-red-600";
  text.textContent = "Oops!! Sorry, There is no content here";

  maindiv.appendChild(images);
  maindiv.appendChild(text);
  videoContainer.appendChild(maindiv);
  return;
}


  allVideos.forEach(video => {
    const card = document.createElement("div");
    card.classList = "video-card w-[300px]";
    videoContainer.className = "container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center";
    const thumbnail = video.thumbnail;
    const title = video.title;
    const profilePic = video.authors[0]?.profile_picture || "https://img.icons8.com/color/48/guest-male--v1.png";
    const channelName = video.authors[0]?.profile_name || "Unknown";
    const isVerified = video.authors[0]?.verified;
    const views = video.others?.views || "0 views";

    card.innerHTML = `
      <div class="video-img w-full h-[170px] rounded-xl overflow-hidden">
        <img src="${thumbnail}" class="w-full h-full object-cover" />
      </div>

      <div class="video-info flex gap-3 mt-5">
        <img src="${profilePic}" alt="channel-logo" class="rounded-full w-10 h-10">
        <div class="flex flex-col">
          <h2 class="font-semibold text-[16px] leading-tight">${title}</h2>
          <h3 class="text-gray-600 text-sm flex items-center gap-1">
            ${channelName}
            ${isVerified ? '<img src="https://img.icons8.com/fluency/50/instagram-check-mark.png" class="w-4 h-4">' : ''}
          </h3>
          <p class="text-gray-500 text-sm">${views}</p>
        </div>
      </div>
    `;

    
    videoContainer.appendChild(card);
  });
}


function setActiveButton() {
 
  const buttons = document.querySelectorAll("#filter-all, #filter-Music, #filter-Comedy, #filter-Drowing");
  buttons.forEach(btn => {
    btn.classList.remove("bg-red-500", "text-white");
    btn.classList.add("bg-gray-400", "text-gray-700");
  });

  
  if (currentFilter === "Music") {
    filterBtnMusic.classList.remove("bg-gray-400", "text-gray-700");
    filterBtnMusic.classList.add("bg-red-500", "text-white");
  } else if (currentFilter === "Comedy") {
    filterBtnComedy.classList.remove("bg-gray-400", "text-gray-700");
    filterBtnComedy.classList.add("bg-red-500", "text-white");
  } else if (currentFilter === "Drowing") {
    filterBtnDrowing.classList.remove("bg-gray-400", "text-gray-700");
    filterBtnDrowing.classList.add("bg-red-500", "text-white");
  } else {
    filterBtnall.classList.remove("bg-gray-400", "text-gray-700");
    filterBtnall.classList.add("bg-red-500", "text-white");
  }
}

async function renderallvideo(videos) {

  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ""; 
  videos.videos.forEach(video => {

    const card = document.createElement("div");
    card.classList = "video-card w-[300px]";
    videoContainer.className = "container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center";
    const title = video.title;
    const thumbnail = video.thumbnail;
    const views = video.others?.views || "0";
    const profile = video.authors[0]?.profile_name || "Unknown";
    const profile_picture = video.authors[0]?.profile_picture || "https://img.icons8.com/color/48/guest-male--v1.png";
    const isVerified = video.authors[0]?.verified;
   card.innerHTML = `
      <div class="video-img w-full h-[170px] rounded-xl overflow-hidden">
        <img src="${thumbnail}" class="w-full h-full object-cover" />
      </div>

      <div class="video-info flex gap-3 mt-5">
        <img src="${profile_picture}" alt="channel-logo" class="rounded-full w-10 h-10">
        <div class="flex flex-col">
          <h2 class="font-semibold text-[16px] leading-tight">${title}</h2>
          <h3 class="text-gray-600 text-sm flex items-center gap-1">
            ${profile}
            ${isVerified ? '<img src="https://img.icons8.com/fluency/50/instagram-check-mark.png" class="w-4 h-4">' : ''}
          </h3>
          <p class="text-gray-500 text-sm">${views}</p>
        </div>
      </div>
    `;
    
     videoContainer.appendChild(card);
    
  });
}

loadVideo();



