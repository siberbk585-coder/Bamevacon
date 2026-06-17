import type { ContentPack, HoatDong, JourneyWeek } from "./types";
import { contentPackSchema } from "./schema";

import buoi1Raw from "@/content/content_pack_buoi1.json";
import buoi2 from "@/content/content_pack_buoi2.json";
import buoi3 from "@/content/content_pack_buoi3.json";
import buoi4 from "@/content/content_pack_buoi4.json";
import buoi5 from "@/content/content_pack_buoi5.json";
import buoi6 from "@/content/content_pack_buoi6.json";
import buoi7 from "@/content/content_pack_buoi7.json";
import buoi8 from "@/content/content_pack_buoi8.json";
import buoi9 from "@/content/content_pack_buoi9.json";

interface RawBuoi1 {
  meta: ContentPack["meta"];
  nhom: ContentPack["nhom"];
  chieu_phan_tich?: unknown[];
  cau_hoi: ContentPack["cau_hoi"];
  cau_ke_chuyen?: {
    ma_cau: string;
    noi_dung: string;
    goi_y_ghi?: string;
    kieu_tra_loi?: string;
  }[];
  cham_diem_nhom: ContentPack["cham_diem_nhom"];
}

function normalizeBuoi1(raw: RawBuoi1): ContentPack {
  const hoatDong: HoatDong[] = (raw.cau_ke_chuyen ?? []).map((kc) => ({
    ma_hoat_dong: kc.ma_cau,
    ten: kc.noi_dung,
    loai: "ke_chuyen",
    huong_dan: kc.goi_y_ghi ? [kc.goi_y_ghi] : [],
    dau_ra: {
      kieu: "van_ban_tu_do",
      truong: [
        {
          ma: "noi_dung",
          nhan: "Lời bé kể",
          kieu_du_lieu: "text" as const,
        },
      ],
    },
  }));

  return {
    meta: raw.meta,
    thu_tu_khoi: ["doc_phu_huynh", "cau_hoi", "hoat_dong", "duc_ket"],
    doc_phu_huynh: {
      tom_tat:
        "Đây là buổi nghe, không phải dạy. Đọc to câu hỏi, để bé tự chọn, ghi nguyên văn lời bé.",
      luu_y: [
        "Không phán xét — mọi câu trả lời đều hợp lệ",
        "Để bé tự nói, ghi nguyên văn",
        "Buổi này là baseline để so sánh tiến trình sau này",
      ],
    },
    nhom: raw.nhom,
    cau_hoi: raw.cau_hoi,
    hoat_dong: hoatDong,
    duc_ket: {
      huong_dan: "Cùng nhìn lại buổi hôm nay và ghi nhận điều bất ngờ",
      dau_ra: {
        truong: [
          {
            ma: "ph_bat_ngo",
            nhan: "1 điều bất ngờ tôi mới biết về con hôm nay",
            kieu_du_lieu: "text",
          },
        ],
      },
    },
    cham_diem_nhom: raw.cham_diem_nhom,
  };
}

const CONTENT_BY_BUOI: Record<number, ContentPack> = {
  1: normalizeBuoi1(buoi1Raw as RawBuoi1),
  2: contentPackSchema.parse(buoi2),
  3: contentPackSchema.parse(buoi3),
  4: contentPackSchema.parse(buoi4),
  5: contentPackSchema.parse(buoi5),
  6: contentPackSchema.parse(buoi6),
  7: contentPackSchema.parse(buoi7),
  8: contentPackSchema.parse(buoi8),
  9: contentPackSchema.parse(buoi9),
};

export const JOURNEY_WEEKS: JourneyWeek[] = [
  { buoi: 1, tuan: 1, title: "Tìm hiểu bé", hasContent: true },
  { buoi: 2, tuan: 2, title: "Sở thích & động cơ", hasContent: true },
  { buoi: 3, tuan: 3, title: "Nuôi dưỡng 1 đam mê", hasContent: true },
  { buoi: 4, tuan: 4, title: "Cách học của con", hasContent: true },
  { buoi: 5, tuan: 5, title: 'Vượt "điểm khó"', hasContent: true },
  { buoi: 6, tuan: 6, title: "Cảm xúc & kết nối", hasContent: true },
  { buoi: 7, tuan: 7, title: "An toàn tâm lý tại nhà", hasContent: true },
  { buoi: 8, tuan: 8, title: "Điểm mạnh & bản thân", hasContent: true },
  { buoi: 9, tuan: 9, title: "Mơ ước & giá trị", hasContent: true },
  { buoi: 10, tuan: 10, title: "Chân dung tổng hợp", hasContent: false },
  { buoi: 11, tuan: 11, title: "Tái đánh giá & tiến trình", hasContent: false },
  { buoi: 12, tuan: 12, title: "Kế hoạch đồng hành", hasContent: false },
];

export function getContentPack(buoi: number): ContentPack | null {
  return CONTENT_BY_BUOI[buoi] ?? null;
}

export function getAvailableSessions(): number[] {
  return Object.keys(CONTENT_BY_BUOI).map(Number);
}

export function getPillarByCode(
  pack: ContentPack,
  code: string
): ContentPack["nhom"][number] | undefined {
  return pack.nhom.find((n) => n.ma === code);
}
