export type PillarCode = "A" | "B" | "C" | "D";
export type SessionStatus = "locked" | "active" | "done";
export type BlockType = "doc_phu_huynh" | "cau_hoi" | "hoat_dong" | "duc_ket";
export type FieldType = "text" | "date" | "emoji" | "bool" | "rating" | "select";
export type LikertScore = 1 | 2 | 3 | 4 | 5;

export interface Pillar {
  ma: PillarCode;
  ten: string;
  icon: string;
  mau: string;
}

export interface ThangDiem {
  "5": string;
  "4": string;
  "3": string;
  "2": string;
  "1": string;
}

export interface CauHoi {
  ma_cau: string;
  nhom: PillarCode;
  chu_de?: string;
  cau_hoi_chinh: string;
  vi_du_goi_y?: string[];
  thang_diem: ThangDiem;
  cau_hoi_tinh_huong?: string;
  cau_hoi_phu?: string[];
  luu_y_cau_phu?: string;
  goi_y_phan_tich?: string;
}

export interface FormField {
  ma: string;
  nhan: string;
  kieu_du_lieu: FieldType;
  tuy_chon?: string[];
}

export interface HoatDong {
  ma_hoat_dong: string;
  nhom?: PillarCode;
  ten: string;
  loai: string;
  muc_tieu?: string;
  thoi_luong_phut?: number;
  huong_dan?: string[];
  vai_tro_phu_huynh?: string;
  dau_ra: {
    kieu: string;
    so_ban_ghi?: number;
    truong: FormField[];
  };
}

export interface DucKet {
  huong_dan?: string;
  dau_ra: {
    truong: FormField[];
  };
}

export interface DocPhuHuynh {
  tom_tat: string;
  luu_y: string[];
}

export interface ContentMeta {
  ten: string;
  buoi: number;
  tuan: number;
  kieu_buoi?: string;
  do_tuoi_ap_dung: string;
  phien_ban: string;
  nguon?: string;
  ghi_chu_thang_diem?: string;
}

export interface ChamDiemNhom {
  phuong_phap: string;
  loai_cau_chua_tra_loi: boolean;
  thang: string;
  y_nghia_diem_nhom: string;
}

export interface ContentPack {
  meta: ContentMeta;
  thu_tu_khoi: BlockType[];
  doc_phu_huynh: DocPhuHuynh;
  nhom: Pillar[];
  cau_hoi: CauHoi[];
  hoat_dong: HoatDong[];
  duc_ket: DucKet;
  cham_diem_nhom: ChamDiemNhom;
}

export interface QuestionResponse {
  ma_cau: string;
  diem?: LikertScore;
  be_noi_them?: string;
  tl_tinh_huong?: string;
  cau_phu?: Record<number, string>;
  answered_at?: string;
}

export interface ActivityRecord {
  ma_hoat_dong: string;
  fields: Record<string, string | boolean | number>;
  entries?: Record<string, string | boolean | number>[];
}

export interface PillarScores {
  A: number | null;
  B: number | null;
  C: number | null;
  D: number | null;
}

export interface SessionState {
  status: SessionStatus;
  completedAt?: string;
  currentBlockIndex?: number;
  currentQuestionIndex?: number;
  currentActivityIndex?: number;
  blocks: {
    questions: Record<string, QuestionResponse>;
    activities: Record<string, ActivityRecord>;
    ducKet: Record<string, string | boolean | number>;
  };
  pillarScores?: PillarScores;
}

export interface ChildProfile {
  name: string;
  dob: string;
  gender: "boy" | "girl" | "";
}

export interface AppState {
  profile: ChildProfile | null;
  sessions: Record<number, SessionState>;
}

export interface JourneyWeek {
  buoi: number;
  tuan: number;
  title: string;
  hasContent: boolean;
}
