import mp4Type from "~/assets/video/mp4Type";

const apiMoment = {
  getMoment: () => {
    return [
      {
        id: 0,
        date: `25-08-2024`,
        name: `THE PROCESS OF MAKING 12H03 - TOULIVER & MASTAL`,
        link: mp4Type[`Moment/THE PROCESS OF MAKING 12H03 TOULIVER MASTAL`],
      },
      {
        id: 1,
        date: `15-08-2024`,
        name: "THE PROCESS OF MAKING ĐÀO LIỄU - TOULIVER & TRIPLE D",
        link: mp4Type[
          `Moment/THE PROCESS OF MAKING ĐÀO LIỄU TOULIVER TRIPLE D`
        ],
      },
      {
        id: 2,
        date: `20-09-2024`,
        name: `Quang Hùng MasterD - Chỉ Còn Một Đêm (เหลอเพยงคนเดยว - Last Dark) ft. FHERO (THAI VERSION)`,
        link: mp4Type[
          `Moment/Quang Hung MasterD Chi Con Mot Dem เหลอเพยงคนเดยว Last Dark ft FHERO THAI VERSION`
        ],
      },
      {
        id: 3,
        date: `10-08-2024`,
        name: `[BEAT BREAKDOWN] TRỐNG CƠM - TỰ LONG, SOOBIN, CƯỜNG SEVEN, (CÔNG DIỄN 1 ANH TRAI VƯỢT NGÀN CHÔNG GAI)`,
        link: mp4Type[
          `Moment/BEAT BREAKDOWN TRỐNG CƠM TỰ LONG SOOBIN CƯỜNG SEVEN CÔNG DIỄN 1 ANH TRAI VƯỢT NGÀN CHÔNG GAI`
        ],
      },
    ];
  },
};

export default apiMoment;
