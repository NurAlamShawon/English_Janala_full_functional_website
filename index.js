//fetch url
const loader = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// fetching buttons

const load_buttons = async () => {
  const button_id = document.getElementById("buttons");

  const data = await loader(
    "https://openapi.programming-hero.com/api/levels/all"
  );

  const data_load = data.data;

  for (let data of data_load) {
    const level = data.level_no;
    button_id.innerHTML += `
    
     <button class="btn btn-outline btn-primary mx-auto" onclick="load_all_data(${level})"   id="btn-${level}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            lesson-${level}
          </button>
    `;
  }
};

load_buttons();

// speak word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// load_somarthok sobdo

const load_word = (data) => {
  const load_words = document.getElementById("load_word");

  for (let words of data) {
    load_words.innerHTML += `
  <button class="font-regular text-xl bg-[#EDF7FF] p-2">${words}</button>
  `;
  }
};

// load_description

const load_des = async (id) => {
  let url = `https://openapi.programming-hero.com/api/word/${id}`;

  const data = await loader(url);

  const data_load = data.data;

  let word, pronounciation, sentence, meaning;

  const dialog_box = document.getElementById("my_modal");

  word = data_load.word;
  pronounciation = data_load.pronunciation;
  sentence = data_load.sentence;
  meaning = data_load.meaning;

  console.log(id);

  let synonyms = data_load.synonyms;

  dialog_box.innerHTML = "";

  if (meaning === null) {
    dialog_box.innerHTML = `

  <div class="card w-96 bg-base-100 card-sm shadow-sm p-4 rounded-xl">
             <div class="card-body border-2 border-blue-50 rounded-xl">
               <h2 class="card-title font-semibold text-2xl">
                 ${word} (<svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke-width="1.5"
                   stroke="currentColor"
                   class="size-6"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                   /></svg>: ${pronounciation})
               </h2>
               <h1 class="font-semibold text-xl">Meaning</h1>
               <p class="font-medium text-xl">কোনো meaning নেই</p>
               <h1 class="font-semibold text-xl">Example</h1>
               <p class="font-regular text-xl">
                 ${sentence}
               </p>
               <h1 class="font-semibold text-xl">সমার্থক শব্দ গুলো</h1>
                <div id="load_word">
                 
                 </div>
             </div>
             <div class="modal-action justify-start pl-4">
               <form method="dialog">
                 <!-- if there is a button in form, it will close the modal -->
                 <button class="btn btn-primary justify-start">
                   Complete Learning
                 </button>
               </form>
             </div>
           </div>
 
 `;
  } else {
    dialog_box.innerHTML = `

  <div class="card w-96 bg-base-100 card-sm shadow-sm p-4 rounded-xl" >
             <div class="card-body border-2 border-blue-50 rounded-xl">
               <h2 class="card-title font-semibold text-2xl">
                 ${word} (<svg
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke-width="1.5"
                   stroke="currentColor"
                   class="size-6"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                   /></svg>: ${pronounciation})
               </h2>
               <h1 class="font-semibold text-xl">Meaning</h1>
               <p class="font-medium text-xl">${meaning}</p>
               <h1 class="font-semibold text-xl">Example</h1>
               <p class="font-regular text-xl">
                 ${sentence}
               </p>
               <h1 class="font-semibold text-xl">সমার্থক শব্দ গুলো</h1>
                <div id="load_word">
                 
                 </div>
             </div>
             <div class="modal-action justify-start pl-4">
               <form method="dialog">
                 <!-- if there is a button in form, it will close the modal -->
                 <button class="btn btn-primary justify-start">
                   Complete Learning
                 </button>
               </form>
             </div>
           </div>
 
 `;
  }

  const load_words = document.getElementById("load_word");

  if (synonyms.length > 0) {
    for (let words of synonyms) {
      load_words.innerHTML += `
    <button class="font-regular text-xl bg-[#EDF7FF] p-2 m-1">${words}</button>
    `;
    }
  } else {
    load_words.innerHTML += `
    <button class="font-regular text-xl bg-[#EDF7FF] p-2 ">কোন সমার্থক শব্দ নাই </button>
    `;
  }

  dialog_box.showModal();
};

const remove_active_class = () => {
  const buttons = document.getElementsByClassName("active");

  for (let button of buttons) {
    button.classList.remove("active");
  }
};

// fetching data of card

const load_all_data = async (level) => {
  const card = document.getElementById("card");
  card.innerHTML = "";

  remove_active_class();

  const button = document.getElementById(`btn-${level}`);

  button.classList.add("active");

  card.innerHTML = `
  <span class="loading loading-bars loading-xl mx-auto col-span-3 m-20 p-5"></span>
  `;

  setTimeout(async () => {
    let url = `https://openapi.programming-hero.com/api/level/${level}`;

    const data = await loader(url);

    const data_load = data.data;

    card.innerHTML = "";

    if (data_load.length > 0) {
      for (let data of data_load) {
        let meaning = data.meaning;
        let word = data.word;
        console.log(word);

        if (meaning === null) {
          card.innerHTML += `
    
  <div class="max-w-lg rounded-lg text-center bg-white p-5">
      <h1 class="font-bold text-2xl">${word}</h1>
      <p class="font-medium text-xl">Meaning /Pronounciation</p>
      <h1 class="font-semibold text-2xl">কোনো meaning নেই</h1>

      <div class="flex justify-between">
        <div>
          <button onclick="load_des(${data.id})" class="cursor-pointer btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
        </div>

        <div>
          <button class="cursor-pointer btn" onclick="pronounceWord('${word}')" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  
  
  `;
        } else {
          card.innerHTML += `
    
  <div class="max-w-lg rounded-lg text-center bg-white p-5">
      <h1 class="font-bold text-2xl">${word}</h1>
      <p class="font-medium text-xl">Meaning /Pronounciation</p>
      <h1 class="font-semibold text-2xl">${meaning}</h1>

      <div class="flex justify-between">
        <div>
          <button onclick="load_des(${data.id})" class="cursor-pointer btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </button>
        </div>

        <div>
          <button class="cursor-pointer btn"  onclick="pronounceWord('${word}')" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  
  
  `;
        }
      }
    } else {
      card.innerHTML = "";
      card.innerHTML += `

 <div class="col-span-3">
            <p class="text-base text-[#79716B] pt-12">
            এই Lesson এ কোন Vocabularies নাই
            </p>
            <h1 class="text-center text-[#292524] text-2xl pb-12">
              একটি Lesson Select করুন।
            </h1>
          </div>
`;
    }
  }, 3000);
};

// login process
const check = () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const username_value = username.value;
  const password_value = parseInt(password.value);

  if (username_value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      title: "Please Enter your Username",
      text: "Something went wrong!",
    });
    return;
  }

  if (password_value === 123456) {
    const learn = document.getElementById("learn");
    const faq = document.getElementById("faq");
    const hero_section = document.getElementById("hero_section");
    const navbar=document.getElementById("navbar");

    navbar.style.display = "block";
    learn.style.display = "block";
    faq.style.display = "block";
    hero_section.style.display = "none";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      title: "Please Enter correct password",
      text: "Something went wrong!",
    });
  }
};

// logout
const home = () => {

    const learn = document.getElementById("learn");
    const faq = document.getElementById("faq");
    const hero_section = document.getElementById("hero_section");
    const navbar=document.getElementById("navbar");

    navbar.style.display = "none";
    learn.style.display = "none";
    faq.style.display = "none";
    hero_section.style.display = "block";

}
