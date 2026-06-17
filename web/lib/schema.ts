import { z } from "zod";

const pillarCodeSchema = z.enum(["A", "B", "C", "D"]);

const thangDiemSchema = z.object({
  "5": z.string(),
  "4": z.string(),
  "3": z.string(),
  "2": z.string(),
  "1": z.string(),
});

const formFieldSchema = z.object({
  ma: z.string(),
  nhan: z.string(),
  kieu_du_lieu: z.enum(["text", "date", "emoji", "bool", "rating", "select"]),
  tuy_chon: z.array(z.string()).optional(),
});

const cauHoiSchema = z.object({
  ma_cau: z.string(),
  nhom: pillarCodeSchema,
  chu_de: z.string().optional(),
  cau_hoi_chinh: z.string(),
  vi_du_goi_y: z.array(z.string()).optional(),
  thang_diem: thangDiemSchema,
  cau_hoi_tinh_huong: z.string().optional(),
  cau_hoi_phu: z.array(z.string()).optional(),
  luu_y_cau_phu: z.string().optional(),
  goi_y_phan_tich: z.string().optional(),
});

const hoatDongSchema = z.object({
  ma_hoat_dong: z.string(),
  nhom: pillarCodeSchema.optional(),
  ten: z.string(),
  loai: z.string(),
  muc_tieu: z.string().optional(),
  thoi_luong_phut: z.number().optional(),
  huong_dan: z.array(z.string()).optional(),
  vai_tro_phu_huynh: z.string().optional(),
  dau_ra: z.object({
    kieu: z.string(),
    so_ban_ghi: z.number().optional(),
    truong: z.array(formFieldSchema),
  }),
});

const ducKetSchema = z.object({
  huong_dan: z.string().optional(),
  dau_ra: z.object({
    truong: z.array(formFieldSchema),
  }),
});

const docPhuHuynhSchema = z.object({
  tom_tat: z.string(),
  luu_y: z.array(z.string()),
});

export const contentPackSchema = z.object({
  meta: z.object({
    ten: z.string(),
    buoi: z.number(),
    tuan: z.number(),
    kieu_buoi: z.string().optional(),
    do_tuoi_ap_dung: z.string(),
    phien_ban: z.string(),
    nguon: z.string().optional(),
    ghi_chu_thang_diem: z.string().optional(),
  }),
  thu_tu_khoi: z.array(
    z.enum(["doc_phu_huynh", "cau_hoi", "hoat_dong", "duc_ket"])
  ),
  doc_phu_huynh: docPhuHuynhSchema,
  nhom: z.array(
    z.object({
      ma: pillarCodeSchema,
      ten: z.string(),
      icon: z.string(),
      mau: z.string(),
    })
  ),
  cau_hoi: z.array(cauHoiSchema),
  hoat_dong: z.array(hoatDongSchema),
  duc_ket: ducKetSchema,
  cham_diem_nhom: z.object({
    phuong_phap: z.string(),
    loai_cau_chua_tra_loi: z.boolean(),
    thang: z.string(),
    y_nghia_diem_nhom: z.string(),
  }),
});

export const childProfileSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên bé"),
  dob: z.string().min(1, "Vui lòng chọn ngày sinh"),
  gender: z.enum(["boy", "girl"]),
});
