# GIÁO TRÌNH COACHING — Đồng hành cùng con (10–16 tuổi)

> Phiên bản giáo trình `1.0.0` · Trục lai: **tuần (tuyến tính)** + **tag 4 nhóm A/B/C/D** · Người dùng: **phụ huynh + bé** · Mentor (người) soạn nội dung · AI: *mockup ở giai đoạn này*.

---

## 1. Triết lý & nguyên tắc

- **Phụ huynh là người dẫn, bé là người khám phá.** App đưa nội dung; phụ huynh + bé cùng làm tại nhà.
- **Không phán xét.** Mọi câu trả lời đều hợp lệ — mục tiêu là *hiểu*, không chấm đúng/sai.
- **Khám phá → Hành động → Đúc kết.** Mỗi buổi không chỉ hỏi, mà còn làm và rút ra điều cụ thể.
- **Đo tiến trình.** Buổi 1 là baseline; tái đánh giá ở Tuần 11 để thấy thay đổi (cùng bộ câu hỏi → so sánh công bằng).
- **4 trụ phát triển:** 🌈 A Sở thích · 📚 B Học tập · ❤️ C Cảm xúc · 🚀 D Tương lai.

---

## 2. Khung lộ trình 12 tuần

| Tuần | Buổi | Tên buổi | Nhóm chính (phụ) | Loại nội dung chính | Mục tiêu |
|------|------|----------|------------------|---------------------|----------|
| 1 | 1 | Tìm hiểu bé (baseline) | A · B · C · D | Phiếu khám phá toàn diện | Lập **chân dung gốc** 4 trụ |
| 2 | 2 | Sở thích & động cơ | A (C) | Khám phá sâu | Phân biệt đam mê thật vs nhất thời |
| 3 | 3 | Nuôi dưỡng 1 đam mê | A (D) | Hoạt động thực hành | Biến sở thích → kỹ năng |
| 4 | 4 | Cách học của con | B (A) | Khám phá sâu | Tìm learning style + động lực học |
| 5 | 5 | Vượt "điểm khó" | B (C) | Hoạt động thực hành | Xây grit & giải quyết vấn đề |
| 6 | 6 | Cảm xúc & kết nối | C | Khám phá sâu | Bản đồ cảm xúc & hệ hỗ trợ |
| 7 | 7 | An toàn tâm lý tại nhà | C (B) | Hoạt động + hướng dẫn PH | Xây không gian "nói thật" |
| 8 | 8 | Điểm mạnh & bản thân | D (A) | Khám phá sâu | Tự nhận thức năng lực, tự tin |
| 9 | 9 | Mơ ước & giá trị | D (C) | Hoạt động thực hành | Làm rõ hệ giá trị & hình dung tương lai |
| 10 | 10 | Chân dung tổng hợp | A · B · C · D | Đúc kết | Ghép 4 trụ thành 1 chân dung |
| 11 | 11 | Tái đánh giá & tiến trình | A · B · C · D | Phiếu (lặp Buổi 1) | So sánh baseline → tiến bộ |
| 12 | 12 | Kế hoạch đồng hành | — | Hướng dẫn phụ huynh | Lộ trình tiếp theo cho gia đình |

**Nhịp:** mỗi nhóm 1 chu kỳ 2 buổi (1 khám phá sâu + 1 hoạt động). Tuần 1 mở đầu, Tuần 10–12 tổng hợp & đo lường.

---

## 3. Template chuẩn 1 buổi (4 khối)

Mọi buổi đều theo khung này → dễ encode thành content pack JSON, dễ cho mentor soạn buổi mới.

| Khối | Tên | Thời lượng | Vai trò |
|------|-----|-----------|---------|
| 0 | **Trước buổi — Đọc cho phụ huynh** | ~5' | Bối cảnh, mục tiêu, mẹo dẫn dắt, điều cần tránh |
| 1 | **Khám phá** (phiếu như Buổi 1) | ~10–15' | Câu hỏi chính + thang 5–1 + tình huống + câu phụ |
| 2 | **Hoạt động phụ huynh–bé** | ~15–20' | 1 hoạt động/bài tập gắn với nhóm |
| 3 | **Đúc kết & ghi nhận** | ~5' | Cùng nhìn lại, chốt 1 điều mang theo, lưu dữ liệu |

**Metadata mỗi buổi (cho app lưu):** `ma_buoi`, `tuan`, `nhom_tag[]`, `muc_tieu`, `dau_ra` (dữ liệu sinh ra), `phien_ban`.

---

## 4. Chi tiết các buổi đầu

### Buổi 1 — Tìm hiểu bé (baseline) · Tag: A·B·C·D
Đã có sẵn ở `content_pack_buoi1.json` (16 câu lõi + 3 câu kể chuyện, đủ 4 nhóm). Trong khung 4 khối:
- **Khối 0 (đọc PH):** "Đây là buổi *nghe*, không phải dạy. Đọc to câu hỏi, để bé tự chọn, ghi nguyên văn lời bé."
- **Khối 1 (khám phá):** toàn bộ 16 câu + tình huống + câu phụ (file đã có).
- **Khối 2 (hoạt động):** 3 câu kể chuyện KC1–KC3 (bé kể, phụ huynh ghi).
- **Khối 3 (đúc kết):** phụ huynh ghi "1 điều bất ngờ tôi mới biết về con hôm nay".
- **Đầu ra:** baseline 4 trụ — mốc để mọi buổi sau so sánh.

---

### Buổi 2 — Sở thích & động cơ · Tag: A (phụ C)
**Mục tiêu:** từ baseline, đào sâu *đam mê thật* vs *giải trí thụ động*; tìm "cửa sổ động lực nội tại".

**Khối 0 — Đọc cho phụ huynh (5'):**
> Sở thích thật là cửa ngõ của động lực và định hướng. Tuyệt đối không phán xét nếu bé chọn game/điện thoại — thay vào đó hỏi *bé thích phần nào* trong đó. Sở thích bền (giữ >6 tháng) đáng chú ý hơn sở thích nhất thời.

**Khối 1 — Khám phá (12'):** (thang 5–1 + ô "bé nói thêm")
1. Việc gì khiến con làm mà *quên cả thời gian*? ⏳
2. Có thứ gì con từng rất thích rồi bỏ không? Vì sao con bỏ? 🍃
3. Nếu phải dạy một người khác *một điều con giỏi*, con sẽ dạy gì? 🎓
4. Khi rảnh, con thích *tự làm một mình* hay *rủ thêm người*? 👥

*Câu hỏi tình huống:* "Con có 2 giờ rảnh và không ai nhắc nhở gì. Kể chi tiết con sẽ làm gì, theo thứ tự."
*Câu phụ:* "Tại sao?" · "Lần gần nhất con làm việc đó là khi nào?" · "Nếu không ai biết con làm điều đó, con vẫn làm chứ?"

**Khối 2 — Hoạt động: "Nhật ký 7 ngày sở thích" (15'):**
Bé tự ghi mỗi tối: hôm nay khi rảnh đã làm gì, thấy thế nào (1–3 emoji). Phụ huynh **không can thiệp, không nhắc**. Cuối tuần cùng đọc lại → đâu là việc lặp lại & khiến bé vui nhất.

**Khối 3 — Đúc kết (5'):** Cùng khoanh **1 sở thích để nuôi dưỡng** ở Buổi 3.
**Đầu ra:** danh sách sở thích thật (xếp theo tần suất + cảm xúc), 1 sở thích được chọn.

---

### Buổi 3 — Nuôi dưỡng 1 đam mê · Tag: A (phụ D)
**Mục tiêu:** chuyển từ *hiểu* → *hành động*; phụ huynh học vai trò "người tạo điều kiện", không "người chỉ đạo".

**Khối 0 — Đọc cho phụ huynh (5'):**
> Mô hình **Đam mê → Kỹ năng → Tự tin**: khi bé thấy mình tiến bộ ở thứ mình thích, tự tin lan sang các mảng khác. Vai trò của ba mẹ là *tạo điều kiện & ghi nhận*, không phải đặt mục tiêu thay con.

**Khối 1 — Check-in ngắn (5'):** Bé chọn lại 1 sở thích từ Buổi 2 và tự đánh giá "con đang ở mức nào (mới bắt đầu → khá → giỏi)".

**Khối 2 — Hoạt động: "Kế hoạch 2 tuần nuôi đam mê" (20'):** (SMART phiên bản trẻ em)
- **Con muốn làm được gì?** (1 việc cụ thể, nhỏ)
- **Mỗi tuần con dành bao lâu?** (con tự đề xuất)
- **Con cần ba mẹ giúp gì?** (1 việc duy nhất)
- **Làm sao biết con đã tiến bộ?** (1 dấu hiệu bé tự nhận ra)

**Khối 3 — Đúc kết & cam kết (5'):** Hai bên cùng ký "cam kết nhỏ"; chốt lịch check-in sau 2 tuần. Phụ huynh ghi: "1 cách tôi sẽ tạo điều kiện cho con."
**Đầu ra:** 1 kế hoạch 2 tuần + lịch check-in → là dữ liệu để buổi sau theo dõi tiến trình.

---

## 5. Cách giáo trình khớp với content pack (kỹ thuật)

- Mỗi **buổi = 1 content pack** (`content_pack_buoiN.json`) cùng schema với Buổi 1.
- Câu hỏi mỗi buổi mang `nhom` tag → app tổng hợp điểm theo 4 trụ xuyên các buổi.
- Hoạt động (Khối 2) thêm node loại `hoat_dong` (có `dau_ra` để lưu kế hoạch/cam kết).
- Tuần 11 tái dùng **đúng pack Buổi 1** (cùng `phien_ban`) → so sánh baseline công bằng.

---

## 6. Việc còn để mở
- **PDF "10 tình huống gốc"** chưa có → khi có sẽ gắn vào câu hỏi tình huống các buổi (file Buổi 1 đã tham chiếu sẵn Tình huống 1–10).
- Buổi 4–12 mới ở mức khung (mục lục + mục tiêu) — sẽ chi tiết hoá theo nhịp.
