import mp3Type from "~/assets/audio/mp3Type";

const apiTest = {
  getNewReleases: () => {
    return [
      {
        id: 0,
        trackAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnieVqXzgRDxD2DZcmXQjnDAI7cETRYD2hdA&s",
        trackPerformer: "Kenny Price",
        trackTitle: "The HeavyWeight",
        trackType: "Single",
        trackLink: mp3Type[`NewReleases/TheHeavyWeight-Kenny Price`],
      },
      {
        id: 1,
        trackAvatar:
          "https://navicdn.com/loibaihat.co/wp-content/uploads/2020/10/loi-boi-vi-la-khi-yeu.png",
        trackPerformer: "LyLy",
        trackTitle: "Bởi Vì Là Khi Yêu",
        trackType: "Single",
        trackLink: mp3Type[`NewReleases/BoiViLaKhiYeu-LyLy`],
      },
      {
        id: 2,
        trackAvatar:
          "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/4/8/f/f/48ffdb72c21e5865fa0f2f1f269f0e16.jpg",
        trackPerformer: "Suni Hạ Linh ft. Lou Hoàng",
        trackTitle: "Không Sao Mà Em Đây Rồi",
        trackType: "Single",
        trackLink:
          mp3Type[
            `NewReleases/KHÔNG SAO MÀ EM ĐÂY RỒI - SUNI HẠ LINH ft Lou Hoàng`
          ],
      },
      {
        id: 3,
        trackAvatar:
          "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/1/d/6/a/1d6a1fa9aaf8b3be17dd64f396fe7ed6.jpg",
        trackPerformer: "Soobin Hoàng Sơn",
        trackTitle: "Giá Như",
        trackType: "Single",
        trackLink: mp3Type[`NewReleases/GIA NHU - Soobin`],
      },
      {
        id: 4,
        trackAvatar:
          "https://i.scdn.co/image/ab67616d00001e02e75f76ad00f94ccc944a8bb7",
        trackPerformer: "Vũ Phụng Tiên",
        trackTitle: "Lệ Lưu Ly",
        trackType: "Single",
        trackLink:
          mp3Type[`NewReleases/LỆ LƯU LY - VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7`],
      },
      {
        id: 5,
        trackAvatar:
          "https://i.scdn.co/image/ab67616d0000b273838698485511bd9108fadadc",
        trackPerformer: "Dua Lipa",
        trackTitle: "New Rules",
        trackType: "Single",
        trackLink: mp3Type["NewReleases/NEW RULES - Dua Lipa"],
      },
      {
        id: 6,
        trackAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsumY3LsuMpJX74-1mLf73QdeVgyFwrsDs8g&s",
        trackPerformer: "Eminem",
        trackTitle: "Rap God",
        trackType: "Single",
        trackLink: mp3Type[`NewReleases/RAP GOD - Eminem (Explicit)`],
      },
    ];
  },
};

export default apiTest;
