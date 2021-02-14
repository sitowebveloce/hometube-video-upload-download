// SELECT VIDEO DIV
const videoDiv = document.querySelector('.videos');

// FETCH VIDEOS
const fetchVideos = async ()=>{
    try{
        // Reset videoDiv content
        videoDiv.innerHTML = '';
        // FETCH VIDEOS
        const fetchData = await fetch('http://localhost:3001/api/upload');
        const data = await fetchData.json();
        // console.log(data);
        if(data){
            data.forEach(v => {
                // console.log(v)
               // Create a div element
               const div = document.createElement('div');
               div.classList.add('video-container');
               // Inner html
               div.innerHTML = `
               <h2>${v}</h2>
               <video width="55%" preload="metadata" loop muted controls>
               <source src="./uploads/${v}" type="video/mp4">
               <a href="./uploads/${v}">Video</a>
               </video>
                
               <button class='btn-delete' onclick="deleteVideo('${v}')">Delete</button>
                
               `;
                // Append
                videoDiv.append(div);
               });
        }

    }catch(error){
        if(error) console.log(error);
    }
}
// Run fetch
fetchVideos();


// DELETE FUNCTION
const deleteVideo = async id =>{
    // console.log(id)
    try{
        if(window.confirm('Are you sure?')){
           await fetch(`http://localhost:3001/api/upload/${id}`, {method:'DELETE'});
        }
        // FETCH REMAINING VIDEOS
        fetchVideos();
        // DELETED MESSAGE
        clearMessages('Video deleted.')

    }catch(err){
        if(err) console.log(err);
    }
}

// MESSAGES
// Select messages div
const messages = document.querySelector('.messages');
// Define message
let message = 'Upload your videos';
// CLEAR MESSAGE FUNCTION
const clearMessages = (message)=>{
    setTimeout(()=>{
        messages.innerHTML = message;
    }, 3000);
    setTimeout(()=>{
        messages.innerHTML = '';
    }, 13000);
};
// Run clear messages
clearMessages(message);