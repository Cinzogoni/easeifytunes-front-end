import mp3Type from "~/assets/audio/mp3Type";

const apiTest = {
  getNewReleases: () => {
    return [
      {
        id: `new_1`,
        trackAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnieVqXzgRDxD2DZcmXQjnDAI7cETRYD2hdA&s",
        trackPerformer: "Kenny Price",
        trackTitle: "The HeavyWeight",
        trackType: "Single",
        trackGenre: "Country",
        trackLyric: "",
        trackLink: mp3Type[`NewReleases/TheHeavyWeight-Kenny Price`],
      },
      {
        id: `new_2`,
        trackAvatar:
          "https://navicdn.com/loibaihat.co/wp-content/uploads/2020/10/loi-boi-vi-la-khi-yeu.png",
        trackPerformer: "LyLy",
        trackTitle: "Bởi Vì Là Khi Yêu",
        trackType: "Single",
        trackGenre: "Pop/Ballad",
        trackLink: mp3Type[`NewReleases/BoiViLaKhiYeu-LyLy`],
      },
      {
        id: `new_3`,
        trackAvatar:
          "https://cdn-images.vtv.vn/thumb_w/640/2019/7/26/suni-1-1564110056335604663063.jpg",
        trackPerformer: "Suni Hạ Linh ft. Lou Hoàng",
        trackTitle: "Không Sao Mà Em Đây Rồi",
        trackType: "Single",
        trackGenre: "Pop/Ballad",
        trackLyric: `Verse 1\n
        Hình như anh đang say hình như anh không vui\n
        Kể cho em nghe đi vì sao anh buồn thế\n
        Nếu muốn khóc hãy cứ khóc trên vai em này\n
        Đừng cứ mãi ôm lấy nỗi đau như vậy\n
        Hình như mưa đang rơi\n
        Hình như anh đang chơi vơi\n
        Này người em thương ơi lại em ôm vào lòng\n
        Cứ để cho thế giới kia quay cuồng\n
        Em sẽ giữ cho anh phut giây yên bình\n
        Thế giới của mình nhỏ thôi\n
        Chỉ cần em thấy anh vui\n
        Chorus\n
        Không sao mà em đây rồi\n
        Anh ơi buồn cứ khóc\n
        Bao lâu nay anh đã cố mạnh mẽ rồi\n
        Chỉ một lần thôi, chỉ một lần này thôi\n
        Hãy để em được vỗ về nỗi buồn của anh\n
        Như bao lần anh đã từng bên em\n
        Khi em khóc giờ là luc em bên anh khi anh cần\n
        Hãy cứ yếu đuối đi anh\n
        Nếu muốn cứ khóc đi anh\n
        Rồi ngày mai tất cả mọi thứ sẽ qua anh à\n
        Verse 2\n
        Có lắm luc quanh anh cuộc\n
        Đời chỉ toàn nặng nề, chơi vơi\n
        Cứ nói sẽ không sao, im ok\n
        Nhưng thật lòng thì yếu đuối\n
        Người đàn ông cố tỏ ra mình vui\n
        Là tim họ giữ nước mắt đừng rơi\n
        Đâu ai hay trong anh suy tư lại nhiều đến thế\n
        Một chut say rồi quên nên\n
        Em chớ muộn phiền ohhh\n
        Chorus\n
        Không sao mà em đây rồi\n
        Anh ơi buồn cứ khóc\n
        Bao lâu nay anh đã cố mạnh mẽ rồi\n
        Chỉ một lần thôi, chỉ một lần này thôi\n
        Hãy để em được vỗ về nỗi buồn của anh\n
        Như bao lần anh đã từng bên em\n
        Khi em khóc giờ là luc em bên anh khi anh cần\n
        Hãy cứ yếu đuối đi anh\n
        Nếu muốn cứ khóc đi anh\n
        Rồi ngày mai tất cả mọi thứ sẽ qua anh à\n
        Bridge\n
        Cũng có khi anh nên thế này\n
        Cứ khóc đi cho qua hết ngày\n
        Nép trong vòng tay em này mình cùng ấm áp\n
        Phố đêm mưa rơi cũng buồn\n
        Hãy để em trao cho anh một chut yêu thương\n
        Rồi mai chàng trai như mọi ngày lại về với em\n
        Chorus\n
        Không sao mà em đây rồi\n
        Anh ơi buồn cứ khóc\n
        Bao lâu nay anh đã cố mạnh mẽ rồi\n
        Chỉ một lần thôi, chỉ một lần này thôi\n
        Hãy để em được vỗ về nỗi buồn của anh\n
        Như bao lần anh đã từng bên em\n
        Khi em khóc giờ là luc em bên anh khi anh cần\n
        Hãy cứ yếu đuối đi anh\n
        Nếu muốn cứ khóc đi anh\n
        Rồi ngày mai tất cả mọi thứ sẽ qua anh à\n
        `,
        trackLink:
          mp3Type[
            `NewReleases/KHÔNG SAO MÀ EM ĐÂY RỒI - SUNI HẠ LINH ft Lou Hoàng`
          ],
      },
      {
        id: `new_4`,
        trackAvatar:
          "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/1/d/6/a/1d6a1fa9aaf8b3be17dd64f396fe7ed6.jpg",
        trackPerformer: "Soobin Hoàng Sơn",
        trackTitle: "Giá Như",
        trackType: "Single",
        trackGenre: "Pop/Ballad",
        trackLink: mp3Type[`NewReleases/GIA NHU - Soobin`],
      },
      {
        id: `new_5`,
        trackAvatar:
          "https://i.scdn.co/image/ab67616d00001e02e75f76ad00f94ccc944a8bb7",
        trackPerformer: "Vũ Phụng Tiên",
        trackTitle: "Lệ Lưu Ly",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink:
          mp3Type[`NewReleases/LỆ LƯU LY - VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7`],
      },
      {
        id: `new_6`,
        trackAvatar:
          "https://i.scdn.co/image/ab67616d0000b273838698485511bd9108fadadc",
        trackPerformer: "Dua Lipa",
        trackTitle: "New Rules",
        trackType: "Single",
        trackGenre: "Pop",
        trackLink: mp3Type["NewReleases/NEW RULES - Dua Lipa"],
      },
      {
        id: `new_7`,
        trackAvatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsumY3LsuMpJX74-1mLf73QdeVgyFwrsDs8g&s",
        trackPerformer: "Eminem",
        trackTitle: "Rap God",
        trackType: "Single",
        trackGenre: "Rap/HipHop",
        trackLink: mp3Type[`NewReleases/RAP GOD - Eminem (Explicit)`],
      },
    ];
  },
};

export default apiTest;
