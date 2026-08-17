import fitz
doc = fitz.open("attached_assets/PANTHER_BRANDBOOK_2025_1786979916989.pdf")
print("pages:", doc.page_count)
for i in range(min(doc.page_count, 12)):
    p = doc[i]
    pix = p.get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    pix.save(f".agents/outputs/panther/page{i}.png")
