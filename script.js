window.onload = function() {
  const navs = document.querySelectorAll("nav .nav-menu");
  const progressBarEl = document.querySelector(".progress");
  const pane = {
    main: document.getElementById("main"),
    profile: document.getElementById("profile"),
    photo: document.getElementById("photo"),
    location: document.getElementById("location")
  };

  // nav에 클릭 이벤트
  const navMenuEl = document.querySelectorAll(".nav-menu");
  for (let i = 0; i < navMenuEl.length; i++) {
    const menuEl = navMenuEl[i];
    menuEl.onclick = () => {
      pane[menuEl.id.slice(4)].scrollIntoView({ behavior: "smooth" });
    };
  }

  // 스크롤 이벤트에 따라 상단 메뉴 이모지 변경
  getTopFromEachElement();
  window.addEventListener("scroll", getTopFromEachElement);
  function getTopFromEachElement() {
    const mainTop = Math.abs(pane.main.getBoundingClientRect().top);
    const profileTop = Math.abs(pane.profile.getBoundingClientRect().top);
    const photoTop = Math.abs(pane.photo.getBoundingClientRect().top);
    const locationTop = Math.abs(pane.location.getBoundingClientRect().top);

    const minimum = Math.min(mainTop, profileTop, photoTop, locationTop);

    switch (minimum) {
      case mainTop:
        turnOnEmoji("main");
        break;
      case profileTop:
        turnOnEmoji("profile");
        break;
      case photoTop:
        turnOnEmoji("photo");
        break;
      case locationTop:
        turnOnEmoji("location");
        break;
    }

    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = document.documentElement.clientHeight;
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    progressBarEl.style.width = `${(scrollTop / (scrollHeight - windowHeight)) *
      100}%`;
  }

  function turnOnEmoji(id) {
    for (let i = 0; i < navs.length; i++) {
      const nav = navs[i];
      if (nav.id === `nav-${id}`) {
        navs[i].classList.add("on");
      } else {
        navs[i].classList.remove("on");
      }
    }
  }

  /**
   * 이미지
   */
  const imagesEl = document.querySelector(".images");
  for (let i = 0; i < 17; i++) {
    const imageWrapperEl = document.createElement("div");
    imageWrapperEl.className = "image-wrapper";
    const imageEl = document.createElement("img");
    const src = `./assets/img/photo/${i}.jpg`;
    imageEl.src = src;
    imageEl.onclick = openImageModal;
    imageWrapperEl.appendChild(imageEl);
    imagesEl.appendChild(imageWrapperEl);
    imageEl.onload = function() {
      const width = this.width;
      const height = this.height;
      if (width > height) {
        this.parentElement.classList.add('width');
      }
    };
  }

  /**
   * 이미지 모달
   */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-image");
  // 모달 열기
  function openImageModal(e) {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
    document.body.style.overflow = "hidden";
  }
  function closeImageModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
  // 모달 닫기
  const closeButton = document.querySelector(".close");
  const dim = document.querySelector(".dim");
  closeButton.onclick = closeImageModal;
  dim.onclick = closeImageModal;

  /**
   * 지도
   */
  const map = new daum.maps.Map(document.getElementById("map"), {
    center: new daum.maps.LatLng(37.504263,127.043006),
    level: 4 //지도의 레벨(확대, 축소 정도)
  });
  map.setZoomable(false);
  map.setDraggable(false);

  new daum.maps.Marker({
    position: new daum.maps.LatLng(37.504263,127.043006),
    image: new daum.maps.MarkerImage(
      "./assets/img/marker.png",
      new daum.maps.Size(64, 69),
      { offset: new daum.maps.Point(27, 69) }
    )
  }).setMap(map);
};
