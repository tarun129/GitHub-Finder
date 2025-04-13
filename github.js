document.addEventListener("DOMContentLoaded" , () => {
    const url = "https://api.github.com/users";
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const profileContainer = document.querySelector("#profile-container");
const loading = document.querySelector("#loading");

const darkToggle = document.querySelector("#dark-toggle")

 const generateProfile = (profile) => {
      return ( `
       <div class="profile-box">
     <div class="top-section">
         <div class="left">
             <div class="avatar">
                 <img  alt="avatar" src= "${profile.avatar_url}" />
             </div>  
             <div class="self">
                 <h1>${profile.name}</h1>
                 <h1>${profile.login}</h1> 
             </div>
         </div>
         <a href = "${profile.html_url}" target = "blank">
         <button class="primary-btn">Explore Profile</button>
         </a>
     </div>

     <div class="about">
         <h2>About</h2>
         <p>${profile.bio}</p>
     </div>

     <div class="status">
         <div class="status-item">
             <h3>Followers</h3>
             <p>${profile.followers}</p>
         </div>

         <div class="status-item">
             <h3>Following</h3>
             <p>${profile.following}</p>
         </div>

         <div class="status-item">
             <h3>Repositories</h3>
             <p>${profile.public_repos}</p>
         </div>

     </div>
 </div> `);
 };

async function fetchProfile(){
    const username = searchInput.value;
    const newURL = `${url}/${username}`;

   const spinner = document.querySelector(".spinner");
   spinner.style.display = "block";
   spinner.style.color = "black";


    try{
        const response = await fetch(newURL);
        const data = await response.json();
         if(data.login){
            loading.innerText = "";
            profileContainer.innerHTML = generateProfile(data);
            const profileBox = document.querySelector(".profile-box");
            setTimeout(() => {
                profileBox.classList.add("show");
            } , 70)
         }else{
            loading.innerHTML = data.message;
            loading.style.color = "red";
         }
        
    }catch(error){
        console.error("There has been a problem with your fetch operation:", error);
        spinner.style.display = "none";
        loading.innerText = "There has been a problem with your fetch operation:";
        loading.style.color = "red";
    }
    
};

searchBtn.addEventListener("click" , fetchProfile);
searchInput.addEventListener("keydown" , (e) => {
    if(e.key === "Enter"){
        fetchProfile();
    };
});

darkToggle.addEventListener("click" , () => {
    document.body.classList.toggle("dark");
    

});
});
